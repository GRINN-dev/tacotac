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
/*
  TABLE: publ.attendees
  DESCRIPTION: Participants à l'évenement
*/
drop table if exists publ.attendees cascade;
create table publ.attendees (
    id uuid not null default uuid_generate_v4() primary key unique, 
    firstname text not null,
    lastname text not null,
    email citext not null,
    event_id uuid not null references publ.events(id) on delete cascade,
    registration_id uuid  references publ.registrations(id) on delete cascade,
    status text not null references publ.event_status on delete cascade,
    notes text,
    is_inscriptor boolean,
    is_vip boolean,
    is_fundraising_generosity_ok boolean,
    is_news_event_email boolean,
    is_news_fondation_email boolean,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint attendees_email_event_id_key unique (email, event_id)
);

-- indexes
  create index on publ.attendees(created_at);
  create index on publ.attendees(updated_at);
  create index on publ.attendees(event_id);
  create index on publ.attendees(status);
  create index on publ.attendees(email);
  create index on publ.attendees(registration_id);


-- RBAC
  grant select on publ.attendees to :DATABASE_VISITOR;
    grant insert(firstname,lastname, email, event_id, registration_id, status) on publ.attendees to :DATABASE_VISITOR;
    grant update(firstname,lastname, email, event_id, registration_id, status) on publ.attendees to :DATABASE_VISITOR;
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

    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('1', 'blip','1@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('11', 'blip','11@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('111', 'blip','111@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('12', 'blip','12@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('13', 'blip','13@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('14', 'blip','14@blip.com', (select id from publ.events where name = 'third'),'IDLE');
    insert into publ.attendees (firstname,lastname, email, event_id ,status) values ('15', 'blip','15@blip.com', (select id from publ.events where name = 'third'),'IDLE');
/*
  END TABLE: publ.attendees
*/
