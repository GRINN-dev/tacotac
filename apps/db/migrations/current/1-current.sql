-- Enter migration here
drop trigger if exists generate_slug_trigger on publ.organizations;
CREATE TRIGGER generate_slug_trigger
BEFORE INSERT ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();


drop trigger if exists _700_generate_slug_trigger on publ.events;
  create trigger _700_generate_slug_trigger
    before insert on publ.events
    for each row
    execute procedure publ.generate_slug();
