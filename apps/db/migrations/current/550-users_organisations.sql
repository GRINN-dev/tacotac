drop table if exists publ.organization_memberships_roles_enum cascade;
create table publ.organization_memberships_roles_enum (
    type text primary key,
    description text
);
comment on table publ.organization_memberships_roles_enum is E'@enum';

insert into publ.organization_memberships_roles_enum values
    ('OWNER', 'Owner of the organization'),
    ('ADMIN', 'Admin of the organization'),
    ('DEVELOPER', 'Member of the organization'),
    ('MANAGER', 'Manager of the organization'),
    ('CLIENT', 'Client of the organization'),
    ('GUEST', 'Guest of the organization');

GRANT all ON "publ"."organization_memberships_roles_enum" TO :DATABASE_VISITOR;


/*
  TABLE: publ.organization_memberships
  DESCRIPTION: Appartenance des utilisateurs aux organisations
*/
drop table if exists publ.organization_memberships cascade;
create table publ.organization_memberships (
    id uuid not null default uuid_generate_v4() primary key unique, 
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    user_id uuid not null references publ.users(id) on delete cascade,
    role text not null default 'GUEST' references publ.organization_memberships_roles_enum(type) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, user_id)
);

-- indexes
  create index on publ.organization_memberships(created_at);
  create index on publ.organization_memberships(updated_at);
    create index on publ.organization_memberships(organization_id);
    create index on publ.organization_memberships(user_id);
    create index on publ.organization_memberships(role);

-- RBAC
  grant select on publ.organization_memberships to :DATABASE_VISITOR;
  grant insert (organization_id, user_id, role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant update ( role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant delete on publ.organization_memberships to :DATABASE_VISITOR;


-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organization_memberships
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.organization_memberships enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organization_memberships
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organization_memberships
*/



select priv.really_create_user('Michou', 'm.dupond@gmoul.com', true, 'Michel', 'Dupond', 'https://randomuser.me/api/portraits/men/1.jpg', 'password');
select priv.really_create_user('Louis', 'l.martin@gmoul.com', false, 'Louis', 'Martin', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('Louise', 'l.dupuis@gmoul.com', true, 'Louise', 'Dupuis', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('bele', 'b.ele@gmoul.com', true, 'Eléonore', 'Beauregard', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('cam', 'm.cam@gmoul.com', true, 'Camille', 'Monfort', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('admin', 'admin@localhost.com', true, 'Super', 'Admin', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');

update publ.users set is_admin = true where username = 'Michou';
insert into publ.organizations (name, slug, description, logo_url) values ('Michou', 'michou', 'Michou est une organisation', 'https://randomuser.me/api/portraits/men/3.jpg');
insert into publ.organization_memberships (organization_id, user_id, role) values ((select id from publ.organizations where slug='michou'), (select id from publ.users where username='Michou'), 'OWNER');

drop function if exists publ.users_organizations cascade;
create function publ.users_organizations(any_user publ.users) returns table(organization publ.organizations, role text) as $$
  --select o.*, om.role from publ.organization_memberships om join publ.organizations o on o.id = om.organization_id where om.user_id = any_user.id
  -- si user.is_admin, recupère toutes les organizations sinon juste ses memberships
  begin
  if any_user.is_admin then
    return query select o as organization, 'ADMIN' as role from publ.organizations o;
  else
    return query select o as organization, om.role as role from publ.organization_memberships om join publ.organizations o on o.id = om.organization_id where om.user_id = any_user.id;
  end if;
  end;
$$ language plpgsql stable security definer;
grant execute on function publ.users_organizations to :DATABASE_VISITOR;
