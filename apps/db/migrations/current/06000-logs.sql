drop table if exists publ.logs_status cascade;
create table publ.logs_status (
    type text primary key,
    description text
);
comment on table publ.logs_status is E'@enum';

insert into publ.logs_status values
    ('OK', 'Tout se passe bien'),
    ('WARNING', 'Attention'),
    ('WARNING_EMAIL','Pas d''email'),
    ('WARNING_PANEL','Pas de panneau'),
    ('ERROR', 'Une erreur s''est produite'),
    ('WARNING_SIGN_CODE', 'Probleme de QR Code');

/*
  TABLE: publ.logs
  DESCRIPTION: table qui regroupe les inscriptions en temps réel de l'event
*/
drop table if exists publ.logs cascade;
create table publ.logs (
    id uuid not null default uuid_generate_v4() primary key unique,
    event_id uuid references publ.events(id) ,
    status text not null references publ.logs_status on delete cascade,
    payload json,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.logs(created_at);
  create index on publ.logs(updated_at);
  create index on publ.logs(status);
  create index on publ.logs(event_id);

-- RBAC
  grant select on publ.logs to :DATABASE_VISITOR;
  grant insert(event_id, status, payload) on publ.logs to :DATABASE_VISITOR;
  grant update(status, payload) on publ.logs to :DATABASE_VISITOR;
  grant delete on publ.logs to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.logs
  for each row
  execute procedure priv.tg__timestamps();


-- RLS
  alter table publ.logs enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.logs
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here


/*
  END TABLE: publ.logs
*/

 

    