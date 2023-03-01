
-- create function priv.attendee__insert_join_registration() returns trigger as $$
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
--   execute procedure priv.attendee__insert_join_registration();
-- comment on function priv.attendee__insert_join_registration() is E'Ensures that every create attendees insert registration_id from registration';


-- create function priv.attendee__update_registration() returns trigger as $$
-- begin

--     if exists (select id from publ.registrations where publ.registrations.attendee_id = NEW.id and NEW.is_inscriptor and NEW.status = 'CANCELLED' ) then
--           update publ.registrations
--           set sign_code = null, ticket_number = null, qr_code=null
--           where publ.registrations.attendee_id = NEW.id;
--      end if;
     
--   return NEW;
-- end;
-- $$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

-- create trigger _500_update_registration
--   after update on publ.attendees
--   for each row
--   when (pg_trigger_depth() < 1)
--   execute procedure priv.attendee__update_registration();
-- comment on function priv.attendee__update_registration() is E'Ensures that every create attendees insert registration_id from registration';



-- -- fixtures
--   -- fixtures go here

    