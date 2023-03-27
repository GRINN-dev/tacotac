/*
  FUNCTION: register_attendees
  DESCRIPTION: Register attendees to event, generate ticket_number, send worker
*/

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
        insert into publ.attendees (civility, hear_about, zip_code, is_fundraising_generosity_ok, status, registration_id, firstname, lastname, email, phone_number, is_inscriptor, ticket_number, sign_code)
        values (attendees[v_iter].civility, 
        attendees[v_iter].hear_about,
        attendees[v_iter].zip_code,
        attendees[v_iter].is_fundraising_generosity_ok ,
        attendees[v_iter].status, 
        v_registration.id, 
        attendees[v_iter].firstname, 
        attendees[v_iter].lastname, 
        attendees[v_iter].email, 
        attendees[v_iter].phone_number, 
        v_iter = 1,
        'TICKET_' || md5(random()::text || clock_timestamp()::text),
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

create or replace function publ.register_attendees_csv(event_id uuid, attendees_csv publ.attendees[]) returns publ.attendee_import[] as $$
DECLARE 
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_attendee_imported publ.attendee_import;
  v_attendees publ.attendee_import[];
  v_iter int;
  v_event_id uuid;
begin
      v_event_id:=event_id;
    for v_iter in 1..array_length(attendees_csv, 1) loop

      if not exists (select email from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where email = attendees_csv[v_iter].email and regs.event_id=v_event_id ) then

        insert into publ.registrations (event_id ) values (v_event_id) returning * into v_registration;

        insert into publ.attendees (
        civility, 
        zip_code,
        status, 
        registration_id, 
        firstname, 
        lastname, 
        email, 
        phone_number, 
        is_inscriptor, 
        is_vip, 
        ticket_number, 
        sign_code
        )select attendees_csv[v_iter].civility,
        attendees_csv[v_iter].zip_code,
        'IDLE', 
        v_registration.id, 
        attendees_csv[v_iter].firstname, 
        attendees_csv[v_iter].lastname,
        attendees_csv[v_iter].email, 
        attendees_csv[v_iter].phone_number, 
        true,
        attendees_csv[v_iter].is_vip,
        'TICKET_' || md5(random()::text || clock_timestamp()::text),
        substring(uuid_generate_v4()::text, 1, 6)  where v_registration.event_id=event_id
        returning * into v_attendee;

        --ici j'initialise a null afin d'éviter la mémorisation de la dernière valeur
        v_attendee_imported.data:=v_attendee;
        v_attendee_imported.error_code:=null;
        v_attendee_imported.error_message:=null;
        v_attendee_imported.error_value:=null;
        perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
        
        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees_csv[v_iter].id, 'state','RESA_BILLET'));
      else 

        v_attendee_imported.data:=null;
        v_attendee_imported.error_code:='RGNST';
        v_attendee_imported.error_message:='Participant existe déjà';
        v_attendee_imported.error_value:=attendees_csv[v_iter].email;
       
      end if;
       
        v_attendees := array_append(v_attendees, v_attendee_imported);
    end loop;

  return v_attendees;

end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees_csv(event_id uuid, attendees_csv publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees_csv(uuid, publ.attendees[]) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees_csv
*/