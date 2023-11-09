--! Previous: sha1:d8209a6214371d1f3a729b8966f3d233fbd246a2
--! Hash: sha1:320b5a892da57d2a6415c06cb8063f2a1a85fc66
--! Message: computed_column_add_data_attendee_plus_fixes

--! split: 1-current.sql
-- Enter migration here
create or replace function publ.send_email_attendee_event(registration_id uuid) returns publ.row_event_attendee as $$
DECLARE 
  v_registration_id uuid := registration_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'y a pas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where atts.registration_id = v_registration_id and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

     
        select atts.id,
        atts.firstname,
        atts.lastname,
        atts.ticket_number,
        atts.email,
        atts.qr_code_url,
        atts.pdf_url,
        evts.name,
        evts.place_name,
        evts.address_line_1,
        evts.starts_at AT TIME ZONE 'Europe/Paris',
        evts.ends_at AT TIME ZONE 'Europe/Paris',
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where atts.registration_id = v_registration_id and atts.status ='IDLE' limit 1
        into v_row;

        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', v_row.header_mail_name, 'email', v_row.header_mail_contact),
            'templateId', 'd-4ff875093aa24081af57ffc3d405537c',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Ticket_Number', v_row.ticket_number,
                'Logo',v_row.logo,
                'String_Day', to_char(v_row.starts_at, 'Day'),
                'Day', to_char(v_row.starts_at, 'D'),
                'Month', to_char(v_row.starts_at, 'Month'),
                'Year', to_char(v_row.starts_at, 'YYYY'),
                'Starts_At', to_char(v_row.starts_at, 'HH24:MI'),
                'Ends_At', to_char(v_row.ends_at, 'HH24:MI'),
                'Place_Name', v_row.place_name,
                'Address', v_row.address_line_1,
                'Detail', v_row.details,
                'Qr_Code_Url', v_row.qr_code_url,
                'Pdf_Url', v_row.pdf_url,
                'Cancel', 'test',
                'Current_Year', to_char(v_row.starts_at, 'YYYY')
            )
        )) into email_payload;

        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
  return v_row;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_attendee_event(event_id uuid) is E'Select registration_id to send email to attendee';
grant execute on function publ.send_email_attendee_event(uuid) to :DATABASE_VISITOR;


-- create computed column to get adittional data from forms for attendees
drop type if exists publ.additional_information cascade;
create type publ.additional_information as (
  label text,
  values text
);

drop function if exists publ.attendees_additional_data(attendee publ.attendees) cascade;

create or replace function publ.attendees_additional_data(attendee publ.attendees) returns publ.additional_information[] as $$
declare
  v_additional_information publ.additional_information[];
  v_event_id uuid;
  row publ.additional_information;
begin

  select  evts.id into v_event_id
    from publ.attendees atts
    inner join publ.registrations regs on regs.id = atts.registration_id
    inner join publ.events evts on evts.id = regs.event_id
    where atts.id = attendee.id;

  FOR row IN (
    select ffs.label, unnest(array_agg(distinct affs.value)) as values
    from publ.attendee_form_fields affs
    inner join publ.form_fields ffs ON ffs.event_id = v_event_id
    where affs.attendee_id = attendee.id AND affs.field_id = ffs.id
    group by affs.attendee_id, ffs.label
  )
  LOOP
    v_additional_information := array_append(v_additional_information, row);
  END LOOP;
    
    return v_additional_information;

end;
$$ LANGUAGE plpgsql stable ;

grant execute on function publ.attendees_additional_data to :DATABASE_VISITOR;

-- a été crée en double malencontreusement donc on supprime
drop function if exists priv.send_webhook___update_attendee() cascade;

-- !!!!!!
-- mise a jour de toutes les fonctions qui utilisenet le webhook send_webhook inutilement car on s'en sert lors de l'update de la table
-- !!!!!!

drop function if exists publ.register_attendees( uuid, publ.attendees[]);
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
        insert into publ.attendees (civility, status, registration_id, firstname, lastname, email, is_inscriptor)
        values (attendees[v_iter].civility, 
        coalesce(attendees[v_iter].status, 'IDLE'), 
        v_registration.id, 
        attendees[v_iter].firstname, 
        attendees[v_iter].lastname, 
        attendees[v_iter].email, 
        v_iter = 1,
        substring(uuid_generate_v4()::text, 1, 6));

    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));


  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;

drop function if exists publ.register_attendees_csv( uuid, publ.attendees[], boolean);
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
        
      end if;
       
        v_attendees := array_append(v_attendees, v_attendee_imported);
    end loop;

  return v_attendees;

end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees_csv(event_id uuid, attendees_csv publ.attendees[], is_forcing boolean) is E'@arg1variant patch';
grant execute on function publ.register_attendees_csv(uuid, publ.attendees[], boolean) to :DATABASE_VISITOR;

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

  end loop;

  return v_registration;
  
end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendees to :DATABASE_VISITOR;

drop function if exists publ.register_complete_attendee_csv cascade;
create function publ.register_complete_attendee_csv(event_id uuid, complete_attendees publ.complete_attendees[], is_forcing boolean = false) returns publ.attendee_import[] as $$
declare
  v_registration publ.registrations;
  v_attendees publ.attendee_import[];
  v_attendee_imported publ.attendee_import;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin
  
  -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

    if exists (select 1 from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.email = complete_attendees[v_iter].attendee.email and regs.event_id=register_complete_attendee_csv.event_id and not is_forcing ) then

      v_attendee_imported.data:=null;
      v_attendee_imported.error_code:='ALEXT'; --'already exists
      v_attendee_imported.error_message:='Participant existe déjà';
      v_attendee_imported.error_value:=complete_attendees[v_iter].attendee.email;
    
    else 
      insert into publ.registrations (event_id ) values (register_complete_attendee_csv.event_id) returning * into v_registration;

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
      true,
      complete_attendees[v_iter].attendee.is_vip)
      returning * into v_attendee;

      -- loop over the form fields and insert the values
      for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
        insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
      end loop;

      perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

    end if;
     
      v_attendees := array_append(v_attendees, v_attendee_imported);  
  end loop;

  return v_attendees;

end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendee_csv to :DATABASE_VISITOR;
