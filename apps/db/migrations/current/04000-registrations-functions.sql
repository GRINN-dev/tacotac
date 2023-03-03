


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
  if    v_event.booking_starts_at <= NOW() and v_event.booking_ends_at >= now() then
      raise exception 'Registration not started yet' using errcode = 'RGNST';
  end if;

  -- creation de la registration et stockage du resultat dans la variable
    insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;


  -- creation des attendees avec une boucle for, le premier attendee créé (le premier du tableau) est l'inscripteur
    for v_iter in 1..array_length(attendees, 1) loop
        insert into publ.attendees (civility, hear_about, zip_code, is_fundraising_generosity_ok, status, registration_id, firstname, lastname, email, phone_number, is_inscriptor, ticket_number, sign_code)
        values (attendees[v_iter].civility, attendees[v_iter].hear_about ,attendees[v_iter].zip_code,attendees[v_iter].is_fundraising_generosity_ok ,attendees[v_iter].status, v_registration.id, attendees[v_iter].firstname, attendees[v_iter].lastname, attendees[v_iter].email, attendees[v_iter].phone_number, v_iter = 1,'TICKET_' || md5(random()::text || clock_timestamp()::text),substring(uuid_generate_v4()::text, 1, 6));
    end loop;
  
  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER
;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;



--transformer cette fonction en mutation pour envoi via iframe
create or replace function publ.send_email_confirmation_by_registration_id(reg_id uuid) returns void as $$
DECLARE
    ticket_num text;
    first_name text;
    last_name text;
    event_name text;
    event_slug text;
    place_name text;
    starts_at timestamp;
    ends_at timestamp;
    attendee_email text;
    code_invit text;
    att_id uuid;
    evt_id uuid;
 begin

  select  reg.ticket_number, reg.sign_code, att.id, att.firstname,  att.lastname, att.email, evt.id, evt.name, evt.slug, evt.place_name, evt.starts_at, evt.ends_at 
  into  ticket_num, code_invit,att_id, first_name, last_name, attendee_email,evt_id,  event_name, event_slug, place_name, starts_at, ends_at
  from publ.registrations reg 
  inner join publ.attendees att on att.registration_id = reg.id 
  inner join publ.events evt on evt.id = reg.event_id 
  where  reg.id=reg_id;  

    perform graphile_worker.add_job('qrCodeGen', json_build_object(
          'registrationId',reg_id,
          'ticketNumber',ticket_num,
          'eventId', evt_id,
          'attendeeId', att_id,
          'email',attendee_email,
          'firstname',first_name,
          'lastname',last_name,
          'eventName',event_name,
          'slug',event_slug,
          'placeName',place_name,
          'startsAt',starts_at,
          'endsAt',ends_at,
          'signCode',code_invit
        ));
end;
$$ language plpgsql strict volatile security definer;

grant execute on function publ.send_email_confirmation_by_registration_id(uuid) to :DATABASE_VISITOR;
