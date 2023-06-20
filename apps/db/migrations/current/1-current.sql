-- Enter migration here
drop trigger if exists generate_slug_trigger on publ.organizations;
CREATE TRIGGER generate_slug_trigger
BEFORE INSERT ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();


drop trigger if exists _700_generate_slug_trigger on publ.events;
  create trigger _700_generate_slug_trigger
    before insert on publ.events
    for each row
    execute procedure publ.generate_slug();


drop function if exists publ.users_events cascade;
create function publ.users_events(any_user publ.users) returns setof publ.events as $$
  select * from publ.events where organization_id in (select organization_id from publ.organization_memberships where user_id = any_user.id);
$$ language sql stable security definer;
grant execute on function publ.users_events to :DATABASE_VISITOR;



/* 
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
    status text references publ.event_status on delete restrict,
    capacity int,
    is_cancelled boolean not null default false,
    details text,
    webhooks text[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    is_draft boolean not null default true,
    constraint events_organization_id_name_key unique (organization_id, name),
    constraint events_organization_id_slug_key unique (organization_id, slug)
);
 */

 -- drop not null constraints on description

alter table publ.events alter column description drop not null;
