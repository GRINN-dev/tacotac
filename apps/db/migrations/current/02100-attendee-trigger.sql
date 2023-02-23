create function priv.attendee__insert_create_registration() returns trigger as $$
DECLARE code text;

begin
code :=  substring(uuid_generate_v4()::text, 1, 6);
    if exists (select booking_starts_at, booking_ends_at,id from publ.events where id=NEW.event_id and  (booking_starts_at <= NOW() and booking_ends_at >= now())) then
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
    end if;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_registration
  after insert or update on publ.attendees
  for each row
  execute procedure priv.attendee__insert_create_registration();
comment on function priv.attendee__insert_create_registration() is E'Ensures that every create attendees insert registration_id from registration';

-- fixtures
  -- fixtures go here

    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id, is_inscriptor ,status) values ('MR','1', 'blip','1@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'second test'),true,'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MME','2', 'blip','2@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'second test'),'IDLE');

    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '11', 'blip','11@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '111', 'blip','111@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '12', 'blip','12@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '13', 'blip','13@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '14', 'blip','14@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', '15', 'blip','15@blip.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, event_id ,status) values ('MR', 'tst', 'testeuh','tst@testeuh.com','0102030405','44000','par un mécène',true, (select id from publ.events where name = 'test'),'IDLE');
