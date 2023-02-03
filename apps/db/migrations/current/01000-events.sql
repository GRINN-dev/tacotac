/*
    TABLE: publ.eventsevents
    DESCRIPTION:  A event is a group of epics that are related to each other. The event as a whole is a goal that the organization is trying to achieve.
*/
drop table if exists publ.events cascade;
create table publ.events (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    slug text,
    description text not null,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    place_name text,
    address_line_1 text,
    address_line_2 text,
    zip_code text,
    city text,
    country text,
    lat float,
    lon float,
    happening_at timestamptz,
    booking_starts_at timestamptz,
    booking_ends_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint events_organization_id_name_key unique (organization_id, name),
    constraint events_organization_id_slug_key unique (organization_id, slug)
);

-- indexes
    create index on publ.events(organization_id);
    create index on publ.events(created_at);
    create index on publ.events(updated_at);
    create index on publ.events(name);
    create index on publ.events(slug);
    create index on publ.events(city);
    create index on publ.events(happening_at);
    create index on publ.events(booking_starts_at);
    create index on publ.events(booking_ends_at);


-- RBAC
    grant select on publ.events to :DATABASE_VISITOR;
    grant insert(name, description, organization_id, place_name,  address_line_1, address_line_2, zip_code, city, country, lat, lon, happening_at, booking_starts_at, booking_ends_at) on publ.events to :DATABASE_VISITOR;
    grant update(name, description, organization_id, place_name,  address_line_1, address_line_2, zip_code, city, country, lat, lon, happening_at, booking_starts_at, booking_ends_at) on publ.events to :DATABASE_VISITOR;
    grant delete on publ.events to :DATABASE_VISITOR;
-- triggers
    create trigger _100_timestamps
    before insert or update on publ.events
    for each row
    execute procedure priv.tg__timestamps();

    create trigger _700_generate_slug_trigger
    before insert or update on publ.events
    for each row
    execute procedure publ.generate_slug();


-- RLS
    alter table publ.events enable row level security;

    create policy no_limit /*TODO: update policy*/
    on publ.events
    for all
    using (true)
    with check(true);

-- fixtures
    -- fixtures go here
      insert into publ.events (id, name, description, organization_id) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d', 'Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'));
    insert into publ.events (id, name, description, organization_id) values ('2678d40b-c0ee-4472-b9b1-146374a87fa4', 'Canto', 'Le conservatoire du chant populaire', (select id from publ.organizations where name = 'The Organisation'));
    insert into publ.events (id, name, description, organization_id) values ('a04700b6-8afc-4ce5-a820-599b6cef5de1', 'Napol.io', 'Le meilleur booster de productivité pour la gestion de projet informatique', (select id from publ.organizations where name = 'The Organisation'));

/*
    END TABLE: publ.events

*/
create or replace function publ.date_trunc_func(unit text, date timestamptz)
RETURNS timestamptz AS $$
  SELECT date_trunc($1, $2) - interval '30 days';
$$ LANGUAGE sql stable security definer;

create or replace function publ.event_by_slug(event_slug text, organization_slug text) returns publ.events as $$
  select proj from publ.events proj
  inner join publ.organizations org on org.id = proj.organization_id
  where proj.slug = event_slug and org.slug = organization_slug
  limit 1;
$$ language sql stable security definer;

grant execute on function publ.event_by_slug(text, text) to :DATABASE_VISITOR;

/*
  TABLE: publ.registrations
  DESCRIPTION: la table registration contient les inscriptions d'un evenement
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    firstname text not null,
    lastname text not null,
    email citext not null,
    event_id uuid  references publ.events(id),
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
