-- Enter migration here
drop trigger if exists generate_slug_trigger on publ.organizations;
CREATE TRIGGER generate_slug_trigger
BEFORE INSERT ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();
