drop table if exists publ.logs_status cascade;
create table publ.logs_status (
    type text primary key,
    description text
);
comment on table publ.logs_status is E'@enum';

insert into publ.logs_status values
    ('OK', 'Tout se passe bien'),
    ('WARNING', 'Attention'),
    ('ERROR', 'Une erreur au scanning s''est produite'),
    ('INVALID_TICKET', 'Ticket scanné non valide');

/*
  TABLE: publ.logs
  DESCRIPTION: table qui regroupe les inscriptions en temps réel de l'event
*/
drop table if exists publ.logs cascade;
create table publ.logs (
    id uuid not null default uuid_generate_v4() primary key unique,
    event_id uuid references publ.events(id) ,
    status text not null references publ.logs_status on delete cascade,
    payload jsonb default '{"current_total_registrations":0, "current_confirmed_registrations":0}',
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

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.logs
  for each row
  execute procedure priv.tg__timestamps();

  create function priv.logs__insert_with_event() returns trigger as $$
begin
  insert into publ.logs(event_id, status) values(NEW.id,'OK') 
  on conflict do nothing;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_logs
  after insert on publ.events
  for each row
  execute procedure priv.logs__insert_with_event();
comment on function priv.logs__insert_with_event() is E'Ensures that every create event insert create logs';

-- RLS
  alter table publ.logs enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.logs
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here

  insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d','Nantes', 'Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('2678d40b-c0ee-4472-b9b1-146374a87fa4','Nantes', 'Canto', 'Le conservatoire du chant populaire', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('a04700b6-8afc-4ce5-a820-599b6cef5de1','Nantes', 'Napol.io', 'Le meilleur booster de productivité pour la gestion de projet informatique', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('3d370256-eb3c-42ce-9e8f-fa4dda7ab0fa','Nantes', 'third', 'third', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('ce860692-57ef-4905-848d-3e22302a6fea','Nantes', 'test', 'test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));

    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('347687ee-e455-4041-a3e0-ccf484149785', 'Paris','second test', 'second test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),'2023-02-20 20:00:00','2023-12-20 20:00:00');
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('1f12aafb-349e-47b6-bc70-d930edd1a329', 'Paris','gfhdfgh', 'gfhdfgh', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('8ab9e304-f321-4a9d-bfdf-47773a97ff04', 'Paris','wxcvcxv', 'wxcvcxv', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('3844c7d0-a1a2-48e7-bd70-fd771a189f12', 'Paris','azdaz', 'azdaz', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));

/*
  END TABLE: publ.logs
*/

 

    