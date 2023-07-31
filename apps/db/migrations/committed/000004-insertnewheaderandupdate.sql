--! Previous: sha1:f0835fe11fb0aebbbb5f2148a371b6a55be2f55e
--! Hash: sha1:d5c6fb38e5dab02041ba871117344b69cb862b9f
--! Message: insertnewheaderandupdate

--! split: 1-current.sql
-- Enter migration here
drop function if exists priv.event_branding__insert_with_event() cascade;
create function priv.event_branding__insert_with_event() returns trigger as $$
begin
  insert into publ.event_brandings(event_id, font, logo, rich_text, short_text,header_mail_name) values(NEW.id,'roboto','https://lille.lanuitdubiencommun.com/lib_YZQWsZJIBnpPHhyU/9co78sidc8k6jjf1.png?w=140','##rich text
   goes  here','short text', NEW.name) 
  on conflict do nothing;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

drop function if exists priv.event_branding__update_with_event();
create function priv.event_branding__update_with_event() returns trigger as $$
begin
 update publ.event_brandings
  set
    header_mail_name = NEW.name
  where event_id = NEW.id;
 
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _500_update_branding
  after update on publ.events
  for each row
  execute procedure priv.event_branding__update_with_event();
comment on function priv.event_branding__insert_with_event() is E'Ensures that every update event update branding header_mail_name value in event_branding';
