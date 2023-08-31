--! Previous: sha1:9854779d19d50001f1305bf61ed4b20a8ce63962
--! Hash: sha1:666353c326ad7665e3f8deb078eed0a60b889a7d
--! Message: triggerinserteventcreatebrandings

--! split: 1-current.sql
-- Enter migration here
create or replace trigger _500_create_branding
  after insert on publ.events
  for each row
  execute procedure priv.event_branding__insert_with_event();
comment on function priv.event_branding__insert_with_event() is E'Ensures that every create event create branding header_mail_name value in event_branding';
