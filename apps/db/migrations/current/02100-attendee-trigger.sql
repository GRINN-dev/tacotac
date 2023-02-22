create function priv.attendee__insert_create_registration() returns trigger as $$
DECLARE code text;

begin
code :=  substring(uuid_generate_v4()::text, 1, 6);

    --select registration_id as reg_id from publ.registrations where event_id=NEW.event_id;
        update publ.attendees
        set registration_id = publ.registrations.id -- ou SET registration_id = NEW.registration_id
        from publ.registrations
        where publ.registrations.event_id = NEW.event_id 
        and publ.attendees.id = NEW.id;

    if NEW.is_inscriptor then
        update publ.attendees
        set sign_code = code
        from publ.registrations
        where publ.registrations.event_id = NEW.event_id 
        and publ.attendees.id = NEW.id;
    end if;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_registration
  after insert on publ.attendees
  for each row
  execute procedure priv.attendee__insert_create_registration();
comment on function priv.attendee__insert_create_registration() is E'Ensures that every create attendees insert registration_id from registration';

-- fixtures
  -- fixtures go here

    insert into publ.attendees (firstname,lastname, email, event_id, is_inscriptor ,status) values ('1', 'blip','1@blip.com', (select id from publ.events where name = 'third'),true,'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('11', 'blip','11@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('111', 'blip','111@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('12', 'blip','12@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('13', 'blip','13@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('14', 'blip','14@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('15', 'blip','15@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('tst', 'testeuh','tst@testeuh.com', (select id from publ.events where name = 'test'),'IDLE');
