--! Previous: sha1:608270c01be78c38a0e6d77b5479effda5c3e355
--! Hash: sha1:f0835fe11fb0aebbbb5f2148a371b6a55be2f55e
--! Message: addcolumneventbrandings

--! split: 1-current.sql
-- Enter migration here
alter table publ.event_brandings add column if not exists image_ticket_url text;

 grant insert( css_variables, font, logo, rich_text, short_text, header_mail_name, header_mail_contact, image_ticket_url) on publ.event_brandings to :DATABASE_VISITOR;
 grant update( css_variables, font, logo, rich_text, short_text, header_mail_name, header_mail_contact, image_ticket_url) on publ.event_brandings to :DATABASE_VISITOR;
