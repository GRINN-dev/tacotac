-- Enter migration here
--! Previous: sha1:666353c326ad7665e3f8deb078eed0a60b889a7d
--! Hash: sha1:9b3089a31799184e75d87514b88864e214eb4a69
--! Message: return_error_invit_orga

--! split: 1-current.sql
-- Enter migration here
drop type if exists publ.type_error_code_and_message cascade;
create type publ.type_error_code_and_message as (
  data json,
  error_code text,
  error_message text,
  error_value integer
);

drop function if exists publ.invite_to_organization cascade;
create function publ.invite_to_organization(organization_id uuid, username citext = null, email citext = null, role text = 'HOST')
  returns publ.type_error_code_and_message as $$
declare
  v_code text;
  v_user publ.users;
  v_invite_error publ.type_error_code_and_message;
begin
  -- Initialize the error structure
  v_invite_error.error_code := null;
  v_invite_error.error_message := null;

  -- Are we allowed to add this person
  -- Are we logged in
  if publ.current_user_id() is null then
    v_invite_error.error_code:='LOGIN';
    v_invite_error.error_message:='You must log in to invite a user';
    return v_invite_error;
  end if;

  select * into v_user from publ.users where users.username = invite_to_organization.username;

  -- Are we the owner of this organization
  if not exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = publ.current_user_id()
      and organization_memberships.role in ('OWNER','ADMIN')
  ) then
    v_invite_error.error_code:='DNIED';
    v_invite_error.error_message:='You''re not allowed to invite to this organization';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'You''re not allowed to invite to this organization' using errcode = 'DNIED';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if v_user.id is not null and exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = v_user.id
  ) then
    v_invite_error.error_code:='ISMBR';
    v_invite_error.error_message:='Cannot invite someone who is already a member';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'Cannot invite someone who is already a member' using errcode = 'ISMBR';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if email is not null then
    v_code = encode(gen_random_bytes(7), 'hex');
  end if;

  if v_user.id is not null and not v_user.is_verified then
    v_invite_error.error_code:='VRFY2';
    v_invite_error.error_message:='The user you attempted to invite has not verified their account';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'The user you attempted to invite has not verified their account' using errcode = 'VRFY2';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if v_user.id is null and email is null then
    v_invite_error.error_code:='NTFND';
    v_invite_error.error_message:='Could not find a person to invite';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'Could not find a person to invite' using errcode = 'NTFND';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  -- Invite the user si pas d'erreur
  IF v_invite_error.error_code IS NULL THEN
    insert into publ.organization_invitations(organization_id, user_id, email, code, role)
     values (invite_to_organization.organization_id, v_user.id, email, v_code, role);
  END IF;

  -- Return the error structure (null if no errors occurred)
  return v_invite_error;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;
