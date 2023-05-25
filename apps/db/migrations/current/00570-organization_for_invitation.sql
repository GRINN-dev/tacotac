/*
 * When you receive an invitation code (but don't yet have an account) you may
 * wish to see the organization before creating an account; this function
 * allows you to do so. It only shows you the organization, not the members,
 * you'll need to sign up (and verify your email) for that.
 */
create function publ.organization_for_invitation(invitation_id uuid, code text = null)
  returns publ.organizations as $$
declare
  v_invitation publ.organization_invitations;
  v_organization publ.organizations;
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to accept an invitation' using errcode = 'LOGIN';
  end if;

  select * into v_invitation from publ.organization_invitations where id = invitation_id;

  if v_invitation is null then
    raise exception 'We could not find that invitation' using errcode = 'NTFND';
  end if;

  if v_invitation.user_id is not null then
    if v_invitation.user_id is distinct from publ.current_user_id() then
      raise exception 'That invitation is not for you' using errcode = 'DNIED';
    end if;
  else
    if v_invitation.code is distinct from code then
      raise exception 'Incorrect invitation code' using errcode = 'DNIED';
    end if;
  end if;

  select * into v_organization from publ.organizations where id = v_invitation.organization_id;

  return v_organization;
end;
$$ language plpgsql stable security definer set search_path = pg_catalog, public, pg_temp;
