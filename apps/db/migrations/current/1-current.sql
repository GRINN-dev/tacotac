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
