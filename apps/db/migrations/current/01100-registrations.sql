/*
  TABLE: publ.registrations
  DESCRIPTION: la table registration contient les inscriptions d'un evenement
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid  references publ.events(id),
    hear_about_list text[] default '{"par un mécène", "par une association lauréate", "par le bouche à oreille", "autre", "par Obole, co-organisateur de l''événement", "par la Fondation de France, co-organisateur de l''événement"}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

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
-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.registrations
*/