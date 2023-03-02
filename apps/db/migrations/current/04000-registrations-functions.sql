

-- CREATE OR REPLACE FUNCTION publ.registration_by_event_slug(event_slug text) 
-- RETURNS SETOF publ.registrations AS $$
-- BEGIN
--   RETURN QUERY 
--     SELECT reg
--     FROM publ.registrations reg
--     INNER JOIN publ.events evt ON evt.id = reg.event_id
--     INNER JOIN publ.attendees att ON att.registration_id = reg.id
--     WHERE evt.slug = event_slug;
-- END;
-- $$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION publ.registration_by_event_slug(event_slug text)
RETURNS  publ.registrations AS $$
DECLARE
  attendees publ.registrations%ROWTYPE;
BEGIN
  --FOR attendees IN
    SELECT reg.*
    FROM publ.registrations reg
    INNER JOIN publ.events evt ON evt.id = reg.event_id
    INNER JOIN publ.attendees att ON att.registration_id = reg.id
    WHERE evt.slug = event_slug into attendees;
  --LOOP
    RETURN  attendees;
  --END LOOP;
  --RETURN;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


grant execute on function publ.registration_by_event_slug( text) to :DATABASE_VISITOR;

-- create function publ.create_registration() returns trigger as $$
-- DECLARE 
--   code text;
--   ticket_num TEXT;
-- begin

-- code :=  substring(uuid_generate_v4()::text, 1, 6);
-- ticket_num := 'TICKET_' || md5(random()::text || clock_timestamp()::text);

--     if exists (select booking_starts_at, booking_ends_at from publ.events where id=NEW.event_id and  (booking_starts_at <= NOW() and booking_ends_at >= now())) then
--     --vérifier si pas déjà inscrit !!
--         insert into publ.registrations(event_id,attendee_id) values(NEW.event_id,NEW.id) 
--         on conflict do nothing;
--       if NEW.is_inscriptor then
--           update publ.registrations
--           set sign_code = code, ticket_number = ticket_num
--           where publ.registrations.attendee_id = NEW.id;
--       end if;
      
--     end if ;
     
--   return NEW;
-- end;
-- $$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

-- create trigger _500_insert_registration
--   after insert on publ.attendees
--   for each row
--   when (pg_trigger_depth() < 1)
--   execute procedure publ.attendee__insert_join_registration();
-- comment on function publ.attendee__insert_join_registration() is E'Ensures that every create attendees insert registration_id from registration';



-- --transformer cette fonction en mutation pour envoi via iframe
-- create or replace function publ.send_email_confirmation_by_id(evt_id uuid, att_id uuid) returns void as $$
-- DECLARE
--     ticket_num text;
--     first_name text;
--     last_name text;
--     event_name text;
--     event_slug text;
--     place_name text;
--     starts_at timestamp;
--     ends_at timestamp;
--     attendee_email text;
--     reg_id uuid;
--     code_invit text;
--  begin

--   select reg.id, reg.ticket_number, reg.sign_code, att.firstname, att.lastname, att.email, evt.name, evt.slug, evt.place_name, evt.starts_at, evt.ends_at 
--   into reg_id, ticket_num, code_invit, first_name, last_name, attendee_email, event_name, event_slug, place_name, starts_at, ends_at
--   from publ.registrations reg 
--   inner join publ.attendees att on att.id = reg.attendee_id 
--   inner join publ.events evt on evt.id = reg.event_id 
--   where reg.attendee_id=att_id and reg.event_id=evt_id; 

--     perform graphile_worker.add_job('qrCodeGen', json_build_object(
--           'registrationId',reg_id,
--           'ticketNumber',ticket_num,
--           'eventId', evt_id,
--           'attendeeId', att_id,
--           'email',attendee_email,
--           'firstname',first_name,
--           'lastname',last_name,
--           'eventName',event_name,
--           'slug',event_slug,
--           'placeName',place_name,
--           'startsAt',starts_at,
--           'endsAt',ends_at,
--           'signCode',code_invit
--         ));
-- end;
-- $$ language plpgsql strict volatile security definer;

-- grant execute on function publ.send_email_confirmation_by_id(uuid, uuid) to :DATABASE_VISITOR;
