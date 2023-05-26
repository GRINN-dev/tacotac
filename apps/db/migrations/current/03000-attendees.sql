drop table if exists publ.attendee_status cascade;
create table publ.attendee_status (
    type text primary key,
    description text
);
comment on table publ.attendee_status is E'@enum';

insert into publ.attendee_status values
    ('IDLE', 'En attente'),
    ('CANCELLED', 'Inscription annulée'),
    ('CONFIRMED', 'Présence confirmée à l''évenement'),
    ('TICKET_SCAN', 'Ticket scanné'),
    ('PANEL_SCAN', 'Panneau scanné');

GRANT all on  publ.attendee_status TO :DATABASE_VISITOR;

/*
  TABLE: publ.attendees
  DESCRIPTION: Participants à l'évenement
*/
drop table if exists publ.attendees cascade;
create table publ.attendees (
    id uuid not null default uuid_generate_v4() primary key unique, 
    civility text not null,
    firstname text not null,
    lastname text not null,
    email citext ,
    registration_id uuid references publ.registrations(id) on delete cascade,
    is_fundraising_generosity_ok boolean default false,
    status text not null default 'IDLE' references publ.attendee_status on delete cascade,
    notes text,
    is_inscriptor boolean default false,
    is_vip boolean default false,
    is_news_event_email boolean default false,
    is_news_fondation_email boolean default false,
    panel_number int,
    ticket_number text unique not null default uuid_generate_v4(),
    is_email_sent boolean default false,
    qr_code_url text,
    pdf_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendees(created_at);
  create index on publ.attendees(updated_at);
  create index on publ.attendees(status);
  create index on publ.attendees(email);
  create index on publ.attendees(lastname);
  create index on publ.attendees(civility);
  create index on publ.attendees(registration_id);
  create index on publ.attendees(is_inscriptor);
  create index on publ.attendees(firstname);
  create index on publ.attendees(lastname);
  create index on publ.attendees(is_vip);
  create index on publ.attendees(is_news_event_email);
  create index on publ.attendees(is_news_fondation_email);
  create index on publ.attendees(panel_number);
  create index on publ.attendees(ticket_number);


-- RBAC
  grant select on publ.attendees to :DATABASE_VISITOR;
  grant insert(registration_id, civility, firstname, lastname, email, is_fundraising_generosity_ok, status, is_inscriptor, is_vip) on publ.attendees to :DATABASE_VISITOR;
  grant update(civility, firstname, lastname, email, is_fundraising_generosity_ok, status,panel_number, is_vip) on publ.attendees to :DATABASE_VISITOR;
  grant delete on publ.attendees to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.attendees
  for each row
  execute procedure priv.tg__timestamps();

  drop function if exists priv.tg_generate_ticket_number cascade;
  create function priv.tg_generate_ticket_number() returns trigger as $$
  begin
    -- generate a 7 digit ticket number, check if it is available and loop until it is
    new.ticket_number := substr(md5(random()::text), 0, 9);
    while exists(select 1 from publ.attendees where ticket_number = new.ticket_number) loop
      new.ticket_number := substr(md5(random()::text), 0, 9);
    end loop;
    return new;
  end;
  $$ language plpgsql volatile security definer;

  drop trigger if exists _200_generate_ticket_number on publ.attendees cascade;
  create trigger _200_generate_ticket_number
  before insert on publ.attendees
  for each row
  execute procedure priv.tg_generate_ticket_number();

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



drop function if exists publ.events_attendees cascade;
create function publ.events_attendees(any_event publ.events) returns setof publ.attendees as $$
  select a.* from publ.attendees a
  inner join publ.registrations r on r.id = a.registration_id
  where r.event_id = any_event.id;
$$ language sql stable;
grant execute on function publ.events_attendees to :DATABASE_VISITOR;


drop function if exists publ.attendees_event_id cascade;
create function publ.attendees_event_id(any_attendee publ.attendees) returns uuid as $$
  -- join via publ.registration
  select r.event_id 
  from publ.registrations r
  where r.id = any_attendee.registration_id;
$$ language sql stable;
grant execute on function publ.attendees_event_id to :DATABASE_VISITOR;