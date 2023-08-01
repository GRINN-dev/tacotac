--! Previous: sha1:d5c6fb38e5dab02041ba871117344b69cb862b9f
--! Hash: sha1:3cf6c5218a94343168c5018e2acf7c4253fc1014
--! Message: removeuselesssigncode

--! split: 1-current.sql
-- Enter migration here
drop type if exists publ.row_event_attendee cascade; 
create type publ.row_event_attendee as ( 
  id text,
  firstname text,
  lastname text,
  ticket_number text,
  email text,
  qr_code_url text,
  pdf_url text,
  name text,
  place_name text,
  address_line_1 text,
  starts_at timestamptz,
  ends_at timestamptz,
  details text,
  header_mail_name text, 
  header_mail_contact text, 
  logo text);

drop function if exists publ.send_email_all_attendee_event(uuid);
  create or replace function publ.send_email_all_attendee_event(event_id uuid) returns publ.row_event_attendee[] as $$
DECLARE 
  v_attendees publ.row_event_attendee[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

    for v_row in 
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
        evts.starts_at,
        evts.ends_at,
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where regs.event_id = v_event_id and atts.status ='IDLE'
    loop

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

        v_attendees := array_append(v_attendees, v_row);
        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_all_attendee_event(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee';
grant execute on function publ.send_email_all_attendee_event(uuid) to :DATABASE_VISITOR;

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

        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees[v_iter].id, 'state','RESA_BILLET'));

    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));


  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;
