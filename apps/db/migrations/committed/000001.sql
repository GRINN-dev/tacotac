--! Previous: -
--! Hash: sha1:b82f87876202958868e2f5c89772f0a84b387a98

--! split: 00001.sql
drop schema if exists publ cascade;
drop schema if exists priv cascade;

/*
 * The `public` *schema* contains things like PostgreSQL extensions. We
 * deliberately do not install application logic into the public schema
 * (instead storing it to publ/priv as appropriate),
 * but none the less we don't want untrusted roles to be able to install or
 * modify things into the public schema.
 *
 * The `public` *role* is automatically inherited by all other roles; we only
 * want specific roles to be able to access our database so we must revoke
 * access to the `public` role.
 */
revoke all on schema public from public;

alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

-- Of course we want our database owner to be able to do anything inside the
-- database, so we grant access to the `public` schema:
grant all on schema public to :DATABASE_OWNER;


/*
 * Read about our publ/priv schemas here:
 * https://www.graphile.org/postgraphile/namespaces/#advice
 *
 * Note this pattern is not required to use PostGraphile, it's merely the
 * preference of the author of this package.
 */
create schema publ;
create schema priv;

--GRANT USAGE ON SCHEMA publ TO :DATABASE_AUTHENTICATOR;
--GRANT select ON SCHEMA publ TO :DATABASE_VISITOR;

-- The 'visitor' role (used by PostGraphile to represent an end user) may
-- access the public, and publ schemas (but _NOT_ the
-- priv schema).
grant usage on schema public, publ to :DATABASE_VISITOR;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, publ
  grant usage, select on sequences to :DATABASE_VISITOR;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, publ
  grant execute on functions to :DATABASE_VISITOR;

--! split: 00010-common_triggers.sql
/*
 * These triggers are commonly used across many tables.
 */

-- Used for queueing jobs easily; relies on the fact that every table we have
-- has a primary key 'id' column; this won't work if you rename your primary
-- key columns.
create function priv.tg__add_job() returns trigger as $$
begin
  perform graphile_worker.add_job(tg_argv[0], json_build_object('id', NEW.id));
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__add_job() is
  E'Useful shortcut to create a job on insert/update. Pass the task name as the first trigger argument, and optionally the queue name as the second argument. The record id will automatically be available on the JSON payload.';

-- This trigger is used to queue a job to inform a user that a significant
-- security change has been made to their account (e.g. adding a new email
-- address, linking a new social login).
create function priv.tg__add_audit_job() returns trigger as $$
declare
  v_user_id uuid;
  v_type text = TG_ARGV[0];
  v_user_id_attribute text = TG_ARGV[1];
  v_extra_attribute1 text = TG_ARGV[2];
  v_extra_attribute2 text = TG_ARGV[3];
  v_extra_attribute3 text = TG_ARGV[4];
  v_extra1 text;
  v_extra2 text;
  v_extra3 text;
begin
  if v_user_id_attribute is null then
    raise exception 'Invalid tg__add_audit_job call';
  end if;

  execute 'select ($1.' || quote_ident(v_user_id_attribute) || ')::uuid'
    using (case when TG_OP = 'INSERT' then NEW else OLD end)
    into v_user_id;

  if v_extra_attribute1 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute1) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra1;
  end if;
  if v_extra_attribute2 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute2) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra2;
  end if;
  if v_extra_attribute3 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute3) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra3;
  end if;

  if v_user_id is not null then
    perform graphile_worker.add_job(
      'user__audit',
      json_build_object(
        'type', v_type,
        'user_id', v_user_id,
        'extra1', v_extra1,
        'extra2', v_extra2,
        'extra3', v_extra3,
        'current_user_id', publ.current_user_id(),
        'schema', TG_TABLE_SCHEMA,
        'table', TG_TABLE_NAME
      ));
  end if;

  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__add_audit_job() is
  E'For notifying a user that an auditable action has taken place. Call with audit event name, user ID attribute name, and optionally another value to be included (e.g. the PK of the table, or some other relevant information). e.g. `tg__add_audit_job(''added_email'', ''user_id'', ''email'')`';

/*
 * This trigger is used on tables with created_at and updated_at to ensure that
 * these timestamps are kept valid (namely: `created_at` cannot be changed, and
 * `updated_at` must be monotonically increasing).
 */
create function priv.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__timestamps() is
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

/*
 * This trigger is useful for adding realtime features to our GraphQL schema
 * with minimal effort in the database. It's a very generic trigger function;
 * you're intended to pass three arguments when you call it:
 *
 * 1. The "event" name to include, this is an arbitrary string.
 * 2. The "topic" template that we'll be publishing the event to. A `$1` in
 *    this may be added as a placeholder which will be replaced by the
 *    "subject" value.
 * 3. The "subject" column, we'll read the value of this column from the NEW
 *    (for insert/update) or OLD (for delete) record and include it in the
 *    event payload.
 *
 * A PostgreSQL `NOTIFY` will be issued to the topic (or "channel") generated
 * from arguments 2 and 3, the body of the notification will be a stringified
 * JSON object containing `event`, `sub` (the subject specified by argument 3)
 * and `id` (the record id).
 *
 * Example:
 *
 *     create trigger _500_gql_update
 *       after update on publ.users
 *       for each row
 *       execute procedure publ.tg__graphql_subscription(
 *         'userChanged', -- the "event" string, useful for the client to know what happened
 *         'graphql:user:$1', -- the "topic" the event will be published to, as a template
 *         'id' -- If specified, `$1` above will be replaced with NEW.id or OLD.id from the trigger.
 *       );
 */
create function publ.tg__graphql_subscription() returns trigger as $$
declare
  v_process_new bool = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old bool = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event text = TG_ARGV[0];
  v_topic_template text = TG_ARGV[1];
  v_attribute text = TG_ARGV[2];
  v_record record;
  v_sub text;
  v_topic text;
  v_i int = 0;
  v_last_topic text;
begin
  for v_i in 0..1 loop
    if (v_i = 0) and v_process_new is true then
      v_record = new;
    elsif (v_i = 1) and v_process_old is true then
      v_record = old;
    else
      continue;
    end if;
     if v_attribute is not null then
      execute 'select $1.' || quote_ident(v_attribute)
        using v_record
        into v_sub;
    end if;
    if v_sub is not null then
      v_topic = replace(v_topic_template, '$1', v_sub);
    else
      v_topic = v_topic_template;
    end if;
    if v_topic is distinct from v_last_topic then
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic;
      perform pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', v_sub,
        'id', v_record.id
      )::text);
    end if;
  end loop;
  return v_record;
end;
$$ language plpgsql volatile;
comment on function publ.tg__graphql_subscription() is
  E'This function enables the creation of simple focussed GraphQL subscriptions using database triggers. Read more here: https://www.graphile.org/postgraphile/subscriptions/#custom-subscriptions';

