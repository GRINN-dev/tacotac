/*
 * This function allows you to invite someone to an organization; you either
 * need to know their username (in which case they must already have an
 * account) or their email (in which case they will be sent an invitation to
 * create an account if they don't already have one, this is handled by the
 * _500_send_email trigger on organization_invitations).
 */
 drop function if exists publ.invite_to_organization cascade;
create function publ.invite_to_organization(organization_id uuid, username citext = null, email citext = null, role text = 'HOST')
  returns void as $$
declare
  v_code text;
  v_user publ.users;
begin
  -- Are we allowed to add this person
  -- Are we logged in
  if publ.current_user_id() is null then
    raise exception 'You must log in to invite a user' using errcode = 'LOGIN';
  end if;

  select * into v_user from publ.users where users.username = invite_to_organization.username;

  -- Are we the owner of this organization
  if not exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = publ.current_user_id()
      and organization_memberships.role in ('OWNER','ADMIN')
  ) then
    raise exception 'You''re not allowed to invite to this organization' using errcode = 'DNIED';
  end if;

  if v_user.id is not null and exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = v_user.id
  ) then
    raise exception 'Cannot invite someone who is already a member' using errcode = 'ISMBR';
  end if;

  if email is not null then
    v_code = encode(gen_random_bytes(7), 'hex');
  end if;

  if v_user.id is not null and not v_user.is_verified then
    raise exception 'The user you attempted to invite has not verified their account' using errcode = 'VRFY2';
  end if;

  if v_user.id is null and email is null then
    raise exception 'Could not find person to invite' using errcode = 'NTFND';
  end if;

  -- Invite the user
  insert into publ.organization_invitations(organization_id, user_id, email, code, role)
    values (invite_to_organization.organization_id, v_user.id, email, v_code, role);
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;
