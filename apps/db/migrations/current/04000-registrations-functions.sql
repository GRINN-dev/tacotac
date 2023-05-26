/*
  FUNCTION: register_attendees
  DESCRIPTION: Register attendees to event, generate ticket_number, send worker
*/

drop type if exists publ.complete_attendees cascade;
create type publ.complete_attendees as (
  attendee publ.attendees,
  attendee_form_fields publ.attendee_form_fields[]
);

create or replace function publ.register_attendees(event_id uuid, attendees publ.attendees[]) returns publ.registrations as $$
DECLARE 
  v_registration publ.registrations;
  v_event publ.events;
  v_iter int;
  
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  -- check des registration date de l'event
  if  v_event.booking_starts_at > NOW() and v_event.booking_ends_at < now() then
      raise exception 'Registration is not open' using errcode = 'RGNST';
  end if;

  -- creation de la registration et stockage du resultat dans la variable
    insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;
  -- creation des attendees avec une boucle for, le premier attendee créé (le premier du tableau) est l'inscripteur
  --En ce qui concerne "array_length", il s'agit d'une fonction intégrée en PL/SQL qui renvoie la longueur d'un tableau multi-dimensionnel.

  --"array_length(attendees, 1)" renvoie la longueur de la première dimension du tableau "attendees".
  -- Notez que la première dimension d'un tableau commence toujours à l'indice 1 en PL/SQL, 
  -- contrairement à certains autres langages de programmation où elle commence à 0.

    for v_iter in 1..array_length(attendees, 1) loop
        insert into publ.attendees (civility, status, registration_id, firstname, lastname, email, is_inscriptor, sign_code)
        values (attendees[v_iter].civility, 
        coalesce(attendees[v_iter].status, 'IDLE'), 
        v_registration.id, 
        attendees[v_iter].firstname, 
        attendees[v_iter].lastname, 
        attendees[v_iter].email, 
        v_iter = 1,
        substring(uuid_generate_v4()::text, 1, 6));

        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees[v_iter].id, 'state','RESA_BILLET'));

    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));


  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;

drop type if exists publ.attendee_import; 
create type publ.attendee_import as (
  data publ.attendees,
  error_code text,
  error_message text,
  error_value text
);
/*
  FUNCTION: register_attendees_csv
  DESCRIPTION: Register attendees from a csv import
*/

create or replace function publ.register_attendees_csv(event_id uuid, attendees_csv publ.attendees[], is_forcing boolean) returns publ.attendee_import[] as $$
DECLARE 
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_attendee_imported publ.attendee_import;
  v_attendees publ.attendee_import[];
  v_iter int;
begin
    for v_iter in 1..array_length(attendees_csv, 1) loop

      if exists (select 1 from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.email = attendees_csv[v_iter].email and regs.event_id=register_attendees_csv.event_id and not is_forcing ) then

        v_attendee_imported.data:=null;
        v_attendee_imported.error_code:='RGNST';
        v_attendee_imported.error_message:='Participant existe déjà';
        v_attendee_imported.error_value:=attendees_csv[v_iter].email;
      
      else 
        insert into publ.registrations (event_id ) values (register_attendees_csv.event_id) returning * into v_registration;

        insert into publ.attendees (
        civility, 
        status, 
        registration_id, 
        firstname, 
        lastname, 
        email, 
        is_inscriptor, 
        is_vip
        ) values( attendees_csv[v_iter].civility,
        'IDLE', 
        v_registration.id, 
        attendees_csv[v_iter].firstname, 
        attendees_csv[v_iter].lastname,
        attendees_csv[v_iter].email, 
        true,
        attendees_csv[v_iter].is_vip)
        returning * into v_attendee;

        --ici j'initialise a null afin d'éviter la mémorisation de la dernière valeur
        v_attendee_imported.data:=v_attendee;
        v_attendee_imported.error_code:=null;
        v_attendee_imported.error_message:=null;
        v_attendee_imported.error_value:=null;
        perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
        
        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees_csv[v_iter].id, 'state','RESA_BILLET'));
       
      end if;
       
        v_attendees := array_append(v_attendees, v_attendee_imported);
    end loop;

  return v_attendees;

end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees_csv(event_id uuid, attendees_csv publ.attendees[], is_forcing boolean) is E'@arg1variant patch';
grant execute on function publ.register_attendees_csv(uuid, publ.attendees[], boolean) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees_csv
*/



drop function if exists publ.register_complete_attendees cascade;
create function publ.register_complete_attendees(event_id uuid, complete_attendees publ.complete_attendees[]) returns publ.registrations as $$
declare
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- check des registration date de l'event
  if  v_event.booking_starts_at > NOW() and v_event.booking_ends_at < now() then
      raise exception 'Registration is not open' using errcode = 'RGNST';
  end if;



  insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

    insert into publ.attendees (
    civility, 
    status, 
    registration_id, 
    firstname, 
    lastname, 
    email, 
    is_inscriptor, 
    is_vip
    ) values( complete_attendees[v_iter].attendee.civility,
    'IDLE', 
    v_registration.id, 
    complete_attendees[v_iter].attendee.firstname, 
    complete_attendees[v_iter].attendee.lastname,
    complete_attendees[v_iter].attendee.email, 
    v_iter = 1,
    complete_attendees[v_iter].attendee.is_vip)
    returning * into v_attendee;

    -- loop over the form fields and insert the values
    for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
      insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
    end loop;

    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
    perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', v_attendee.id, 'state','RESA_BILLET'));

  end loop;

  return v_registration;
  
end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendees to :DATABASE_VISITOR;