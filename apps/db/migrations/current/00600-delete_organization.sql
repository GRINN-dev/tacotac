/*
 * Function to delete an organization; only works if you're the owner.
 */
create function publ.delete_organization(organization_id uuid) returns void as $$
begin
  if exists(
    select 1
    from publ.organization_memberships
    where user_id = publ.current_user_id()
    and organization_memberships.organization_id = delete_organization.organization_id
    and role = 'OWNER'
  ) then
    delete from publ.organizations where id = organization_id;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
