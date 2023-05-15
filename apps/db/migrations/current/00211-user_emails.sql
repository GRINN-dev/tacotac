create function publ.verify_email(user_id uuid, token text) returns boolean as $$
begin
  update publ.users
  set
    is_verified = true
  where id = user_id
  and exists(
    select 1 from priv.user_secrets where user_secrets.user_id = users.id and verification_token = token
  );
  return found;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.verify_email(user_id uuid, token text) is
  E'Once you have received a verification token for your email, you may call this mutation with that token to make your email verified.';