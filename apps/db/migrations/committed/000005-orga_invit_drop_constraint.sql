--! Previous: sha1:56f18816b6a92d0a6b336cba2578f130a211fd7c
--! Hash: sha1:818c77933b39e61b7789e680466f51922424cd7e
--! Message: orga_invit_drop_constraint

--! split: 1-current.sql
-- Enter migration here
ALTER TABLE  publ.organization_invitations
DROP  constraint if exists organization_invitations_check1,
DROP  constraint if exists organization_invitations_check;
