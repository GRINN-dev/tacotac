-- exemple
--   status text default 'OK' references  publ.test_table_status on delete restrict,
--   attendee_id uuid not null unique references publ.attendees(id) on delete cascade,

/*
  TABLE: publ.communications
  DESCRIPTION: table regroupant les mails liés a un événement
*/
drop table if exists publ.communications cascade;
create table publ.communications (
  id uuid not null default uuid_generate_v4() primary key unique, 
  "from" text not null,
  filter text,
  subject text not null,
  content text not null,
  draft boolean not null default true,
  event_id uuid unique references publ.events(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.communications(created_at);
  create index on publ.communications(updated_at);
  create index on publ.communications("from");
  create index on publ.communications(filter);
  create index on publ.communications(subject);
  create index on publ.communications(content);
  create index on publ.communications(draft);
  create index on publ.communications(event_id);

-- RBAC
  grant select on publ.communications to :DATABASE_VISITOR;
  grant delete on publ.communications to :DATABASE_VISITOR;

  grant insert ("from", filter,subject, content, draft, event_id) on publ.communications to :DATABASE_VISITOR;
  grant update ("from", filter,subject, content, draft, event_id) on publ.communications to :DATABASE_VISITOR; 
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.communications
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.communications enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.communications
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.communications
*/
/*
  TABLE: publ.experiences
  DESCRIPTION: table retour utilisateur
*/
drop table if exists publ.experiences cascade;
create table publ.experiences (
  id uuid not null default uuid_generate_v4() primary key unique, 
  registration_id uuid unique references publ.registrations(id) on delete cascade,
  rating integer,
  feedback text,
  recommended boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.experiences(created_at);
  create index on publ.experiences(updated_at);
  create index on publ.experiences(registration_id);
  create index on publ.experiences(rating);
  create index on publ.experiences(feedback);
  create index on publ.experiences(recommended);

-- RBAC
  grant select on publ.experiences to :DATABASE_VISITOR;
  grant delete on publ.experiences to :DATABASE_VISITOR;

  grant insert (registration_id, rating, feedback, recommended) on publ.experiences to :DATABASE_VISITOR;
  grant update (registration_id, rating, feedback, recommended) on publ.experiences to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.experiences
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.experiences enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.experiences
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.experiences
*/