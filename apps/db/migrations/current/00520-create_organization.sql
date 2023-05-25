/*
 * When a user creates an organization they automatically become the owner and
 * billing contact of that organization.
 */

create function publ.create_organization(name text) returns publ.organizations as $$
declare
  v_org publ.organizations;
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to create an organization' using errcode = 'LOGIN';
  end if;
  insert into publ.organizations ( name) values ( name) returning * into v_org;
  insert into publ.organization_memberships (organization_id, user_id, role)
    values(v_org.id, publ.current_user_id(), 'OWNER');
  return v_org;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;
