drop table if exists publ.event_status cascade;
create table publ.event_status (
    type text primary key,
    description text
);
comment on table publ.event_status is E'@enum';

insert into publ.event_status values
    ('IDLE', 'En attente'),
    ('CANCELLED', 'Inscription annulée'),
    ('CONFIRMED', 'Présence confirmée à l''évenement'),
    ('TICKET_SCAN', 'Ticket scanné'),
    ('PANEL_SCAN', 'Panneau scanné');

GRANT all on  publ.event_status TO :DATABASE_VISITOR;

drop table if exists publ.civility_status cascade;
create table publ.civility_status (
    type text primary key,
    description text
);
comment on table publ.civility_status is E'@enum';

insert into publ.civility_status values
    ('MR', 'Monsieur'),
    ('MME', 'Madame');
/*
  TABLE: publ.attendees
  DESCRIPTION: Participants à l'évenement
*/
drop table if exists publ.attendees cascade;
create table publ.attendees (
    id uuid not null default uuid_generate_v4() primary key unique, 
    civility text not null references publ.civility_status on delete cascade,
    firstname text not null,
    lastname text not null,
    email citext not null check (email ~ '[^@]+@[^@]+\.[^@]+'),
    phone_number text check(length(phone_number) between 5 and 15),
    registration_id uuid references publ.registrations(id) on delete cascade,
    zip_code text not null,
    hear_about text not null,
    is_fundraising_generosity_ok boolean not null,
    status text not null references publ.event_status on delete cascade,
    notes text,
    is_inscriptor boolean default false,
    is_vip boolean,
    is_news_event_email boolean,
    is_news_fondation_email boolean,
    panel_number int,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendees(created_at);
  create index on publ.attendees(updated_at);
  create index on publ.attendees(status);
  create index on publ.attendees(email);
  create index on publ.attendees(civility);
  create index on publ.attendees(registration_id);
  create index on publ.attendees(phone_number);
  create index on publ.attendees(zip_code);


-- RBAC
  grant select on publ.attendees to :DATABASE_VISITOR;
  grant insert(registration_id, civility, firstname, lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status, is_inscriptor, is_vip) on publ.attendees to :DATABASE_VISITOR;
  grant update(civility, firstname, lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) on publ.attendees to :DATABASE_VISITOR;
  grant delete on publ.attendees to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.attendees
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.attendees enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.attendees
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
 insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, is_inscriptor ,status) values ('MR','1', 'blip','1@blip.com','0102030405','44000','par un mécène',true, true,'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MME','2', 'blip','2@blip.com','0102030405','44000','par un mécène',true, 'IDLE');

    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '11', 'blip','11@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '111', 'blip','111@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '12', 'blip','12@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '13', 'blip','13@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '14', 'blip','14@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', '15', 'blip','15@blip.com','0102030405','44000','par un mécène',true, 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, phone_number, zip_code, hear_about, is_fundraising_generosity_ok, status) values ('MR', 'tst', 'testeuh','tst@testeuh.com','0102030405','44000','par un mécène',true,'IDLE');

    
/*
  END TABLE: publ.attendees
*/

