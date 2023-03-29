/*
 * The sessions table is used to track who is logged in, if there are any
 * restrictions on that session, when it was last active (so we know if it's
 * still valid), etc.
 * 
 * things deffer from graphile starter:
 * we don't use classical stateful sessions, we use JWT tokens. 
 * a short-lived access token is sent to the client, and a long-lived refresh token is stored in the database.
 * the access token is used to authenticate the user, and the refresh token is used to refresh the access token.
 * only the refresh token is verrfied against the database, and the access token is not.
 * 
 * the refresh token is stored in a http-only cookie, and the access token is sent in the Authorization header.
  * first, the access token is verified, and if it is valid, the user is logged in.
  * if the access token is invalid, the refresh token is verified (expiracy and signing) in our express app, and if it is valid, it is verified against the database.
 */

create table priv.sessions (
  uuid uuid not null default gen_random_uuid() primary key,
  user_id uuid not null,
  refresh_token text,
  -- You could add access restriction columns here if you want, e.g. for OAuth scopes.
  created_at timestamptz not null default now(),
  last_active timestamptz not null default now(),
  -- You could add a `last_auth_at` column here if you want to track when the
  -- user last authenticated (e.g. by logging in, or by using a refresh token).
  -- This would allow you to require them to re-authenticate for certain
  -- actions, such as changing their password, or changing their email address.
  -- (GitHub does this when you attempt to change the settings on a repository,
  -- for example.)
 last_auth_at timestamptz not null default now()
  -- You could add a `last_ip` column here if you want to track the IP address
  -- of the user when they last authenticated.
  -- last_ip inet not null default inet_client_addr(),
  -- You could add a `last_user_agent` column here if you want to track the
  -- user agent of the user when they last authenticated.
  -- last_user_agent text not null default http_user_agent(),
  -- You could add a `last_device` column here if you want to track the device
  -- of the user when they last authenticated.
  -- last_device text not null default http_user_agent(),
  -- You could add a `last_location` column here if you want to track the
  -- location of the user when they last authenticated.
  -- last_location text not null default http_user_agent(),

);
alter table priv.sessions enable row level security;

-- To allow us to efficiently see what sessions are open for a particular user.
create index on priv.sessions (user_id);
create index on priv.sessions (refresh_token);
