/*
 * This function is responsible for reading the `jwt.claims.session_id`
 * transaction setting (set from the `pgSettings` function within
 * `installPostGraphile.ts`). Defining this inside a function means we can
 * modify it in future to allow additional ways of defining the session.
 */

-- Note we have this in `publ` but it doesn't show up in the GraphQL
-- schema because we've used `postgraphile.tags.jsonc` to omit it. We could
-- have put it in app_hidden to get the same effect more easily, but it's often
-- useful to un-omit it to ease debugging auth issues.
create function publ.current_session_id() returns uuid as $$
  select nullif(pg_catalog.current_setting('jwt.claims.session_id', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_session_id() is
  E'Handy method to get the current session ID.';


/*
 * We can figure out who the current user is by looking up their session in the
 * sessions table using the `current_session_id()` function.
 *
 * A less secure but more performant version of this function might contain only:
 *
 *   select nullif(pg_catalog.current_setting('jwt.claims.user_id', true), '')::uuid;
 *
 * The increased security of this implementation is because even if someone gets
 * the ability to run SQL within this transaction they cannot impersonate
 * another user without knowing their session_id (which should be closely
 * guarded).
 *
 * The below implementation is more secure than simply indicating the user_id
 * directly: even if an SQL injection vulnerability were to allow a user to set
 * their `jwt.claims.session_id` to another value, it would take them many
 * millenia to be able to correctly guess someone else's session id (since it's
 * a cryptographically secure random value that is kept secret). This makes
 * impersonating another user virtually impossible.
 */
create function publ.current_user_id() returns uuid as $$
  select user_id from priv.sessions where uuid = publ.current_session_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.current_user_id() is
  E'Handy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead.';


-- priv.verify_refresh_token(user_id uuid, refresh_token text) returns boolean
-- This function is used to verify the refresh token sent by the client.

create or replace function priv.verify_refresh_token(user_id uuid, refresh_token text) returns boolean as $$
  select exists(select 1 from priv.sessions where user_id = $1 and refresh_token = $2);
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;
comment on function priv.verify_refresh_token(user_id uuid, refresh_token text) is
  E'Verify the refresh token sent by the client.';