/*
  TABLE: publ.registrations
  DESCRIPTION: la table registration contient les inscriptions d''un evenement
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid  references publ.events(id),
    attendee_id uuid  references publ.attendees(id),
    ticket_number text,
    is_email_sent boolean default false,
    qr_code_url text,
    pdf_link text,
    sign_code text,
    hear_about_list text[] default '{"par un mécène", "par une association lauréate", "par le bouche à oreille", "autre", "par Obole, co-organisateur de l''événement", "par la Fondation de France, co-organisateur de l''événement"}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
--test
-- indexes
  create index on publ.registrations(created_at);
  create index on publ.registrations(updated_at);
  create index on publ.registrations(event_id);

-- RBAC
  grant select on publ.registrations to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.registrations
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.registrations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.registrations
   for all
   using (true)
   with check(true);


  --alter table publ.attendees add column registration_id uuid unique references publ.registrations(id) on delete cascade;
  --create index on publ.attendees(registration_id);

   
-- fixtures
  -- fixtures go here


    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, is_inscriptor ,status) values ((select id from publ.events where name = 'third'),'MR','1', 'blip','1@blip.com','0102030405','44000','par un mécène',true, true,'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'third'),'MME','2', 'blip','2@blip.com','0102030405','44000','par un mécène',true, 'IDLE');

    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '11', 'blip','11@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '111', 'blip','111@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '12', 'blip','12@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '13', 'blip','13@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '14', 'blip','14@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', '15', 'blip','15@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees (event_id, civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ((select id from publ.events where name = 'test'),'MR', 'tst', 'testeuh','tst@testeuh.com','0102030405','44000','par un mécène',true,'IDLE');


/*
  END TABLE: publ.registrations
*/