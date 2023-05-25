/*
 * Users can see organizations and organization members if they are themselves
 * a member of the same organization, or if they've been invited to that
 * organization. To achieve that, we create two SECURITY DEFINER functions
 * (which bypass RLS) to determine which organizations you're a member of or
 * have been invited to, and then use these in the policies below. NOTE: we're
 * not expecting a particularly large number of values to be returned from
 * these functions.
 */

create function publ.current_user_member_organization_ids() returns setof uuid as $$
  select organization_id from publ.organization_memberships
    where user_id = publ.current_user_id();
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

create function publ.current_user_invited_organization_ids() returns setof uuid as $$
  select organization_id from publ.organization_invitations
    where user_id = publ.current_user_id();
$$ language sql stable security definer set search_path = pg_catalog, public, pg_temp;

create policy select_member on publ.organizations
  for select using (id in (select publ.current_user_member_organization_ids()));

create policy select_invited on publ.organizations
  for select using (id in (select publ.current_user_invited_organization_ids()));

create policy select_member on publ.organization_memberships
  for select using (organization_id in (select publ.current_user_member_organization_ids()));

create policy select_invited on publ.organization_memberships
  for select using (organization_id in (select publ.current_user_invited_organization_ids()));

create policy update_owner on publ.organizations for update using (exists(
  select 1
  from publ.organization_memberships
  where organization_id = organizations.id
  and user_id = publ.current_user_id()
  and role = 'OWNER'
));
