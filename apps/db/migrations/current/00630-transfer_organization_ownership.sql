/*
 * Allows organization owner to transfer ownership of the organization to
 * another organization member.
 */
create function publ.transfer_organization_ownership(organization_id uuid, user_id uuid) returns publ.organizations as $$
declare
 v_org publ.organizations;
begin
  if exists(
    select 1
    from publ.organization_memberships
    where organization_memberships.user_id = publ.current_user_id()
    and organization_memberships.organization_id = transfer_organization_ownership.organization_id
    and role = 'OWNER'
  ) then
    update publ.organization_memberships
      set role = 'OWNER'
      where organization_memberships.organization_id = transfer_organization_ownership.organization_id
      and organization_memberships.user_id = transfer_organization_ownership.user_id;
    if found then
      update publ.organization_memberships
        set role = 'OWNER'
        where organization_memberships.organization_id = transfer_organization_ownership.organization_id
        and organization_memberships.user_id = publ.current_user_id();

      select * into v_org from publ.organizations where id = organization_id;
      return v_org;
    end if;
  end if;
  return null;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
