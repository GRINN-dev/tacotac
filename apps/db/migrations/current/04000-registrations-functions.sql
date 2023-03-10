
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
  if  v_event.booking_starts_at <= NOW() and v_event.booking_ends_at >= now() then
      raise exception 'Registration not started yet' using errcode = 'RGNST';
  end if;

  -- creation de la registration et stockage du resultat dans la variable
    insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;
    insert into publ.logs (event_id,status) values (event_id,'OK') on conflict do nothing;

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
    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));


  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;


create or replace function publ.register_attendees_csv(event_id uuid, attendees_csv publ.attendees[]) returns publ.attendees as $$
DECLARE 
  v_registration publ.registrations;
  v_attendees publ.attendees;
  v_iter int;
begin
        insert into publ.logs (event_id,status) values (event_id,'OK') on conflict do nothing;
      
    for v_iter in 1..array_length(attendees_csv, 1) loop
      --if not exists (select email from publ.attendees where email = attendees_csv[v_iter].email) then

        insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;

        insert into publ.attendees (civility, 
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
        sign_code)
        select attendees_csv[v_iter].civility,
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
        returning * into v_attendees ;

        perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
      --else 
      --raise exception 'Participant existe déjà: %', attendees_csv[v_iter].email using errcode = 'RGNST';
      --end if;

    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees_csv(event_id uuid, attendees_csv publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees_csv(uuid, publ.attendees[]) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees
*/


/*
  FUNCTION: scan_attendees
  DESCRIPTION: Confirmed attendees at event, add panel number and email if missing
*/

create or replace function publ.scan_attendee(ticket_payload json) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_event_id uuid :=  CAST(ticket_payload->>'eventId' as uuid);
  v_panel_number int:=  CAST(ticket_payload->>'panelNumber' AS INTEGER);
  v_attendee_id uuid := ticket_payload->>'attendeeId';
BEGIN

--select (ticket_payload->>'eventId')::uuid into v_event_id;
      if  ticket_payload ->> 'email' is null then
        insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

      if  v_panel_number is null then
          insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_PANEL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;
      
      update publ.attendees as atts set 
          status = CASE 
                      when ticket_payload ->> 'ticketNumber' is not null and v_panel_number is null then 'TICKET_SCAN'
                      when ticket_payload ->> 'ticketNumber' is not null and v_panel_number is not null then 'CONFIRMED'
                      ELSE status
                   END,
          email = ticket_payload ->> 'email', 
          panel_number = v_panel_number 
      where atts.id=v_attendee_id and atts.ticket_number=ticket_payload ->> 'ticketNumber' returning * into v_attendee;

      if not found then
          insert into publ.logs (event_id,status,payload) values (v_event_id,'ERROR',jsonb_build_object('ticket_payload',ticket_payload));
      else
          insert into publ.logs (event_id,status,payload) values (v_event_id,'OK',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

  return v_attendee;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendee(ticket_payload json) is E'scan du billet pour update la table attendees et logs';
grant execute on function publ.scan_attendee(ticket_payload json) to :DATABASE_VISITOR;

/*
  END FUNCTION: confirmed_attendees
*/