CREATE OR REPLACE FUNCTION public.to_slug(text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN  
  slug := lower($1);
  slug := translate(unaccent(slug), ' ', '-');
  slug := translate(slug, '.', '-');
  slug := translate(slug, '_', '-');
  slug := translate(slug, '/', '-');
  slug := translate(slug, '&', 'and');
  slug := translate(slug, '''', '');
  slug := translate(slug, '"', '');
  slug := translate(slug, '’', '');
  slug := regexp_replace(slug, E'[\U0001F600-\U0001F64F]', '', 'g'); -- Supprime les smileys Unicode
  slug := regexp_replace(slug, E'[\U0001F300-\U0001F5FF]', '', 'g'); -- Supprime les emojis Unicode
  slug := regexp_replace(slug, E'[\U0001F1E0-\U0001F1FF]', '', 'g'); -- Supprime les drapeaux Unicode
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION publ.generate_slug() RETURNS TRIGGER AS $$
BEGIN
  NEW.slug := to_slug(NEW.name);

  -- Check if the slug already exists in the table
  -- If it does, add a random 4 digit suffix
  -- and check again until a unique slug is found
  WHILE EXISTS (SELECT 1 FROM publ.organizations WHERE slug = NEW.slug) LOOP
    NEW.slug := NEW.slug || ('-' || (random() * 10000)::integer)::text;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--! split: 00100-sessions.sql
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

--! split: 00101-token_and_session-functions.sql
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

--! split: 00200-users.sql
/*
  TABLE: publ.users
  DESCRIPTION: Users of the app
*/
drop table if exists publ.users cascade;
create table publ.users (
    id uuid not null default uuid_generate_v4() primary key unique, 
    username citext not null unique default uuid_generate_v4(),
    firstname text not null,
    lastname text not null,
    avatar_url text check(avatar_url ~ '^https?://[^/]+'),
    is_admin boolean not null default false,
    is_volunteer boolean not null default false,
    phone_number text,   
    email citext not null check (email ~ '[^@]+@[^@]+\.[^@]+'),
    is_verified boolean not null default false,
    is_onboarded boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.users(created_at);
  create index on publ.users(updated_at);
  create index on publ.users(username);
  create index on publ.users(email);
  create index on publ.users(is_volunteer);
  create index on publ.users(lastname);

-- RBAC
  grant select on publ.users to :DATABASE_VISITOR; 
  grant update (firstname, lastname, avatar_url, is_volunteer, username, phone_number, is_onboarded) on publ.users to :DATABASE_VISITOR;
  grant delete on publ.users to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.users
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.users enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.users
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.users
*/


  /*
 * The users table stores (unsurprisingly) the users of our application. You'll
 * notice that it does NOT contain private information such as the user's
 * password or their email address; that's because the users table is seen as
 * public - anyone who can "see" the user can see this information.
 *
 * The author sees `is_admin` and `is_verified` as public information; if you
 * disagree then you should relocate these attributes to another table, such as
 * `user_secrets`.
 */
/* create table publ.users (
  id uuid primary key default gen_random_uuid(),
  username citext not null unique check(length(username) >= 2 and length(username) <= 24 and username ~ '^[a-zA-Z]([_]?[a-zA-Z0-9])+$'),
  name text,
  avatar_url text check(avatar_url ~ '^https?://[^/]+'),
  is_admin boolean not null default false,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table publ.users enable row level security;
 */
-- We couldn't implement this relationship on the sessions table until the users table existed!
alter table priv.sessions
  add constraint sessions_user_id_fkey
  foreign key ("user_id") references publ.users on delete cascade;

-- Users are publicly visible, like on GitHub, Twitter, Facebook, Trello, etc.
create policy select_all on publ.users for select using (true);
-- You can only update yourself.
create policy update_self on publ.users for update using (id = publ.current_user_id());
grant select on publ.users to :DATABASE_VISITOR;
-- NOTE: `insert` is not granted, because we'll handle that separately
grant update(username, firstname, lastname, avatar_url) on publ.users to :DATABASE_VISITOR;
-- NOTE: `delete` is not granted, because we require confirmation via request_account_deletion/confirm_account_deletion

comment on table publ.users is
  E'A user who can log in to the application.';

comment on column publ.users.id is
  E'Unique identifier for the user.';
comment on column publ.users.username is
  E'Public-facing username (or ''handle'') of the user.';
comment on column publ.users.avatar_url is
  E'Optional avatar URL.';
comment on column publ.users.is_admin is
  E'If true, the user has elevated privileges.';

/**********/

-- Returns the current user; this is a "custom query" function; see:
-- https://www.graphile.org/postgraphile/custom-queries/
-- So this will be queryable via GraphQL as `{ currentUser { ... } }`
create function publ.current_user() returns publ.users as $$
  select users.* from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user (or null if not logged in).';

/**********/

-- The users table contains all the public information, but we need somewhere
-- to store private information. In fact, this data is so private that we don't
-- want the user themselves to be able to see it - things like the bcrypted
-- password hash, timestamps of recent login attempts (to allow us to
-- auto-protect user accounts that are under attack), etc.
create table priv.user_secrets (
  user_id uuid not null primary key references publ.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz,
  verification_token text,
  verification_email_sent_at timestamptz,
  password_reset_email_sent_at timestamptz
);
alter table priv.user_secrets enable row level security;
comment on table priv.user_secrets is
  E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';





/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function priv.tg_user_secrets__insert_with_user() returns trigger as $$
declare
  v_verification_token text;
begin  
  if NEW.is_verified is false then
    v_verification_token = encode(gen_random_bytes(7), 'hex');
  end if;

  insert into priv.user_secrets(user_id, verification_token) values(NEW.id, v_verification_token);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
create trigger _500_insert_secrets
  after insert on publ.users
  for each row
  execute procedure priv.tg_user_secrets__insert_with_user();
comment on function priv.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

create trigger _900_send_verification_email
  after insert on publ.users
  for each row
  when (NEW.is_verified is false)
  execute procedure
   priv.tg__add_job('users__send_verification_email');

/*
 * Because you can register with username/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
create function publ.users_has_password(u publ.users) returns boolean as $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

/*
 * When the user validates their email address we want the UI to be notified
 * immediately, so we'll issue a notification to the `graphql:user:*` topic
 * which GraphQL users can subscribe to via the `currentUserUpdated`
 * subscription field.
 */
create trigger _500_gql_update
  after update on publ.users
  for each row
  execute procedure publ.tg__graphql_subscription(
    'userChanged', -- the "event" string, useful for the client to know what happened
    'graphql:user:$1', -- the "topic" the event will be published to, as a template
    'id' -- If specified, `$1` above will be replaced with NEW.id or OLD.id from the trigger.
  );

--! split: 00210-auth.sql
-- drop type if exists publ.jwt;
-- create type publ.jwt as (
--     sub uuid,
--     exp bigint
-- );


--  drop function if exists publ.current_user_id cascade;
-- create function publ.current_user_id() returns uuid as $$
--     select nullif(current_setting('jwt.claims.sub', true), '')::uuid;
-- $$ language sql stable;
-- comment on function publ.current_user_id() is
--   E'Handy method to get the current user ID.';
--   grant execute on function publ.current_user_id to :DATABASE_VISITOR;

--   create function publ.current_user() returns publ.users as $$
--   select users.* from publ.users where id = publ.current_user_id();
-- $$ language sql stable;
-- comment on function publ.current_user() is
--   E'The currently logged in user (or null if not logged in).';


-- drop function if exists publ.register cascade;
-- create function publ.register(
--     email citext, 
--     firstname text,
--     lastname text,
--     password text,
--     avatar_url text default null
-- ) returns publ.jwt as $$
-- declare
--     v_user_id uuid;
-- begin
--     insert into publ.users (email, firstname, lastname, avatar_url) values (email, firstname, lastname, avatar_url) returning id into v_user_id;
--     insert into priv.user_secrets as us (user_id, password_hash) values (v_user_id, crypt(password, gen_salt('bf')))
--     on conflict (user_id) do update set password_hash = excluded.password_hash;
--     return (v_user_id, extract(epoch from (now() + interval '2 days')))::publ.jwt;

-- end;
-- $$ language plpgsql volatile security definer;
-- grant execute on function publ.register to :DATABASE_VISITOR;

-- drop function if exists publ.login cascade;
-- create function publ.login(email citext, password text) returns publ.jwt as $$  
-- declare
--     user_id uuid;
--     password_hash text;
-- begin
--     select id, password_hash into user_id, password_hash from publ.users join priv.user_secrets on users.id = user_secrets.user_id where email = email;
--     if crypt(password, password_hash) = password_hash then
--         return (user_id, extract(epoch from (now() + interval '20 days')))::publ.jwt;
--     else
--         raise exception 'invalid password';
--     end if;
-- end;
-- $$ language plpgsql volatile security definer;
-- grant execute on function publ.login to :DATABASE_VISITOR;



-- /*
--  * Because you can register with username/password or using OAuth (social
--  * login), we need a way to tell the user whether or not they have a
--  * password. This is to help the UI display the right interface: change
--  * password or set password.
--  */
-- create function publ.users_has_password(u publ.users) returns boolean as $$
--   select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
-- $$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

--! split: 00211-user_emails.sql
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

--! split: 00220-user_authentications.sql
/*
 * In addition to logging in with username/email and password, users may use
 * other authentication methods, such as "social login" (OAuth) with GitHub,
 * Twitter, Facebook, etc. We store details of these logins to the
 * user_authentications and user_authentication_secrets tables.
 *
 * The user is allowed to delete entries in this table (which will unlink them
 * from that service), but adding records to the table requires elevated
 * privileges (it's managed by the `installPassportStrategy.ts` middleware,
 * which calls out to the `priv.link_or_register_user` database
 * function).
 */
create table publ.user_authentications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references publ.users on delete cascade,
  service text not null,
  identifier text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uniq_user_authentications unique(service, identifier)
);

alter table publ.user_authentications enable row level security;

-- Make it efficient to find all the authentications for a particular user.
create index on publ.user_authentications(user_id);

-- Keep created_at and updated_at up to date.
create trigger _100_timestamps
  before insert or update on publ.user_authentications
  for each row
  execute procedure priv.tg__timestamps();

comment on table publ.user_authentications is
  E'Contains information about the login providers this user has used, so that they may disconnect them should they wish.';
comment on column publ.user_authentications.service is
  E'The login service used, e.g. `twitter` or `github`.';
comment on column publ.user_authentications.identifier is
  E'A unique identifier for the user within the login service.';
comment on column publ.user_authentications.details is
  E'Additional profile details extracted from this login method';

-- Users may view and delete their social logins.
create policy select_own on publ.user_authentications for select using (user_id = publ.current_user_id());
create policy delete_own on publ.user_authentications for delete using (user_id = publ.current_user_id());
-- TODO: on delete, check this isn't the last one, or that they have a verified
-- email address or password. For now we're not worrying about that since all
-- the OAuth providers we use verify the email address.

-- Notify the user if a social login is removed.
create trigger _500_audit_removed
  after delete on publ.user_authentications
  for each row
  execute procedure priv.tg__add_audit_job(
    'unlinked_account',
    'user_id',
    'service',
    'identifier'
  );
-- NOTE: we don't need to notify when a linked account is added here because
-- that's handled in the link_or_register_user function.

grant select on publ.user_authentications to :DATABASE_VISITOR;
grant delete on publ.user_authentications to :DATABASE_VISITOR;

/**********/

-- This table contains secret information for each user_authentication; could
-- be things like access tokens, refresh tokens, profile information. Whatever
-- the passport strategy deems necessary.
create table priv.user_authentication_secrets (
  user_authentication_id uuid not null primary key references publ.user_authentications on delete cascade,
  details jsonb not null default '{}'::jsonb
);
alter table priv.user_authentication_secrets enable row level security;

-- NOTE: user_authentication_secrets doesn't need an auto-inserter as we handle
-- that everywhere that can create a user_authentication row.

--! split: 00230-login.sql
/*
 * This function handles logging in a user with their username (or email
 * address) and password.
 *
 * Note that it is not in publ; this function is intended to be called
 * with elevated privileges (namely from `PassportLoginPlugin.ts`). The reason
 * for this is because we want to be able to track failed login attempts (to
 * help protect user accounts). If this were callable by a user, they could
 * roll back the transaction when a login fails and no failed attempts would be
 * logged, effectively giving them infinite retries. We want to disallow this,
 * so we only let code call into `login` that we trust to not roll back the
 * transaction afterwards.
 */
create function priv.login(username citext, password text) returns priv.sessions as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
  v_login_attempt_window_duration interval = interval '5 minutes';
  v_session priv.sessions;
begin
  if username like '%@%' then
    -- It's an email
    select users.* into v_user
    from publ.users
    where email = login.username
    limit 1;
  else
    -- It's a username
    select users.* into v_user
    from publ.users
    where users.username = login.username;
  end if;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many login attempts?
    if (
      v_user_secret.first_failed_password_attempt is not null
    and
      v_user_secret.first_failed_password_attempt > NOW() - v_login_attempt_window_duration
    and
      v_user_secret.failed_password_attempts >= 3
    ) then
      raise exception 'User account locked - too many login attempts. Try again after 5 minutes.' using errcode = 'LOCKD';
    end if;

    -- Not too many login attempts, let's check the password.
    -- NOTE: `password_hash` could be null, this is fine since `NULL = NULL` is null, and null is falsy.
    if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
      -- Excellent - they're logged in! Let's reset the attempt tracking
      update priv.user_secrets
      set failed_password_attempts = 0, first_failed_password_attempt = null, last_login_at = now()
      where user_id = v_user.id;
      -- Create a session for the user
      insert into priv.sessions (user_id) values (v_user.id) returning * into v_session;
      -- And finally return the session
      return v_session;
    else
      -- Wrong password, bump all the attempt tracking figures
      update priv.user_secrets
      set
        failed_password_attempts = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then 1 else failed_password_attempts + 1 end),
        first_failed_password_attempt = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then now() else first_failed_password_attempt end)
      where user_id = v_user.id;
      return null; -- Must not throw otherwise transaction will be aborted and attempts won't be recorded
    end if;
  else
    -- No user with that email/username was found
    return null;
  end if;
end;
$$ language plpgsql strict volatile;

comment on function priv.login(username citext, password text) is
  E'Returns a user that matches the username/password combo, or null on failure.';

--! split: 00240-logout.sql
/*
 * Logging out deletes the session, and clears the session_id in the
 * transaction. This is a `SECURITY DEFINER` function, so we check that the
 * user is allowed to do it by matching the current_session_id().
 */
create function publ.logout() returns void as $$
begin
  -- Delete the session
  delete from priv.sessions where uuid = publ.current_session_id();
  -- Clear the identifier from the transaction
  perform set_config('jwt.claims.session_id', '', true);
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;

--! split: 00250-forgot_password.sql
/*
 * When a user forgets their password we want to let them set a new one; but we
 * need to be very careful with this. We don't want to reveal whether or not an
 * account exists by the email address, so we email the entered email address
 * whether or not it's registered. If it's not registered, we track these
 * attempts in `unregistered_email_password_resets` to ensure that we don't
 * allow spamming the address; otherwise we store it to `user_secrets`.
 *
 * `publ.forgot_password` is responsible for checking these things and
 * queueing a reset password token to be emailed to the user. For what happens
 * after the user receives this email, see instead `priv.reset_password`.
 *
 * NOTE: unlike priv.login and priv.reset_password, rolling back
 * the results of this function will not cause any security issues so we do not
 * need to call it indirectly as we do for those other functions. (Rolling back
 * will undo the tracking of when we sent the email but it will also prevent
 * the email being sent, so it's harmless.)
 */

create table priv.unregistered_email_password_resets (
  email citext constraint unregistered_email_pkey primary key,
  attempts int not null default 1,
  latest_attempt timestamptz not null
);
comment on table priv.unregistered_email_password_resets is
  E'If someone tries to recover the password for an email that is not registered in our system, this table enables us to rate-limit outgoing emails to avoid spamming.';
comment on column priv.unregistered_email_password_resets.attempts is
  E'We store the number of attempts to help us detect accounts being attacked.';
comment on column priv.unregistered_email_password_resets.latest_attempt is
  E'We store the time the last password reset was sent to this email to prevent the email getting flooded.';

/**********/

create function publ.forgot_password(email citext) returns void as $$
declare
  v_user publ.users;
  v_token text;
  v_token_min_duration_between_emails interval = interval '3 minutes';
  v_token_max_duration interval = interval '3 days';
  v_now timestamptz = clock_timestamp(); -- Function can be called multiple during transaction
  v_latest_attempt timestamptz;
begin
  -- Find the matching user:
  select users.* into v_user
  from publ.users
  where users.email = forgot_password.email
  order by is_verified desc, id desc;

  -- If there is no match:
  if v_user is null then
    -- This email doesn't exist in the system; trigger an email stating as much.

    -- We do not allow this email to be triggered more than once every 15
    -- minutes, so we need to track it:
    insert into priv.unregistered_email_password_resets (email, latest_attempt)
      values (forgot_password.email, v_now)
      on conflict on constraint unregistered_email_pkey
      do update
        set latest_attempt = v_now, attempts = unregistered_email_password_resets.attempts + 1
        where unregistered_email_password_resets.latest_attempt < v_now - interval '15 minutes'
      returning latest_attempt into v_latest_attempt;

    if v_latest_attempt = v_now then
      perform graphile_worker.add_job(
        'user__forgot_password_unregistered_email',
        json_build_object('email', forgot_password.email::text)
      );
    end if;

    -- TODO: we should clear out the unregistered_email_password_resets table periodically.

    return;
  end if;

  -- There was a match.
  -- See if we've triggered a reset recently:
  if exists(
    select 1
    from priv.user_secrets
    where user_id = v_user.id
    and password_reset_email_sent_at is not null
    and password_reset_email_sent_at > v_now - v_token_min_duration_between_emails
  ) then
    -- If so, take no action.
    return;
  end if;

  -- Fetch or generate reset token:
  update priv.user_secrets
  set
    reset_password_token = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else reset_password_token
      end
    ),
    reset_password_token_generated = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then v_now
      else reset_password_token_generated
      end
    )
  where user_id = v_user.user_id
  returning reset_password_token into v_token;

  -- Don't allow spamming an email:
  update priv.user_secrets
  set password_reset_email_sent_at = v_now
  where user_id = v_user.id;

  -- Trigger email send:
  perform graphile_worker.add_job(
    'user__forgot_password',
    json_build_object('id', v_user.id, 'email', v_user.email::text, 'token', v_token)
  );

end;
$$ language plpgsql strict security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function publ.forgot_password(email public.citext) is
  E'If you''ve forgotten your password, give us one of your email addresses and we''ll send you a reset token. Note this only works if you have added an email address!';

--! split: 00260-reset_password.sql
/*
 * This is the second half of resetting a users password, please see
 * `publ.forgot_password` for the first half.
 *
 * The `priv.reset_password` function checks the reset token is correct
 * and sets the user's password to be the newly provided password, assuming
 * `assert_valid_password` is happy with it. If the attempt fails, this is
 * logged to avoid a brute force attack. Since we cannot risk this tracking
 * being lost (e.g. by a later error rolling back the transaction), we put this
 * function into priv and explicitly call it from the `resetPassword`
 * field in `PassportLoginPlugin.ts`.
 */

create function priv.assert_valid_password(new_password text) returns void as $$
begin
  -- TODO: add better assertions!
  if length(new_password) < 8 then
    raise exception 'Password is too weak' using errcode = 'WEAKP';
  end if;
end;
$$ language plpgsql volatile;

create function priv.reset_password(user_id uuid, reset_token text, new_password text) returns boolean as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  select users.* into v_user
  from publ.users
  where id = user_id;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many reset attempts?
    if (
      v_user_secret.first_failed_reset_password_attempt is not null
    and
      v_user_secret.first_failed_reset_password_attempt > NOW() - v_token_max_duration
    and
      v_user_secret.failed_reset_password_attempts >= 20
    ) then
      raise exception 'Password reset locked - too many reset attempts' using errcode = 'LOCKD';
    end if;

    -- Not too many reset attempts, let's check the token
    if v_user_secret.reset_password_token = reset_token then
      -- Excellent - they're legit

      perform priv.assert_valid_password(new_password);

      -- Let's reset the password as requested
      update priv.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf')),
        failed_password_attempts = 0,
        first_failed_password_attempt = null,
        reset_password_token = null,
        reset_password_token_generated = null,
        failed_reset_password_attempts = 0,
        first_failed_reset_password_attempt = null
      where user_secrets.user_id = v_user.id;

      -- Revoke the users' sessions
      delete from priv.sessions
      where sessions.user_id = v_user.id;

      -- Notify user their password was reset
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'reset_password',
          'user_id', v_user.id,
          'current_user_id', publ.current_user_id()
        ));

      return true;
    else
      -- Wrong token, bump all the attempt tracking figures
      update priv.user_secrets
      set
        failed_reset_password_attempts = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then 1 else failed_reset_password_attempts + 1 end),
        first_failed_reset_password_attempt = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then now() else first_failed_reset_password_attempt end)
      where user_secrets.user_id = v_user.id;
      return null;
    end if;
  else
    -- No user with that id was found
    return null;
  end if;
end;
$$ language plpgsql strict volatile;

--! split: 00270-request_account_deletion.sql
/*
 * For security reasons we don't want to allow a user to just delete their user
 * account without confirmation; so we have them request deletion, receive an
 * email, and then click the link in the email and press a button to confirm
 * deletion. This function handles the first step in this process; see
 * `publ.confirm_account_deletion` for the second half.
 */

create function publ.request_account_deletion() returns boolean as $$
declare
  v_user publ.users;
  v_token text;
  v_token_max_duration interval = interval '3 days';
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  -- Get the email to send account deletion token to
  select * into v_user
    from publ.users
    where id = publ.current_user_id()
    order by is_verified desc, id desc
    limit 1;

  -- Fetch or generate token
  update priv.user_secrets
  set
    delete_account_token = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else delete_account_token
      end
    ),
    delete_account_token_generated = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then now()
      else delete_account_token_generated
      end
    )
  where user_id = publ.current_user_id()
  returning delete_account_token into v_token;

  -- Trigger email send
  perform graphile_worker.add_job('user__send_delete_account_email', json_build_object('email', v_user.email::text, 'token', v_token));
  return true;
end;
$$ language plpgsql strict security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function publ.request_account_deletion() is
  E'Begin the account deletion flow by requesting the confirmation email';

--! split: 00280-confirm_account_deletion.sql
/*
 * This is the second half of the account deletion process, for the first half
 * see `publ.request_account_deletion`.
 */
create function publ.confirm_account_deletion(token text) returns boolean as $$
declare
  v_user_secret priv.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  select * into v_user_secret
    from priv.user_secrets
    where user_secrets.user_id = publ.current_user_id();

  if v_user_secret is null then
    -- Success: they're already deleted
    return true;
  end if;

  -- Check the token
  if (
    -- token is still valid
    v_user_secret.delete_account_token_generated > now() - v_token_max_duration
  and
    -- token matches
    v_user_secret.delete_account_token = token
  ) then
    -- Token passes; delete their account :(
    delete from publ.users where id = publ.current_user_id();
    return true;
  end if;

  raise exception 'The supplied token was incorrect - perhaps you''re logged in to the wrong account, or the token has expired?' using errcode = 'DNIED';
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function publ.confirm_account_deletion(token text) is
  E'If you''re certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion.';

--! split: 00285-change_password.sql
/*
 * To change your password you must specify your previous password. The form in
 * the web UI may confirm that the new password was typed correctly by making
 * the user type it twice, but that isn't necessary in the API.
 */

create function publ.change_password(old_password text, new_password text) returns boolean as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
begin
  select users.* into v_user
  from publ.users
  where id = publ.current_user_id();

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    if v_user_secret.password_hash = crypt(old_password, v_user_secret.password_hash) then
      perform priv.assert_valid_password(new_password);

      -- Reset the password as requested
      update priv.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf'))
      where user_secrets.user_id = v_user.id;

      -- Revoke all other sessions
      delete from priv.sessions
      where sessions.user_id = v_user.id
      and sessions.uuid <> publ.current_session_id();

      -- Notify user their password was changed
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'change_password',
          'user_id', v_user.id,
          'current_user_id', publ.current_user_id()
        ));

      return true;
    else
      raise exception 'Incorrect password' using errcode = 'CREDS';
    end if;
  else
    raise exception 'You must log in to change your password' using errcode = 'LOGIN';
  end if;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function publ.change_password(old_password text, new_password text) is
  E'Enter your old password and a new password to change your password.';

grant execute on function publ.change_password(text, text) to :DATABASE_VISITOR;

--! split: 00400-user-registration.sql
/*
 * A user account may be created explicitly via the GraphQL `register` mutation
 * (which calls `really_create_user` below), or via OAuth (which, via
 * `installPassportStrategy.ts`, calls link_or_register_user below, which may
 * then call really_create_user). Ultimately `really_create_user` is called in
 * all cases to create a user account within our system, so it must do
 * everything we'd expect in this case including validating username/password,
 * setting the password (if any), storing the email address, etc.
 */

create function priv.really_create_user(
  username citext,
  email text,
  email_is_verified bool,
  firstname text,
  lastname text,
  avatar_url text,
  password text default null
) returns publ.users as $$
declare
  v_user publ.users;
  v_username citext = username;
begin
  if password is not null then
    perform priv.assert_valid_password(password);
  end if;
  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  -- Insert the new user
  insert into publ.users (username, firstname, lastname, avatar_url, email, is_verified) values
    (v_username, firstname, lastname, avatar_url, email, email_is_verified)
    returning * into v_user;

  -- Store the password
  if password is not null then
    update priv.user_secrets
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from publ.users where id = v_user.id;

  return v_user;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function priv.really_create_user(username citext, email text, email_is_verified bool, firstname text, lastname text, avatar_url text, password text) is
  E'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';

/**********/

/*
 * The `register_user` function is called by `link_or_register_user` when there
 * is no matching user to link the login to, so we want to register the user
 * using OAuth or similar credentials.
 */

create function priv.register_user(
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json,
  f_email_is_verified boolean default false
) returns publ.users as $$
declare
  v_user publ.users;
  v_email citext;
  v_firstname text;
  v_lastname text;
  v_username citext;
  v_avatar_url text;
  v_user_authentication_id uuid;
begin
  -- Extract data from the user’s OAuth profile data.
  v_email := f_profile ->> 'email';
  v_firstname := f_profile ->> 'firstname';
  v_lastname := f_profile ->> 'lastname';
  v_username := f_profile ->> 'username';
  v_avatar_url := f_profile ->> 'avatar_url';

  -- Sanitise the username, and make it unique if necessary.
  if v_username is null then
    v_username = coalesce(v_firstname, 'user');
  end if;
  v_username = regexp_replace(v_username, '^[^a-z]+', '', 'gi');
  v_username = regexp_replace(v_username, '[^a-z0-9]+', '_', 'gi');
  if v_username is null or length(v_username) < 3 then
    v_username = 'user';
  end if;
  select (
    case
    when i = 0 then v_username
    else v_username || i::text
    end
  ) into v_username from generate_series(0, 1000) i
  where not exists(
    select 1
    from publ.users
    where users.username = (
      case
      when i = 0 then v_username
      else v_username || i::text
      end
    )
  )
  limit 1;

  -- Create the user account
  v_user = priv.really_create_user(
    username => v_username,
    email => v_email,
    email_is_verified => f_email_is_verified,
    firstname => v_firstname,
    lastname => v_lastname,
    avatar_url => v_avatar_url
  );

  -- Insert the user’s private account data (e.g. OAuth tokens)
  insert into publ.user_authentications (user_id, service, identifier, details) values
    (v_user.id, f_service, f_identifier, f_profile) returning id into v_user_authentication_id;
  insert into priv.user_authentication_secrets (user_authentication_id, details) values
    (v_user_authentication_id, f_auth_details);

  return v_user;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) is
  E'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';

/**********/

/*
 * The `link_or_register_user` function is called from
 * `installPassportStrategy.ts` when a user logs in with a social login
 * provider (OAuth), e.g. GitHub, Facebook, etc. If the user is already logged
 * in then the new provider will be linked to the users account, otherwise we
 * will try to retrieve an existing account using these details (matching the
 * service/identifier or the email address), and failing that we will register
 * a new user account linked to this service via the `register_user` function.
 *
 * This function is also responsible for keeping details in sync with the login
 * provider whenever the user logs in; you'll see this in the `update`
 * statemets towards the bottom of the function.
 */

create function priv.link_or_register_user(
  f_user_id uuid,
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json
) returns publ.users as $$
declare
  v_matched_user_id uuid;
  v_matched_authentication_id uuid;
  v_email citext;
  v_firstname text;
  v_lastname text;
  v_avatar_url text;
  v_user publ.users;
begin
  -- See if a user account already matches these details
  select id, user_id
    into v_matched_authentication_id, v_matched_user_id
    from publ.user_authentications
    where service = f_service
    and identifier = f_identifier
    limit 1;

  if v_matched_user_id is not null and f_user_id is not null and v_matched_user_id <> f_user_id then
    raise exception 'A different user already has this account linked.' using errcode = 'TAKEN';
  end if;

  v_email = f_profile ->> 'email';
  v_firstname := f_profile ->> 'firstname';
  v_lastname := f_profile ->> 'lastname';
  v_avatar_url := f_profile ->> 'avatar_url';

  if v_matched_authentication_id is null then
    if f_user_id is not null then
      -- Link new account to logged in user account
      insert into publ.user_authentications (user_id, service, identifier, details) values
        (f_user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
      insert into priv.user_authentication_secrets (user_authentication_id, details) values
        (v_matched_authentication_id, f_auth_details);
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'linked_account',
          'user_id', f_user_id,
          'extra1', f_service,
          'extra2', f_identifier,
          'current_user_id', publ.current_user_id()
        ));
    elsif v_email is not null then
      -- See if the email is registered
      select * into v_user from publ.users where email = v_email and is_verified is true;
      if v_user is not null then
        -- User exists!
        insert into publ.user_authentications (user_id, service, identifier, details) values
          (v_user.id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
        insert into priv.user_authentication_secrets (user_authentication_id, details) values
          (v_matched_authentication_id, f_auth_details);
        perform graphile_worker.add_job(
          'user__audit',
          json_build_object(
            'type', 'linked_account',
            'user_id', f_user_id,
            'extra1', f_service,
            'extra2', f_identifier,
            'current_user_id', publ.current_user_id()
          ));
      end if;
    end if;
  end if;
  if v_matched_user_id is null and f_user_id is null and v_matched_authentication_id is null then
    -- Create and return a new user account
    return priv.register_user(f_service, f_identifier, f_profile, f_auth_details, true);
  else
    if v_matched_authentication_id is not null then
      update publ.user_authentications
        set details = f_profile
        where id = v_matched_authentication_id;
      update priv.user_authentication_secrets
        set details = f_auth_details
        where user_authentication_id = v_matched_authentication_id;
      update publ.users
        set
          firstname = coalesce(users.firstname, v_firstname),
          lastname = coalesce(users.lastname, v_lastname),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        where id = v_matched_user_id
        returning  * into v_user;
      return v_user;
    else
      -- v_matched_authentication_id is null
      -- -> v_matched_user_id is null (they're paired)
      -- -> f_user_id is not null (because the if clause above)
      -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
      -- -> contradiction.
      raise exception 'This should not occur';
    end if;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) is
  E'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';

--! split: 00420-resend_email_verification_code.sql
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

--! split: 00500-organisations.sql
/*
  TABLE: publ.organizations
  DESCRIPTION: An organisation is a group of people who work together on projects.
*/
drop table if exists publ.organizations cascade;
create table publ.organizations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text unique not null,
    slug text unique,
    description text,
    logo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.organizations(created_at);
  create index on publ.organizations(updated_at);
  create index on publ.organizations(name);
  create index on publ.organizations(slug);
  create index on publ.organizations(description);

-- RBAC
  grant select on publ.organizations to :DATABASE_VISITOR;
    grant insert(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;
    grant update(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organizations
  for each row
  execute procedure priv.tg__timestamps();
  


CREATE TRIGGER generate_slug_trigger
BEFORE INSERT OR UPDATE ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();

-- RLS
  alter table publ.organizations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organizations
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organizations
*/

--! split: 00505-users_organisations.sql
drop table if exists publ.organization_memberships_roles_enum cascade;
create table publ.organization_memberships_roles_enum (
    type text primary key,
    description text
);
comment on table publ.organization_memberships_roles_enum is E'@enum';

insert into publ.organization_memberships_roles_enum values
    ('OWNER', 'Owner of the organization'),
    ('ADMIN', 'Admin of the organization'),
    ('HOST', 'Host of the organization''s events'),
    ('GUEST', 'Guest of the organization');

GRANT all ON "publ"."organization_memberships_roles_enum" TO :DATABASE_VISITOR;


/*
  TABLE: publ.organization_memberships
  DESCRIPTION: Appartenance des utilisateurs aux organisations
*/
drop table if exists publ.organization_memberships cascade;
create table publ.organization_memberships (
    id uuid not null default uuid_generate_v4() primary key unique, 
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    user_id uuid not null references publ.users(id) on delete cascade,
    role text not null default 'GUEST' references publ.organization_memberships_roles_enum(type) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, user_id)
);

-- indexes
  create index on publ.organization_memberships(created_at);
  create index on publ.organization_memberships(updated_at);
    create index on publ.organization_memberships(organization_id);
    create index on publ.organization_memberships(user_id);
    create index on publ.organization_memberships(role);

-- RBAC
  grant select on publ.organization_memberships to :DATABASE_VISITOR;
  grant insert (organization_id, user_id, role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant update ( role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant delete on publ.organization_memberships to :DATABASE_VISITOR;


-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organization_memberships
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.organization_memberships enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organization_memberships
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organization_memberships
*/



select priv.really_create_user('Michou', 'm.dupond@gmoul.com', true, 'Michel', 'Dupond', 'https://randomuser.me/api/portraits/men/1.jpg', 'password');
select priv.really_create_user('Louis', 'l.martin@gmoul.com', false, 'Louis', 'Martin', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('Louise', 'l.dupuis@gmoul.com', true, 'Louise', 'Dupuis', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('bele', 'b.ele@gmoul.com', true, 'Eléonore', 'Beauregard', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('cam', 'm.cam@gmoul.com', true, 'Camille', 'Monfort', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');
select priv.really_create_user('admin', 'admin@localhost.com', true, 'Super', 'Admin', 'https://randomuser.me/api/portraits/men/2.jpg', 'password');

update publ.users set is_admin = true where username = 'Michou';

drop function if exists publ.users_organizations cascade;
create function publ.users_organizations(any_user publ.users) returns table(organization publ.organizations, role text) as $$
  --select o.*, om.role from publ.organization_memberships om join publ.organizations o on o.id = om.organization_id where om.user_id = any_user.id
  -- si user.is_admin, recupère toutes les organizations sinon juste ses memberships
  begin
  if any_user.is_admin then
    return query select o as organization, 'ADMIN' as role from publ.organizations o;
  else
    return query select o as organization, om.role as role from publ.organization_memberships om join publ.organizations o on o.id = om.organization_id where om.user_id = any_user.id;
  end if;
  end;
$$ language plpgsql stable security definer;
grant execute on function publ.users_organizations to :DATABASE_VISITOR;



drop function if exists publ.change_membership_role cascade;
create function publ.change_membership_role(membership_id uuid, role text) returns publ.organization_memberships as $$
declare
  membership publ.organization_memberships;
begin
  -- check permission: current user must be either admin or owner of the given org
  if not exists (select 1 from publ.organization_memberships om join publ.organizations o on o.id = om.organization_id where om.user_id = publ.current_user_id() and (om.role in ('OWNER', 'ADMIN'))) then
    raise exception 'Not authorized' using errcode='DNIED';
  end if;
  

  select * into membership from publ.organization_memberships where id = membership_id;
  if membership.role = 'OWNER' and role != 'OWNER' then
    raise exception 'Cannot change owner role';
  end if;
  update publ.organization_memberships set role = change_membership_role.role where id = membership_id;
  return membership;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.change_membership_role to :DATABASE_VISITOR;

--! split: 00510-organization_invitations.sql
/*
 * When a user is invited to an organization, a record will be added to this
 * table. Once the invitation is accepted, the record will be deleted. We'll
 * handle the mechanics of invitation later.
 */
create table publ.organization_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references publ.organizations on delete cascade,
  code text,
  user_id uuid references publ.users on delete cascade,
  email citext,
  role text not null default 'GUEST' references publ.organization_memberships_roles_enum on delete cascade,
  check ((user_id is null) <> (email is null)),
  check ((code is null) = (email is null)),
  unique (organization_id, user_id),
  unique (organization_id, email)
);
alter table publ.organization_invitations enable row level security;
 CREATE INDEX ON "publ"."organization_invitations"("role");
create index on publ.organization_invitations(user_id);
create index on publ.organization_invitations(organization_id);


-- We're not granting any privileges here since we don't need any currently.
grant select on publ.organization_invitations to :DATABASE_VISITOR;

drop policy if exists members_can_select_invites on publ.organization_invitations;
create policy members_can_select_invites on publ.organization_invitations for select using (
  exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = organization_id
      and organization_memberships.user_id = publ.current_user_id()
      and organization_memberships.role in ('OWNER','ADMIN')
  )
);

-- Send the user an invitation email to join the organization
create trigger _500_send_email after insert on publ.organization_invitations
  for each row execute procedure priv.tg__add_job('organizationSendInvite');

--! split: 00520-create_organization.sql
/*
 * When a user creates an organization they automatically become the owner and
 * billing contact of that organization.
 */

create function publ.create_organization(name text) returns publ.organizations as $$
declare
  v_org publ.organizations;
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to create an organization' using errcode = 'LOGIN';
  end if;
  insert into publ.organizations ( name) values ( name) returning * into v_org;
  insert into publ.organization_memberships (organization_id, user_id, role)
    values(v_org.id, publ.current_user_id(), 'OWNER');
  return v_org;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;

--! split: 00530-invite_to_organization.sql
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


drop function if exists publ.cancel_invitation cascade;
create function publ.cancel_invitation(invitation_id uuid) returns void as $$

begin
  -- Are we allowed to cancel this invitation
  -- Are we logged in
  if publ.current_user_id() is null then
    raise exception 'You must log in to cancel an invitation' using errcode = 'LOGIN';
  end if;

  -- Are we the owner of this organization
  if not exists(
    select 1 from publ.organization_invitations
      where organization_invitations.id = cancel_invitation.invitation_id
      and organization_invitations.user_id = publ.current_user_id()
  ) then
    raise exception 'You''re not allowed to cancel this invitation' using errcode = 'DNIED';
  end if;

  delete from publ.organization_invitations where organization_invitations.id = cancel_invitation.invitation_id;
end;

$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;
grant execute on function publ.cancel_invitation to :DATABASE_VISITOR;

--! split: 00540-organization-permissions.sql
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

--! split: 00570-organization_for_invitation.sql
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

--! split: 00572-accept_invitation_to_organization.sql
/*
 * This function accepts an invitation to join the organization and adds you to
 * the organization (deleting the invite).  If you were invited by username (or
 * your account could already be determined) you can accept an invitation
 * directly by the invitation_id; otherwise you will need the code as well to
 * prove you are the person that was invited (for example if you were invited
 * using a different email address to that which you created your account
 * with).
 */
create function publ.accept_invitation_to_organization(invitation_id uuid, code text = null)
  returns void as $$
declare
  v_organization publ.organizations;
  v_invitation publ.organization_invitations;
begin
  v_organization = publ.organization_for_invitation(invitation_id, code);
  select * into v_invitation from publ.organization_invitations where id = invitation_id;

  -- Accept the user into the organization
  insert into publ.organization_memberships (organization_id, user_id, role)
    values(v_organization.id, publ.current_user_id(), v_invitation.role)
    on conflict do nothing;

  -- Delete the invitation
  delete from publ.organization_invitations where id = invitation_id;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;

--! split: 00574-remove_from_organization.sql
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

--! split: 00580-organization-computed-columns.sql
/*
 * Shortcut telling the client if the current user is the organization owner
 * without having to manually traverse into organization_memberships.
 */
create function publ.organizations_current_user_is_owner(
  org publ.organizations
) returns boolean as $$
  select exists(
    select 1
    from publ.organization_memberships
    where organization_id = org.id
    and user_id = publ.current_user_id()
    and role = 'OWNER'
  )
$$ language sql stable;

/*
 * Shortcut telling the client if the current user is the organization billing
 * contact without having to manually traverse into organization_memberships.
 */
/* create function publ.organizations_current_user_is_billing_contact(
  org publ.organizations
) returns boolean as $$
  select exists(
    select 1
    from publ.organization_memberships
    where organization_id = org.id
    and user_id = publ.current_user_id()
    and is_billing_contact is true
  )
$$ language sql stable;
 */

--! split: 00600-delete_organization.sql
/*
 * Function to delete an organization; only works if you're the owner.
 */
create function publ.delete_organization(organization_id uuid) returns void as $$
begin
  if exists(
    select 1
    from publ.organization_memberships
    where user_id = publ.current_user_id()
    and organization_memberships.organization_id = delete_organization.organization_id
    and role = 'OWNER'
  ) then
    delete from publ.organizations where id = organization_id;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

--! split: 00630-transfer_organization_ownership.sql
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

--! split: 01000-events.sql
drop table if exists publ.event_status cascade;
create table publ.event_status (
  type text primary key,
  description text
);
grant select on table publ.event_status to :DATABASE_AUTHENTICATOR;
comment on table publ.event_status is E'@enum';

insert into publ.event_status values
  ('PENDING', 'A venir'),
  ('DRAFT', 'Brouillon'),
  ('ONGOING', 'En cours'),
  ('FINISHED', 'Terminé'),
  ('CANCELLED', 'Annulé');

/*
    TABLE: publ.events
    DESCRIPTION:  A event is a group of epics that are related to each other. The event as a whole is a goal that the organization is trying to achieve.
*/
drop table if exists publ.events cascade;
create table publ.events (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    slug text,
    description text not null,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    place_name text,
    address_line_1 text,
    address_line_2 text,
    zip_code text,
    city text,
    country text,
    lat float,
    lon float,
    starts_at timestamptz,
    ends_at timestamptz,
    booking_starts_at timestamptz,
    booking_ends_at timestamptz,
    status text references publ.event_status on delete restrict,
    capacity int,
    is_cancelled boolean not null default false,
    details text,
    webhooks text[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    is_draft boolean not null default true,
    constraint events_organization_id_name_key unique (organization_id, name),
    constraint events_organization_id_slug_key unique (organization_id, slug)
);

-- comments
  comment on column publ.events.status is E'@deprecated use state instead';

-- indexes
    create index on publ.events(organization_id);
    create index on publ.events(created_at);
    create index on publ.events(updated_at);
    create index on publ.events(name);
    create index on publ.events(slug);
    create index on publ.events(city);
    create index on publ.events(starts_at);
    create index on publ.events(ends_at);
    create index on publ.events(booking_starts_at);
    create index on publ.events(booking_ends_at);
    create index on publ.events(capacity);
    create index on publ.events(is_cancelled);
    create index on publ.events(is_draft);


-- RBAC
    grant select on publ.events to :DATABASE_VISITOR;
    grant insert(name, description, organization_id, place_name, is_draft,  address_line_1, address_line_2, zip_code, is_cancelled, city, country, lat, lon, starts_at,ends_at, booking_starts_at, booking_ends_at, capacity, webhooks) on publ.events to :DATABASE_VISITOR;
    grant update(name, description, organization_id, place_name, is_draft,  address_line_1, address_line_2, zip_code, is_cancelled, city, country, lat, lon, starts_at,ends_at, booking_starts_at, booking_ends_at, capacity,webhooks) on publ.events to :DATABASE_VISITOR;
    grant delete on publ.events to :DATABASE_VISITOR;
-- triggers
    create trigger _100_timestamps
    before insert or update on publ.events
    for each row
    execute procedure priv.tg__timestamps();

    create trigger _700_generate_slug_trigger
    before insert or update on publ.events
    for each row
    execute procedure publ.generate_slug();


-- RLS
    alter table publ.events enable row level security;

    create policy no_limit /*TODO: update policy*/
    on publ.events
    for all
    using (true)
    with check(true);

-- fixtures
    -- fixtures go here
    
/*
    END TABLE: publ.events

*/
create or replace function publ.date_trunc_func(unit text, date timestamptz)
RETURNS timestamptz AS $$
  SELECT date_trunc($1, $2) - interval '30 days';
$$ LANGUAGE sql stable security definer;

create or replace function publ.event_by_slug(event_slug text, organization_slug text) returns publ.events as $$
  select proj from publ.events proj
  inner join publ.organizations org on org.id = proj.organization_id
  where proj.slug = event_slug and org.slug = organization_slug
  limit 1;
$$ language sql stable security definer;

grant execute on function publ.event_by_slug(text, text) to :DATABASE_VISITOR;


drop table if exists publ.fonts cascade;
create table publ.fonts (
    type text primary key,
    description text
);
comment on table publ.fonts is E'@enum';

insert into publ.fonts values
    ('roboto', 'Roboto'),
    ('montserrat', 'Montserrat'),
    ('opensans', 'Open Sans');
GRANT all ON "publ"."fonts" TO :DATABASE_VISITOR;

/*
  TABLE: publ.event_brandings
  DESCRIPTION: table regroupant les informations custom de l'event
*/
drop table if exists publ.event_brandings cascade;
create table publ.event_brandings (
  id uuid not null default uuid_generate_v4() primary key unique, 
  event_id uuid not null unique references publ.events(id) on delete cascade,
  font text  references publ.fonts on delete cascade,
  logo text,
  css_variables json,
  rich_text text,
  short_text varchar(32),
  header_mail_name text default 'L''association',
  header_mail_contact text default 'contact@obole.eu',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.event_brandings(id);
  create index on publ.event_brandings(event_id);
  create index on publ.event_brandings(created_at);
  create index on publ.event_brandings(updated_at);
CREATE INDEX ON "publ"."event_brandings"("font");

-- RBAC
    grant select on publ.event_brandings to :DATABASE_VISITOR;
    grant insert( css_variables, font, logo, rich_text, short_text, header_mail_name, header_mail_contact) on publ.event_brandings to :DATABASE_VISITOR;
    grant update( css_variables, font, logo, rich_text, short_text, header_mail_name, header_mail_contact) on publ.event_brandings to :DATABASE_VISITOR;
    --grant ALL  on table publ.event_brandings to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.event_brandings
  for each row
  execute procedure priv.tg__timestamps();




create function priv.event_branding__insert_with_event() returns trigger as $$
begin
  insert into publ.event_brandings(event_id, font, logo, rich_text, short_text) values(NEW.id,'roboto','https://lille.lanuitdubiencommun.com/lib_YZQWsZJIBnpPHhyU/9co78sidc8k6jjf1.png?w=140','##rich text
   goes  here','short text') 
  on conflict do nothing;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_branding
  after insert on publ.events
  for each row
  execute procedure priv.event_branding__insert_with_event();
comment on function priv.event_branding__insert_with_event() is E'Ensures that every create event insert branding value in event_branding';

-- RLS
  alter table publ.event_brandings enable row level security;
  



 create policy no_limit /*TODO: update policy*/
   on publ.event_brandings
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.event_brandings
*/


drop function if exists publ.events_state cascade;
create function publ.events_state(any_event publ.events) returns text as $$
  select  case
    when any_event.is_cancelled then 'CANCELLED'
    when any_event.is_draft then 'DRAFT'
    when any_event.starts_at > now() then 'PENDING'
    when any_event.ends_at < now() then 'FINISHED'
    else 'ONGOING'
  end;
$$ language sql stable;
grant execute on function publ.events_state to :DATABASE_VISITOR;




drop function if exists publ.user_events cascade;
create function publ.user_events() returns setof publ.events as $$
  -- return all events that are linked to my organizations based on publ.organization_memberships and using publ.current_user_id()
  select * from publ.events where organization_id in (select organization_id from publ.organization_memberships where user_id = publ.current_user_id());  

$$ language sql stable;
grant execute on function publ.user_events to :DATABASE_VISITOR;


drop function if exists publ.users_events cascade;
create function publ.users_events(any_user publ.users) returns setof publ.events as $$
  select * from publ.events where organization_id in (select organization_id from publ.organization_memberships where user_id = any_user.id);
$$ language sql stable;
grant execute on function publ.users_events to :DATABASE_VISITOR;

--! split: 02000-registrations.sql
/*
  TABLE: publ.registrations
  DESCRIPTION: la table registration contient les inscriptions d''un evenement
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid  references publ.events(id) on delete cascade,
    hear_about_list text[] default '{"par un mécène", "par une association lauréate", "par le bouche à oreille", "autre", "par Obole, co-organisateur de l''événement", "par la Fondation de France, co-organisateur de l''événement"}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
--test
-- indexes
  create index on publ.registrations(created_at);
  create index on publ.registrations(updated_at);
  create index on publ.registrations(event_id);

-- RBAC
    grant select on publ.registrations to :DATABASE_VISITOR;
    grant insert(event_id) on publ.registrations to :DATABASE_VISITOR;
    grant update(event_id) on publ.registrations to :DATABASE_VISITOR;
    grant delete on publ.registrations to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.registrations
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.registrations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.registrations
   for all
   using (true)
   with check(true);

  /*
  END TABLE: publ.registrations
*/ 
-- fixtures
  -- fixtures go here

--! split: 03000-attendees.sql
drop table if exists publ.attendee_status cascade;
create table publ.attendee_status (
    type text primary key,
    description text
);
comment on table publ.attendee_status is E'@enum';

insert into publ.attendee_status values
    ('IDLE', 'En attente'),
    ('CANCELLED', 'Inscription annulée'),
    ('CONFIRMED', 'Présence confirmée à l''évenement'),
    ('TICKET_SCAN', 'Ticket scanné'),
    ('PANEL_SCAN', 'Panneau scanné');

GRANT all on  publ.attendee_status TO :DATABASE_VISITOR;

/*
  TABLE: publ.attendees
  DESCRIPTION: Participants à l'évenement
*/
drop table if exists publ.attendees cascade;
create table publ.attendees (
    id uuid not null default uuid_generate_v4() primary key unique, 
    civility text not null,
    firstname text not null,
    lastname text not null,
    email citext ,
    registration_id uuid references publ.registrations(id) on delete cascade,
    is_fundraising_generosity_ok boolean default false,
    status text not null default 'IDLE' references publ.attendee_status on delete cascade,
    notes text,
    is_inscriptor boolean default false,
    is_vip boolean default false,
    is_news_event_email boolean default false,
    is_news_fondation_email boolean default false,
    panel_number int,
    ticket_number text unique not null default uuid_generate_v4(),
    is_email_sent boolean default false,
    qr_code_url text,
    pdf_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendees(created_at);
  create index on publ.attendees(updated_at);
  create index on publ.attendees(status);
  create index on publ.attendees(email);
  create index on publ.attendees(lastname);
  create index on publ.attendees(civility);
  create index on publ.attendees(registration_id);
  create index on publ.attendees(is_inscriptor);
  create index on publ.attendees(firstname);
  create index on publ.attendees(lastname);
  create index on publ.attendees(is_vip);
  create index on publ.attendees(is_news_event_email);
  create index on publ.attendees(is_news_fondation_email);
  create index on publ.attendees(panel_number);
  create index on publ.attendees(ticket_number);


-- RBAC
  grant select on publ.attendees to :DATABASE_VISITOR;
  grant insert(registration_id, civility, firstname, lastname, email, is_fundraising_generosity_ok, status, is_inscriptor, is_vip) on publ.attendees to :DATABASE_VISITOR;
  grant update(civility, firstname, lastname, email, is_fundraising_generosity_ok, status,panel_number, is_vip) on publ.attendees to :DATABASE_VISITOR;
  grant delete on publ.attendees to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.attendees
  for each row
  execute procedure priv.tg__timestamps();

  drop function if exists priv.tg_generate_ticket_number cascade;
  create function priv.tg_generate_ticket_number() returns trigger as $$
  begin
    -- generate a 7 digit ticket number, check if it is available and loop until it is
    new.ticket_number := substr(md5(random()::text), 0, 9);
    while exists(select 1 from publ.attendees where ticket_number = new.ticket_number) loop
      new.ticket_number := substr(md5(random()::text), 0, 9);
    end loop;
    return new;
  end;
  $$ language plpgsql volatile security definer;

  drop trigger if exists _200_generate_ticket_number on publ.attendees cascade;
  create trigger _200_generate_ticket_number
  before insert on publ.attendees
  for each row
  execute procedure priv.tg_generate_ticket_number();

-- RLS
  alter table publ.attendees enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.attendees
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
    
/*
  END TABLE: publ.attendees
*/



drop function if exists publ.events_attendees cascade;
create function publ.events_attendees(any_event publ.events) returns setof publ.attendees as $$
  select a.* from publ.attendees a
  inner join publ.registrations r on r.id = a.registration_id
  where r.event_id = any_event.id;
$$ language sql stable;
grant execute on function publ.events_attendees to :DATABASE_VISITOR;


drop function if exists publ.attendees_event_id cascade;
create function publ.attendees_event_id(any_attendee publ.attendees) returns uuid as $$
  -- join via publ.registration
  select r.event_id 
  from publ.registrations r
  where r.id = any_attendee.registration_id;
$$ language sql stable;
grant execute on function publ.attendees_event_id to :DATABASE_VISITOR;

--! split: 03100-attendees-function.sql
/*
  FUNCTION: update_attendee_email_and_send_email
  DESCRIPTION: update the mail attendee and send email with qr code and pdf
*/

create or replace function publ.update_attendee_email_and_send_email(attendees publ.attendees[]) returns publ.attendees[] as $$
DECLARE 
  v_attendee publ.attendees;
  v_attendees publ.attendees[]:= '{}';
  v_iter int;
  
begin

    for v_iter in 1..array_length(attendees, 1) loop
        update publ.attendees a
        set email=attendees[v_iter].email
        where a.id=attendees[v_iter].id 
        returning * into v_attendee;
        
        v_attendees := array_append(v_attendees, v_attendee);

        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', v_attendee.id, 'state','MAJ_INSCRIPTION'));

        perform graphile_worker.add_job('sendMissingEmailPdf', json_build_object('attendeeId', v_attendee.id));

    end loop;
  
  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function update_attendee_email_and_send_email(attendees publ.attendees[]) is E'@arg0variant patch';
grant execute on function update_attendee_email_and_send_email(attendees publ.attendees[]) to :DATABASE_VISITOR;

--! split: 03200-attendees-trigger.sql
CREATE OR REPLACE FUNCTION publ.send_webhook_on_update_attendee() RETURNS TRIGGER AS $$
BEGIN
    perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', NEW.id, 'state','MAJ_PARTICIPANT'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.send_webhook_on_update_attendee() is
  E'Useful shortcut to send a webhook on insert/update.';

create trigger _100_send_webhook_on_update_attendee_trigger
  before  update on publ.attendees
  for each row
execute procedure publ.send_webhook_on_update_attendee();

--! split: 03201-send-email-all-attendee-event-functions.sql
drop type if exists publ.row_event_attendee; 
create type publ.row_event_attendee as ( 
  id text,
  firstname text,
  lastname text,
  ticket_number text,
  sign_code text,
  email text,
  qr_code_url text,
  pdf_url text,
  name text,
  place_name text,
  address_line_1 text,
  starts_at timestamptz,
  ends_at timestamptz,
  details text,
  header_mail_name text, 
  header_mail_contact text, 
  logo text);

/*
  FUNCTION: send_email_all_attendee_event
  DESCRIPTION: Send email to all attendee by event
*/

create or replace function publ.send_email_all_attendee_event(event_id uuid) returns publ.row_event_attendee[] as $$
DECLARE 
  v_attendees publ.row_event_attendee[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

    for v_row in 
        select atts.id,
        atts.firstname,
        atts.lastname,
        atts.ticket_number,
        atts.sign_code,
        atts.email,
        atts.qr_code_url,
        atts.pdf_url,
        evts.name,
        evts.place_name,
        evts.address_line_1,
        evts.starts_at,
        evts.ends_at,
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where regs.event_id = v_event_id and atts.status ='IDLE'
    loop

        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', v_row.header_mail_name, 'email', v_row.header_mail_contact),
            'templateId', 'd-4ff875093aa24081af57ffc3d405537c',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Ticket_Number', v_row.ticket_number,
                'Logo',v_row.logo,
                'String_Day', to_char(v_row.starts_at, 'Day'),
                'Day', to_char(v_row.starts_at, 'D'),
                'Month', to_char(v_row.starts_at, 'Month'),
                'Year', to_char(v_row.starts_at, 'YYYY'),
                'Starts_At', to_char(v_row.starts_at, 'HH24:MI'),
                'Ends_At', to_char(v_row.ends_at, 'HH24:MI'),
                'Place_Name', v_row.place_name,
                'Address', v_row.address_line_1,
                'Detail', v_row.details,
                'Qr_Code_Url', v_row.qr_code_url,
                'Code_Invit', v_row.sign_code,
                'Pdf_Url', v_row.pdf_url,
                'Cancel', 'test',
                'Current_Year', to_char(v_row.starts_at, 'YYYY')
            )
        )) into email_payload;

        v_attendees := array_append(v_attendees, v_row);
        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_all_attendee_event(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee';
grant execute on function publ.send_email_all_attendee_event(uuid) to :DATABASE_VISITOR;
/*
  END FUNCTION: send_email_all_attendee_event
*/

--! split: 03300-send_email_confirm_donation_by_event_id.sql
drop type if exists publ.row_event_attendee_confirm; 
create type publ.row_event_attendee_confirm as ( 
  id text,
  firstname text,
  lastname text,
  email text,
  status text,
  name text,
  place_name text
  );

/*
  FUNCTION: send_email_confirm_donation_by_event_id
  DESCRIPTION: Send email to all attendee to confirm donation by event id
*/

create or replace function publ.send_email_confirm_donation_by_event_id(event_id uuid) returns publ.row_event_attendee_confirm[] as $$
DECLARE 
  v_attendees publ.row_event_attendee_confirm[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee_confirm;
  email_payload jsonb;
begin

  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='CONFIRMED') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

    for v_row in 
        select 
        atts.id,
        atts.firstname,
        atts.lastname,
        atts.email,
        evts.name,
        evts.place_name,
        atts.status
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='CONFIRMED'
        --faire un inner join sur event brandings lorsque pr header mail merge

    loop

        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', 'confirm don', 'email', 'contact@obole.eu'),
            'templateId', 'd-0e3f8b5d24b2410ab77993f93c0e72fc',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Place_Name', v_row.place_name,
                'Current_Year', date_trunc('year', now())::text
            )
        )) into email_payload;

        v_attendees := array_append(v_attendees, v_row);
        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));

    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_confirm_donation_by_event_id(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee and confirm donation';
grant execute on function publ.send_email_confirm_donation_by_event_id(uuid) to :DATABASE_VISITOR;
/*
  END FUNCTION: send_email_confirm_donation_by_event_id
*/

--! split: 03500-form-fields.sql
drop table if exists publ.field_types cascade;
create table publ.field_types (
    type text primary key,
    description text
);
comment on table publ.field_types is E'@enum';

insert into publ.field_types values
    ('text', 'Un input de type `text`'),
    ('textarea', 'Un input de type `textarea`'),
    ('select', 'Un input de type `select`'),
    ('radio', 'Un input de type `radio`'),
    ('checkbox', 'Un input de type `checkbox`'),
    ('date', 'Un input de type `date`'),
    ('email', 'Un input de type `email`'),
    ('tel', 'Un input de type `tel`'),
    ('number', 'Un input de type `number`');


/*
  TABLE: publ.form_fields
  DESCRIPTION: Fields for the form
*/
drop table if exists publ.form_fields cascade;
create table publ.form_fields (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid not null references publ.events(id) on delete cascade,
    name text,
    label text not null,
    type text not null references publ.field_types on delete cascade,
    is_required_for_inscriptor boolean not null default false,
    is_required_for_attendee boolean not null default false,
    is_deletable boolean not null default true,
    applies_to_all_attendees boolean not null default true,
    options text[],
    placeholder text,
    position integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.form_fields(created_at);
  create index on publ.form_fields(updated_at);
  create index on publ.form_fields(event_id);
  create index on publ.form_fields(type);
  create index on publ.form_fields(position);

-- RBAC
  grant select on publ.form_fields to :DATABASE_VISITOR;
  grant insert (event_id, name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position) on publ.form_fields to :DATABASE_VISITOR;
  grant update (name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position) on publ.form_fields to :DATABASE_VISITOR;
  grant delete on publ.form_fields to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.form_fields
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.form_fields enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.form_fields
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.form_fields
*/


drop function if exists priv.tg_form_fields__insert_with_events cascade;
create function priv.tg_form_fields__insert_with_events() returns trigger as $$
begin
    -- insert all the mendatory fields when an event is created: for everyone: email (only mendatory for inscriptor), firstname, lastname, civility
    if (TG_OP = 'INSERT') then
        insert into publ.form_fields (event_id, name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position)
        values (new.id, 'email', 'Email', 'email', true, false, false, true, null, null, 0),
               (new.id, 'firstname', 'Prénom', 'text', true, true, false, true, null, null, 1),
               (new.id, 'lastname', 'Nom', 'text', true, true, false, true, null, null, 2),
               (new.id, 'civility', 'Civilité', 'select', true, true, False, true, '{"Monsieur","Madame"}', null, 5);
    end if;
    return new;
end;
$$ language plpgsql volatile security definer;
grant execute on function priv.tg_form_fields__insert_with_events to :DATABASE_VISITOR;


create trigger _700_form_fields__insert_with_events
after insert on publ.events
for each row
execute procedure priv.tg_form_fields__insert_with_events();

-- create a trigger that orders automatically the fields when on field is modified (position) in an event. All fields in an event have a different position and when one is modified, all subsequent fields are shifted. the max position is the number of fields in the event.


drop table if exists priv.update_form_field_order cascade;
create table priv.update_form_field_order (
  id uuid not null default uuid_generate_v4() primary key unique,
  event_id uuid not null references publ.events(id) on delete cascade
);

drop function if exists priv.tg_form_fields__order cascade;
create function priv.tg_form_fields__order() returns trigger as $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_form_field_order WHERE event_id = NEW.event_id)
  then
      return NEW;
  end if;

  insert into priv.update_form_field_order (event_id) values (NEW.event_id);

    if (TG_OP = 'INSERT') then
      max_order := (select (count(*) )
        from publ.form_fields
        where event_id = NEW.event_id);

        if (NEW.position is null) then
            -- Get the max "order" value for the organization
            
            if (max_order IS NOT NULL) then
                NEW.position = max_order + 1;
            ELSE
                NEW.position = 0;
            END if;
        ELSE
            NEW.position =( select least(NEW.position, max_order));
            -- Shift existing projects with higher "order" value
            update publ.form_fields
            set position = position + 1
            where event_id = NEW.event_id
            and position >= NEW.position;
        END if;
    elsif (TG_OP = 'UPDATE') then
        if (OLD.position <> NEW.position) then
            -- Shift existing projects with higher "order" value
            if (OLD.position < NEW.position) then
                update publ.form_fields
                set position = position - 1
                where event_id = NEW.event_id
                and position > OLD.position
                and position <= NEW.position;
            else
                update publ.form_fields
                set position = position + 1
                where event_id = NEW.event_id
                and position >= NEW.position
                and position < OLD.position;
            end if;
        end if;
    end if;
    delete from priv.update_form_field_order where event_id = NEW.event_id;
    return NEW;
end;
$$ language plpgsql volatile security definer;
grant execute on function priv.tg_form_fields__order to :DATABASE_VISITOR;

drop trigger if exists _100_form_fields__order on publ.form_fields cascade;
create trigger _100_form_fields__order
before insert or update on publ.form_fields
for each row
execute procedure priv.tg_form_fields__order();

--! split: 03600-attendee-form-fields.sql
/*
  TABLE: publ.attendee_form_fields
  DESCRIPTION: that the attendee filled in the form
*/
drop table if exists publ.attendee_form_fields cascade;
create table publ.attendee_form_fields (
    id uuid not null default uuid_generate_v4() primary key unique, 
    attendee_id uuid not null references publ.attendees(id) on delete cascade,
    field_id uuid not null references publ.form_fields(id) on delete cascade,
    value text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendee_form_fields(created_at);
  create index on publ.attendee_form_fields(updated_at);
CREATE INDEX ON "publ"."attendee_form_fields"("field_id");
 CREATE INDEX ON "publ"."attendee_form_fields"("attendee_id");
-- RBAC
  grant select on publ.attendee_form_fields to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.attendee_form_fields
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.attendee_form_fields enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.attendee_form_fields
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.attendee_form_fields
*/

--! split: 04000-registrations-functions.sql
/*
  FUNCTION: register_attendees
  DESCRIPTION: Register attendees to event, generate ticket_number, send worker
*/

drop type if exists publ.complete_attendees cascade;
create type publ.complete_attendees as (
  attendee publ.attendees,
  attendee_form_fields publ.attendee_form_fields[]
);

create or replace function publ.register_attendees(event_id uuid, attendees publ.attendees[]) returns publ.registrations as $$
DECLARE 
  v_registration publ.registrations;
  v_event publ.events;
  v_iter int;
  
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  -- check des registration date de l'event
  if  v_event.booking_starts_at > NOW() and v_event.booking_ends_at < now() then
      raise exception 'Registration is not open' using errcode = 'RGNST';
  end if;

  -- creation de la registration et stockage du resultat dans la variable
    insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;
  -- creation des attendees avec une boucle for, le premier attendee créé (le premier du tableau) est l'inscripteur
  --En ce qui concerne "array_length", il s'agit d'une fonction intégrée en PL/SQL qui renvoie la longueur d'un tableau multi-dimensionnel.

  --"array_length(attendees, 1)" renvoie la longueur de la première dimension du tableau "attendees".
  -- Notez que la première dimension d'un tableau commence toujours à l'indice 1 en PL/SQL, 
  -- contrairement à certains autres langages de programmation où elle commence à 0.

    for v_iter in 1..array_length(attendees, 1) loop
        insert into publ.attendees (civility, status, registration_id, firstname, lastname, email, is_inscriptor, sign_code)
        values (attendees[v_iter].civility, 
        coalesce(attendees[v_iter].status, 'IDLE'), 
        v_registration.id, 
        attendees[v_iter].firstname, 
        attendees[v_iter].lastname, 
        attendees[v_iter].email, 
        v_iter = 1,
        substring(uuid_generate_v4()::text, 1, 6));

        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees[v_iter].id, 'state','RESA_BILLET'));

    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));


  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;

drop type if exists publ.attendee_import; 
create type publ.attendee_import as (
  data publ.attendees,
  error_code text,
  error_message text,
  error_value text
);
/*
  FUNCTION: register_attendees_csv
  DESCRIPTION: Register attendees from a csv import
*/

create or replace function publ.register_attendees_csv(event_id uuid, attendees_csv publ.attendees[], is_forcing boolean) returns publ.attendee_import[] as $$
DECLARE 
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_attendee_imported publ.attendee_import;
  v_attendees publ.attendee_import[];
  v_iter int;
begin
    for v_iter in 1..array_length(attendees_csv, 1) loop

      if exists (select 1 from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.email = attendees_csv[v_iter].email and regs.event_id=register_attendees_csv.event_id and not is_forcing ) then

        v_attendee_imported.data:=null;
        v_attendee_imported.error_code:='RGNST';
        v_attendee_imported.error_message:='Participant existe déjà';
        v_attendee_imported.error_value:=attendees_csv[v_iter].email;
      
      else 
        insert into publ.registrations (event_id ) values (register_attendees_csv.event_id) returning * into v_registration;

        insert into publ.attendees (
        civility, 
        status, 
        registration_id, 
        firstname, 
        lastname, 
        email, 
        is_inscriptor, 
        is_vip
        ) values( attendees_csv[v_iter].civility,
        'IDLE', 
        v_registration.id, 
        attendees_csv[v_iter].firstname, 
        attendees_csv[v_iter].lastname,
        attendees_csv[v_iter].email, 
        true,
        attendees_csv[v_iter].is_vip)
        returning * into v_attendee;

        --ici j'initialise a null afin d'éviter la mémorisation de la dernière valeur
        v_attendee_imported.data:=v_attendee;
        v_attendee_imported.error_code:=null;
        v_attendee_imported.error_message:=null;
        v_attendee_imported.error_value:=null;
        perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
        
        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', attendees_csv[v_iter].id, 'state','RESA_BILLET'));
       
      end if;
       
        v_attendees := array_append(v_attendees, v_attendee_imported);
    end loop;

  return v_attendees;

end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees_csv(event_id uuid, attendees_csv publ.attendees[], is_forcing boolean) is E'@arg1variant patch';
grant execute on function publ.register_attendees_csv(uuid, publ.attendees[], boolean) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees_csv
*/



drop function if exists publ.register_complete_attendees cascade;
create function publ.register_complete_attendees(event_id uuid, complete_attendees publ.complete_attendees[]) returns publ.registrations as $$
declare
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- check des registration date de l'event
  if  v_event.booking_starts_at > NOW() and v_event.booking_ends_at < now() then
      raise exception 'Registration is not open' using errcode = 'RGNST';
  end if;



  insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

    insert into publ.attendees (
    civility, 
    status, 
    registration_id, 
    firstname, 
    lastname, 
    email, 
    is_inscriptor, 
    is_vip
    ) values( complete_attendees[v_iter].attendee.civility,
    'IDLE', 
    v_registration.id, 
    complete_attendees[v_iter].attendee.firstname, 
    complete_attendees[v_iter].attendee.lastname,
    complete_attendees[v_iter].attendee.email, 
    v_iter = 1,
    complete_attendees[v_iter].attendee.is_vip)
    returning * into v_attendee;

    -- loop over the form fields and insert the values
    for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
      insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
    end loop;

    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
    perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', v_attendee.id, 'state','RESA_BILLET'));

  end loop;

  return v_registration;
  
end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendees to :DATABASE_VISITOR;


drop function if exists publ.register_complete_attendee_csv cascade;
create function publ.register_complete_attendee_csv(event_id uuid, complete_attendees publ.complete_attendees[], is_forcing boolean = false) returns publ.attendee_import[] as $$
declare
  v_registration publ.registrations;
  v_attendees publ.attendee_import[];
  v_attendee_imported publ.attendee_import;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin
  
  -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

    if exists (select 1 from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.email = complete_attendees[v_iter].attendee.email and regs.event_id=register_complete_attendee_csv.event_id and not is_forcing ) then

      v_attendee_imported.data:=null;
      v_attendee_imported.error_code:='ALEXT'; --'already exists
      v_attendee_imported.error_message:='Participant existe déjà';
      v_attendee_imported.error_value:=complete_attendees[v_iter].attendee.email;
    
    else 
      insert into publ.registrations (event_id ) values (register_complete_attendee_csv.event_id) returning * into v_registration;

      insert into publ.attendees (
      civility, 
      status, 
      registration_id, 
      firstname, 
      lastname, 
      email, 
      is_inscriptor, 
      is_vip
      ) values( complete_attendees[v_iter].attendee.civility,
      'IDLE', 
      v_registration.id, 
      complete_attendees[v_iter].attendee.firstname, 
      complete_attendees[v_iter].attendee.lastname,
      complete_attendees[v_iter].attendee.email, 
      true,
      complete_attendees[v_iter].attendee.is_vip)
      returning * into v_attendee;

      -- loop over the form fields and insert the values
      for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
        insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
      end loop;

      perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));
      perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', v_attendee.id, 'state','RESA_BILLET'));

    end if;
     
      v_attendees := array_append(v_attendees, v_attendee_imported);  
  end loop;

  return v_attendees;

end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendee_csv to :DATABASE_VISITOR;

--! split: 06000-logs.sql
drop table if exists publ.logs_status cascade;
create table publ.logs_status (
    type text primary key,
    description text
);
comment on table publ.logs_status is E'@enum';

insert into publ.logs_status values
    ('OK', 'Tout se passe bien'),
    ('WARNING', 'Attention'),
    ('WARNING_EMAIL','Pas d''email'),
    ('WARNING_PANEL','Pas de panneau'),
    ('ERROR', 'Une erreur s''est produite'),
    ('WARNING_SIGN_CODE', 'Probleme de QR Code');

/*
  TABLE: publ.logs
  DESCRIPTION: table qui regroupe les inscriptions en temps réel de l'event
*/
drop table if exists publ.logs cascade;
create table publ.logs (
    id uuid not null default uuid_generate_v4() primary key unique,
    event_id uuid references publ.events(id) ,
    status text not null references publ.logs_status on delete cascade,
    payload json,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.logs(created_at);
  create index on publ.logs(updated_at);
  create index on publ.logs(status);
  create index on publ.logs(event_id);

-- RBAC
  grant select on publ.logs to :DATABASE_VISITOR;
  grant insert(event_id, status, payload) on publ.logs to :DATABASE_VISITOR;
  grant update(status, payload) on publ.logs to :DATABASE_VISITOR;
  grant delete on publ.logs to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.logs
  for each row
  execute procedure priv.tg__timestamps();


-- RLS
  alter table publ.logs enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.logs
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here


/*
  END TABLE: publ.logs
*/

--! split: 07000-scan_functions.sql
/*
  FUNCTION: scan_attendee
  DESCRIPTION: Confirmed attendees at event, add panel number and email if missing + store logs
*/

-- drop type if exists publ.ticket_payload; 
-- create type publ.ticket_payload as ( 
--   event_id uuid, 
--   attendee_id uuid, 
--   registration_id uuid,
--   firstname text,
--   lastname text,
--   ticket_number text, 
--   panel_number int, 
--   email citext, 
--   payload jsonb, 
--   sign_code text );

-- create or replace function publ.scan_attendee(ticket_payload publ.ticket_payload) returns publ.attendees as $$
-- DECLARE 
--   v_attendee publ.attendees;
--   v_event_id uuid;
--   v_ticket_number text;
--   v_attendee_id uuid;
--   v_attendee_email text;
--   v_panel_number int:= ticket_payload.panel_number;--cast ici du typage car il etait impossible d'insérer tu texte de json en typ int dans attendees par exemple 
--   v_ticket_payload publ.ticket_payload;
-- BEGIN

--       if ticket_payload.sign_code is null then
--         v_ticket_number:=ticket_payload.ticket_number;
--         v_event_id:=ticket_payload.event_id;
--         v_attendee_id:=ticket_payload.attendee_id;
--         v_attendee_email:=ticket_payload.email;
--       else
--       --on récupere ici en cas de probleme qr code les infos necessaire de l'attendee via le sign_code
--         select regs.event_id,  atts.id, atts.registration_id, atts.firstname, atts.lastname, atts.ticket_number, atts.panel_number, atts.email into v_ticket_payload from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.sign_code=ticket_payload.sign_code;
--         insert into publ.logs (event_id,status,payload) values (v_ticket_payload.event_id,'WARNING_SIGN_CODE',jsonb_build_object('ticket_payload',v_ticket_payload));
--       end if;

--       if  ticket_payload.email is null and ticket_payload.sign_code is null then
--         insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payload));
--       end if;

--       update publ.attendees as atts set 
--           status = CASE 
--                       when v_panel_number is null then 'TICKET_SCAN'
--                       when v_panel_number is not null then 'CONFIRMED'
--                       ELSE status
--                    END,
--           email = v_attendee_email, 
--           panel_number = v_panel_number 
--       where atts.id=v_attendee_id and atts.ticket_number=v_ticket_number returning * into v_attendee;

--       if not found then
--           insert into publ.logs (event_id,status,payload) values (
--             v_event_id,
--             'ERROR',
--             jsonb_build_object('ticket_payload',ticket_payload));
--              raise exception 'Pas de participant' using errcode = 'RGNST';
--       else
--           insert into publ.logs (event_id,status,payload) values (
--             v_event_id,
--              CASE 
--                when v_panel_number is null then 'WARNING_PANEL'
--                when v_panel_number is not null then 'OK'
--              END,
--             jsonb_build_object('ticket_payload',ticket_payload));
--       end if;

--   return v_attendee;
  
-- end;
-- $$ language plpgsql VOLATILE SECURITY DEFINER;
-- comment on function scan_attendee(ticket_payload publ.ticket_payload) is E'scan du billet pour update la table attendees et logs';
-- grant execute on function publ.scan_attendee(ticket_payload publ.ticket_payload) to :DATABASE_VISITOR;

-- /*
--   END FUNCTION: scan_attendee
-- */

-- /*
--   FUNCTION: scan_attendees_offline
--   DESCRIPTION: Scan all attendees store when offline mode, add panel number and email if missing + store logs
-- */

-- create or replace function publ.scan_attendees_offline(ticket_payloads publ.ticket_payload[]) returns publ.attendees[] as $$
-- DECLARE 
--   v_attendee publ.attendees;
--   v_attendees publ.attendees[];
--   v_event_id uuid;
--   v_panel_number int;
--   v_attendee_id uuid;
--   v_ticket_number text;
--   v_attendee_email text;
--   v_iter int;
--    v_ticket_payload publ.ticket_payload;
-- BEGIN

--     for v_iter in 1..array_length(ticket_payloads,1) loop
    
--             if ticket_payloads[v_iter].sign_code is null then
--               v_ticket_number:= ticket_payloads[v_iter].ticket_number;
--               v_event_id:= ticket_payloads[v_iter].event_id;
--               v_attendee_id:= ticket_payloads[v_iter].attendee_id;
--               v_panel_number := ticket_payloads[v_iter].panel_number;
--               v_attendee_email:= ticket_payloads[v_iter].email;
--             else
--             --on récupere ici en cas de probleme qr code les infos necessaire de l'attendee via le sign_code
--                select regs.event_id,  atts.id, atts.registration_id, atts.firstname, atts.lastname, atts.ticket_number, atts.panel_number, atts.email into v_ticket_payload from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.sign_code=ticket_payloads[v_iter].sign_code;
--               insert into publ.logs (event_id,status,payload) values (v_ticket_payload.event_id,'WARNING_SIGN_CODE',jsonb_build_object('ticket_payload',v_ticket_payload,'is_coming_from_offline_mode',true));
--             end if;

--             if  ticket_payloads[v_iter].email is null and ticket_payloads[v_iter].sign_code is null then
--                 insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
--             end if;
            
--             update publ.attendees as atts set 
--                 status = CASE 
--                             when v_panel_number is null then 'TICKET_SCAN'
--                             when v_panel_number is not null then 'CONFIRMED'
--                             ELSE status
--                         END,
--                 email = v_attendee_email, 
--                 panel_number = v_panel_number 
--             where atts.id=v_attendee_id and atts.ticket_number=v_ticket_number or atts.sign_code=ticket_payloads[v_iter].sign_code  returning * into v_attendee;

--             if not found then
--                 insert into publ.logs (event_id,status,payload) values (
--                   v_event_id,
--                   'ERROR',
--                   jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
                 
--             else
--                 insert into publ.logs (event_id,status,payload) values (
--                 v_event_id,
--                 CASE 
--                   when v_panel_number is null then 'WARNING_PANEL'
--                   when v_panel_number is not null then 'OK'
--                 END,
--                 jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));

--                 v_attendees := array_append(v_attendees, v_attendee);
--             end if;
--     end loop;
--   return v_attendees;
  
-- end;
-- $$ language plpgsql VOLATILE SECURITY DEFINER;
-- comment on function scan_attendees_offline(ticket_payloads publ.ticket_payload[]) is E'scan de tous les tickets offline';
-- grant execute on function publ.scan_attendees_offline(ticket_payloads publ.ticket_payload[]) to :DATABASE_VISITOR;

-- /*
--   END FUNCTION: scan_attendees_offline
-- */



drop type if exists publ.ticket_payload cascade;
create type publ.ticket_payload as (
  ticket_number text,
  panel_number int,
  email text,
  metadata jsonb
);

drop function if exists publ.scan_attendee cascade;
create function publ.scan_attendee(payload publ.ticket_payload) returns boolean as $$
declare
  v_attendee publ.attendees;
  v_registration publ.registrations;
begin
  select * into v_attendee from publ.attendees where ticket_number=payload.ticket_number;
  select * into v_registration from publ.registrations where id=v_attendee.registration_id;

  if not found then
    insert into publ.logs (event_id,status,payload) values (v_registration.event_id,'ERROR',jsonb_build_object('ticket_payload',payload));
    raise exception 'Pas de participant' using errcode = 'RGNST';
  else

    if payload.email is null and v_attendee.email is null then
      insert into publ.logs (event_id,status,payload) values (v_registration.event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',payload));
    end if;

    update publ.attendees att set status='CONFIRMED', panel_number=payload.panel_number, email=coalesce(att.email, payload.email) where ticket_number=payload.ticket_number;
  end if;
  return true;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.scan_attendee to :DATABASE_VISITOR;



drop function if exists publ.scan_attendees_async cascade;
create function publ.scan_attendees_async(payloads publ.ticket_payload[]) returns boolean as $$
declare
  v_iter int;
begin 
  for v_iter in 1..array_length(payloads,1) loop
    perform publ.scan_attendee(payloads[v_iter]);
  end loop;
  return true;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.scan_attendees_async to :DATABASE_VISITOR;

--! split: 08000-attendees_computed_column.sql
drop function if exists publ.events_total_registrations cascade;
create function publ.events_total_registrations(event publ.events ) returns int as $$
  select  COUNT(DISTINCT CASE WHEN atts.status != 'CANCELLED' THEN regs.id END) from publ.registrations regs
  inner join publ.attendees atts ON atts.registration_id = regs.id 
  where regs.event_id = event.id;
$$ language sql stable;
grant execute on function publ.events_total_registrations to :DATABASE_VISITOR;

drop function if exists publ.events_total_confirmed_registrations cascade;
create function publ.events_total_confirmed_registrations(event publ.events ) returns int as $$
  select  COUNT(DISTINCT CASE WHEN atts.status = 'CONFIRMED' THEN regs.id END) from publ.registrations regs 
  inner join publ.attendees atts ON atts.registration_id = regs.id
  where regs.event_id = event.id;
$$ language sql stable;
grant execute on function publ.events_total_confirmed_registrations to :DATABASE_VISITOR;

--! split: 90000-fixtures.sql
insert into publ.organizations (id, name, description, logo_url) values ('3fdd6e49-8a4b-41c8-8df0-17fe8be4efb8', 'The Organisation', 'The Organisation is a group of people who work together on projects.', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('3d670ad3-29c6-4a8d-a761-f8494859c67f', 'La Nuit Du Bien Commun', 'La nuit du bien commun', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('80bdb4c2-6fee-488c-b0c2-d9e34317c1d2', 'Obole', 'Obole startup', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('881a4dc1-b74f-4e21-9d37-87b83970642f', 'Grinn', 'Grinn agency web', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');

insert into publ.organizations (name, slug, description, logo_url) values ('Michou', 'michou', 'Michou est une organisation', 'https://randomuser.me/api/portraits/men/3.jpg');
insert into publ.organization_memberships (organization_id, user_id, role) values ((select id from publ.organizations where slug='michou'), (select id from publ.users where username='Michou'), 'OWNER');





    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d','Nantes', 'Apéro Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')));
    insert into publ.events (id, is_draft, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('347687ee-e455-4041-a3e0-ccf484149785', false, 'Paris','La nuit des devs', 'second test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),'2023-02-20 20:00:00','2023-12-20 20:00:00');







 insert into publ.attendees ( civility, firstname,lastname, email, is_inscriptor ,status) values ('MR','1', 'blip','1@blip.com',true,'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MME','2', 'blip','2@blip.com', 'IDLE');

    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '11', 'blip','11@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '111', 'blip','111@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '12', 'blip','12@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '13', 'blip','13@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '14', 'blip','14@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '15', 'blip','15@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', 'tst', 'testeuh','tst@testeuh.com','IDLE');
