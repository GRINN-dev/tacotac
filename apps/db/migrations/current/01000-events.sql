
/*
    TABLE: publ.events
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
    starts_at timestamptz,
    ends_at timestamptz,
    booking_starts_at timestamptz,
    booking_ends_at timestamptz,
    capacity int,
    is_vip boolean,
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
    create index on publ.events(starts_at);
    create index on publ.events(ends_at);
    create index on publ.events(booking_starts_at);
    create index on publ.events(booking_ends_at);
    create index on publ.events(capacity);



-- RBAC
    grant select on publ.events to :DATABASE_VISITOR;
    grant insert(name, description, organization_id, place_name,  address_line_1, address_line_2, zip_code, city, country, lat, lon, starts_at,ends_at, booking_starts_at, booking_ends_at, capacity) on publ.events to :DATABASE_VISITOR;
    grant update(name, description, organization_id, place_name,  address_line_1, address_line_2, zip_code, city, country, lat, lon, starts_at,ends_at, booking_starts_at, booking_ends_at, capacity) on publ.events to :DATABASE_VISITOR;
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

--test
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
drop table if exists publ.fonts cascade;
create table publ.fonts (
    type text primary key,
    description text
);
comment on table publ.fonts is E'@enum';

insert into publ.fonts values
    ('roboto', 'Roboto'),
    ('montserrat', 'Montserrat'),
    ('opensans', 'Open Sans');
GRANT all ON "publ"."fonts" TO :DATABASE_VISITOR;

/*
  TABLE: publ.event_brandings
  DESCRIPTION: table regroupant les informations custom de l'event
*/
drop table if exists publ.event_brandings cascade;
create table publ.event_brandings (
  id uuid not null default uuid_generate_v4() primary key unique, 
  event_id uuid not null unique references publ.events(id) on delete cascade,
  color_1 text,
  color_2 text,
  font text  references publ.fonts on delete cascade,
  logo text,
  placeholder json, 
  rich_text text,
  short_text varchar(32),
  award_winning_asso_list text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.event_brandings(id);
  create index on publ.event_brandings(event_id);
  create index on publ.event_brandings(created_at);
  create index on publ.event_brandings(updated_at);


-- RBAC
    grant select on publ.event_brandings to :DATABASE_VISITOR;
    grant insert( color_1, color_2, font, logo, placeholder, rich_text, short_text) on publ.event_brandings to :DATABASE_VISITOR;
    grant update( color_1, color_2, font, logo, rich_text, short_text,award_winning_asso_list) on publ.event_brandings to :DATABASE_VISITOR;
    --grant ALL  on table publ.event_brandings to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.event_brandings
  for each row
  execute procedure priv.tg__timestamps();




create function priv.event_branding__insert_with_event() returns trigger as $$
begin
  insert into publ.event_brandings(event_id, color_1, color_2,font, logo, placeholder, rich_text, short_text) values(NEW.id,'023047','e63946','roboto','https://lille.lanuitdubiencommun.com/lib_YZQWsZJIBnpPHhyU/9co78sidc8k6jjf1.png?w=140','{"placeholder":"civilité","placeholder":"nom","placeholder":"prenom","placeholder":"email"}','rich text goes  here','short text') 
  on conflict do nothing;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_branding
  after insert on publ.events
  for each row
  execute procedure priv.event_branding__insert_with_event();
comment on function priv.event_branding__insert_with_event() is E'Ensures that every create event insert branding value in event_branding';

-- RLS
  alter table publ.event_brandings enable row level security;
  



 create policy no_limit /*TODO: update policy*/
   on publ.event_brandings
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  --insert into publ.event_brandings(event_id, color_1) values ((select id from publ.events where name = 'third'), 'test color');
  insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d','Nantes', 'Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('2678d40b-c0ee-4472-b9b1-146374a87fa4','Nantes', 'Canto', 'Le conservatoire du chant populaire', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('a04700b6-8afc-4ce5-a820-599b6cef5de1','Nantes', 'Napol.io', 'Le meilleur booster de productivité pour la gestion de projet informatique', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('3d370256-eb3c-42ce-9e8f-fa4dda7ab0fa','Nantes', 'third', 'third', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('ce860692-57ef-4905-848d-3e22302a6fea','Nantes', 'test', 'test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));

    insert into publ.events ( city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ( 'Paris','second test', 'second test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events ( city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ( 'Paris','gfhdfgh', 'gfhdfgh', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events ( city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ( 'Paris','wxcvcxv', 'wxcvcxv', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));
    insert into publ.events ( city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ( 'Paris','azdaz', 'azdaz', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')),(select timestamp '2023-01-10 20:00:00' + random() * (timestamp '2023-01-20 20:00:00' - timestamp '2023-01-10 10:00:00')));

/*
  END TABLE: publ.event_brandings
*/