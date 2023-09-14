
create or replace function priv.event_branding__update_with_event() returns trigger as $$
begin

    if (exists (select 1 from publ.event_brandings where event_id = NEW.id)) then
        update publ.event_brandings
        set
            header_mail_name = NEW.name
        where event_id = NEW.id;
    else
          insert into publ.event_brandings(event_id, font, logo, rich_text, short_text,header_mail_name) values(NEW.id,'roboto','https://lille.lanuitdubiencommun.com/lib_YZQWsZJIBnpPHhyU/9co78sidc8k6jjf1.png?w=140','##rich text
   goes  here','short text', NEW.name) ;
    end if;

  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
