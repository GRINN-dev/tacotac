

CREATE TYPE special_type AS ENUM ('Régime special', 'Nom Entreprise', 'Intitulé du poste', 'Choix multiple', 'Choix unique', 'date');
/*
  TABLE: publ.specials
  DESCRIPTION: table regroupant des éléments spécifique a l'inscription
*/
drop table if exists publ.specials cascade;
create table publ.specials (
  id uuid not null default uuid_generate_v4() primary key unique, 
  type special_type not null,
  is_mandatory boolean not null,
  is_sensitive boolean not null,
  is_modifiable boolean not null,
  is_hidden boolean not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.specials(created_at);
  create index on publ.specials(updated_at);
  create index on publ.specials(type);
  create index on publ.specials(is_mandatory);
  create index on publ.specials(is_sensitive);
  create index on publ.specials(is_modifiable);
  create index on publ.specials(is_hidden);

-- RBAC
  grant select on publ.specials to :DATABASE_VISITOR;
  grant delete on publ.specials to :DATABASE_VISITOR;

  grant insert (type, is_mandatory,is_sensitive,is_modifiable,is_hidden) on publ.specials to :DATABASE_VISITOR;
  grant update (type, is_mandatory,is_sensitive,is_modifiable,is_hidden) on publ.specials to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.specials
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.specials enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.specials
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
CREATE OR REPLACE FUNCTION check_special_id() RETURNS BOOLEAN AS $$
BEGIN
  IF special_id is null OR special_id in (select id from specials where type in ('regime special', 'choix multiple', 'choix unique')) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;
/*
  END TABLE: publ.specials
*//*
  TABLE: publ.options
  DESCRIPTION: table regroupant divers options disponible lié a table spécials
*/
drop table if exists publ.options cascade;
create table publ.options (
  id uuid not null default uuid_generate_v4() primary key unique, 
  texte text not null,
  special_id uuid not null REFERENCES specials(id) on delete set null,
  CONSTRAINT check_special_id CHECK (check_special_id()),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.options(created_at);
  create index on publ.options(updated_at);
  create index on publ.options(texte);
  create index on publ.options(special_id);

-- RBAC
  grant select on publ.options to :DATABASE_VISITOR;
  grant delete on publ.specials to :DATABASE_VISITOR;

  grant insert (type, is_mandatory,is_sensitive,is_modifiable,is_hidden) on publ.specials to :DATABASE_VISITOR;
  grant update (type, is_mandatory,is_sensitive,is_modifiable,is_hidden) on publ.specials to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.options
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.options enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.options
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here



/*
  END TABLE: publ.options
*/




/*
  TABLE: publ.registrations
  DESCRIPTION: table regroupant lesinscriptions
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
  id uuid not null default uuid_generate_v4() primary key unique, 
  firstname text not null,
  lastname text not null,
  email text not null unique,
  special_id uuid unique references publ.specials(id) ON DELETE SET NULL,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.registrations(created_at);
  create index on publ.registrations(updated_at);
  create index on publ.registrations(firstname);
  create index on publ.registrations(lastname);
  create index on publ.registrations(email);

-- RBAC
  grant select on publ.registrations to :DATABASE_VISITOR;
  grant delete on publ.registrations to :DATABASE_VISITOR;

  grant insert (firstname, lastname,email) on publ.registrations to :DATABASE_VISITOR;
  grant update (firstname, lastname,email) on publ.registrations to :DATABASE_VISITOR; 
  
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