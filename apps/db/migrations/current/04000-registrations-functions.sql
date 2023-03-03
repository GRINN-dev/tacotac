


CREATE OR REPLACE FUNCTION publ.registration_by_event_slug(event_slug text)
RETURNS  publ.registrations AS $$
DECLARE
  attendees publ.registrations%ROWTYPE;
BEGIN
    SELECT reg.*
    FROM publ.registrations reg
    INNER JOIN publ.events evt ON evt.id = reg.event_id
    INNER JOIN publ.attendees att ON att.registration_id = reg.id
    WHERE evt.slug = event_slug into attendees;
    RETURN  attendees;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


grant execute on function publ.registration_by_event_slug( text) to :DATABASE_VISITOR;

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


  -- creation des attendees avec une boucle for, le premier attendee créé (le premier du tableau) est l'inscripteur
    for v_iter in 1..array_length(attendees, 1) loop
        insert into publ.attendees (civility, hear_about, zip_code, is_fundraising_generosity_ok, status, registration_id, firstname, lastname, email, phone_number, is_inscriptor, ticket_number, sign_code)
        values (attendees[v_iter].civility, attendees[v_iter].hear_about ,attendees[v_iter].zip_code,attendees[v_iter].is_fundraising_generosity_ok ,attendees[v_iter].status, v_registration.id, attendees[v_iter].firstname, attendees[v_iter].lastname, attendees[v_iter].email, attendees[v_iter].phone_number, v_iter = 1,'TICKET_' || md5(random()::text || clock_timestamp()::text),substring(uuid_generate_v4()::text, 1, 6));
    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER
;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;
