drop table if exists publ.event_status cascade;
create table publ.event_status (
    type text primary key,
    description text
);
comment on table publ.event_status is E'@enum';

insert into publ.event_status values
    ('IDLE', 'En attente'),
    ('CANCELLED', 'Inscription annulée'),
    ('CONFIRMED', 'Présence confirmée à l''évenement');



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
    registration_id uuid unique references publ.registrations(id) on delete cascade,
    status text not null unique references publ.event_status on delete cascade,
    notes text,
    qr_code text,
    panel_number text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendees(created_at);
  create index on publ.attendees(updated_at);
  create index on publ.attendees(firstname);
  create index on publ.attendees(lastname);
  create index on publ.attendees(registration_id);
  create index on publ.attendees(status);
  create index on publ.attendees(email);
  create index on publ.attendees(notes);
  create index on publ.attendees(qr_code);
  create index on publ.attendees(panel_number);
  


-- RBAC
  grant select on publ.attendees to :DATABASE_VISITOR;
  grant delete on publ.attendees to :DATABASE_VISITOR;

  grant insert (firstname, lastname,email,registration_id,status,notes,qr_code, panel_number) on publ.attendees to :DATABASE_VISITOR;
  grant update (firstname, lastname,email,registration_id,status,notes,qr_code, panel_number) on publ.attendees to :DATABASE_VISITOR; 
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
/*
  END TABLE: publ.attendees
*/
