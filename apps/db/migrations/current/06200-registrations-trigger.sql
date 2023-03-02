
create or replace function publ.create_registration_by_event_id_and_attendee_id(event_id uuid, attendee_id uuid) returns void as $$
DECLARE 
  code text;
  ticket_num TEXT;
  new_registration_id UUID;
begin

code :=  substring(uuid_generate_v4()::text, 1, 6);
ticket_num := 'TICKET_' || md5(random()::text || clock_timestamp()::text);

    if exists (select booking_starts_at, booking_ends_at from publ.events where id=event_id and  (booking_starts_at <= NOW() and booking_ends_at >= now())) then
    
        insert into publ.registrations(event_id) values (event_id) on conflict do nothing returning id INTO new_registration_id;

        update publ.attendees attds set registration_id = new_registration_id where attds.id=attendee_id;

      if exists (select is_inscriptor from publ.attendees att where att.id=attendee_id ) then
          update publ.registrations regs
          set sign_code = code, ticket_number = ticket_num
          where regs.id in (select registration_id from publ.attendees atts where atts.id=attendee_id );
      end if;
      
    end if ;
     
  return;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER SET search_path TO pg_catalog, public, pg_temp;
grant execute on function publ.create_registration_by_event_id_and_attendee_id( uuid, uuid) to :DATABASE_VISITOR;

-- create trigger _500_insert_registration
--   before insert on publ.registrations
--   for each row
--   when (pg_trigger_depth() < 1)
--   execute procedure publ.attendee__insert_join_registration();
-- comment on function publ.attendee__insert_join_registration() is E'Ensures that every create attendees insert registration_id from registration';


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

    