/*
 * If you don't receive the email verification email, you can trigger a resend
 * with this function.
 */
create function publ.resend_email_verification_code(user_id uuid) returns boolean as $$
begin
  if exists(
    select 1
    from publ.users
    where users.id = user_id
    and user_id = publ.current_user_id()
    and is_verified is false
  ) then
    perform graphile_worker.add_job('user_emails__send_verification', json_build_object('id', user_id));
    return true;
  end if;
  return false;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.resend_email_verification_code(user_id uuid) is
  E'If you didn''t receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently.';
