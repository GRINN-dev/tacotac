/*
  TABLE: publ.organizations
  DESCRIPTION: An organisation is a group of people who work together on projects.
*/
drop table if exists publ.organizations cascade;
create table publ.organizations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text unique not null,
    slug text unique,
    description text not null,
    logo_url text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.organizations(created_at);
  create index on publ.organizations(updated_at);
  create index on publ.organizations(name);
  create index on publ.organizations(slug);

-- RBAC
  grant select on publ.organizations to :DATABASE_VISITOR;
    grant insert(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;
    grant update(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organizations
  for each row
  execute procedure priv.tg__timestamps();
  


CREATE TRIGGER generate_slug_trigger
BEFORE INSERT OR UPDATE ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();

-- RLS
  alter table publ.organizations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organizations
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  insert into publ.organizations (id, name, description, logo_url) values ('3fdd6e49-8a4b-41c8-8df0-17fe8be4efb8', 'The Organisation', 'The Organisation is a group of people who work together on projects.', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('3d670ad3-29c6-4a8d-a761-f8494859c67f', 'La Nuit Du Bien Commun', 'La nuit du bien commun', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('80bdb4c2-6fee-488c-b0c2-d9e34317c1d2', 'Obole', 'Obole startup', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('881a4dc1-b74f-4e21-9d37-87b83970642f', 'Grinn', 'Grinn agency web', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
/*
  END TABLE: publ.organizations
*/
