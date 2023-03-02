
create function priv.event__insert_create_registration() returns trigger as $$

begin

    insert into publ.registrations(event_id) values(NEW.id) 
        on conflict do nothing;

     
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

 create trigger _500_insert_registration
   after insert on publ.events
   for each row
   when (pg_trigger_depth() < 1)
   execute procedure priv.event__insert_create_registration();
 comment on function priv.event__insert_create_registration() is E'Ensures that every create event insert event_id from registration';



-- -- fixtures
--   -- fixtures go here

 

    