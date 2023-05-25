/*
 * This function can be used to remove yourself or (if you're the org owner)
 * someone else from an organization. Idempotent - if they're not a member then
 * just return. Assume they know the rules; don't throw error if they're not
 * allowed, just return.
 */
create function publ.remove_from_organization(
  organization_id uuid,
  user_id uuid
) returns void as $$
declare
  v_my_membership publ.organization_memberships;
begin
  select * into v_my_membership
    from publ.organization_memberships
    where organization_memberships.organization_id = remove_from_organization.organization_id
    and organization_memberships.user_id = publ.current_user_id();

  if (v_my_membership is null) then
    -- I'm not a member of that organization
    return;
  elsif v_my_membership.role = 'OWNER' then
    if remove_from_organization.user_id <> publ.current_user_id() then
      -- Delete it
    else
      -- Need to transfer ownership before I can leave
      return;
    end if;
  elsif v_my_membership.user_id = user_id then
    -- Delete it
  else
    -- Not allowed to delete it
    return;
  end if;

/*   if v_my_membership.is_billing_contact then
    update publ.organization_memberships
      set is_billing_contact = false
      where id = v_my_membership.id
      returning * into v_my_membership;
    update publ.organization_memberships
      set is_billing_contact = true
      where organization_memberships.organization_id = remove_from_organization.organization_id
      and organization_memberships.role = 'OWNER';
  end if; */

  delete from publ.organization_memberships
    where organization_memberships.organization_id = remove_from_organization.organization_id
    and organization_memberships.user_id = remove_from_organization.user_id;

end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
