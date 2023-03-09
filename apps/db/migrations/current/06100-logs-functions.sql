

create or replace function priv.log_attendee_count() returns trigger as $$
declare
    v_event_id uuid;
    v_total_registrations int;
begin
  -- Obtenir l'ID de l'événement
    select event_id into v_event_id from publ.registrations where id = NEW.registration_id;

  -- Obtenir le nombre total de participants inscrits par event
    select  count(atts.status) into v_total_registrations from publ.registrations regs 
    inner join publ.attendees atts on regs.id= atts.registration_id where atts.status!='CANCELLED' and regs.event_id=event_id group by regs.event_id;

  -- Incrémenter le nombre total de participants inscrits dans les logs par event
    update publ.logs set payload = jsonb_set(payload, '{current_total_registrations}', to_json(v_total_registrations)::jsonb) where event_id = v_event_id;
  
  return NEW;
end;
$$ language plpgsql;

create trigger _500_log_attendee_count
after insert on publ.attendees
for each row
 execute procedure priv.log_attendee_count();
comment on function priv.log_attendee_count() is E'Ensures that every create attendee insert paylod in logs';

create or replace function priv.log_attendee_confirmed_count() returns trigger as $$
declare
    v_event_id uuid;
    v_total_confirmed_registrations int;
begin
  -- Obtenir l'ID de l'événement
    select event_id into v_event_id from publ.registrations where id = NEW.registration_id;

  -- Obtenir le nombre total de participants inscrits par event
    select  count(atts.status) into v_total_confirmed_registrations from publ.registrations regs 
    inner join publ.attendees atts on regs.id= atts.registration_id where atts.status='CONFIRMED' and regs.event_id=event_id group by regs.event_id ;

  -- Incrémenter le nombre total de participants inscrits dans les logs par evetn et si status confirmed
    update publ.logs set payload = jsonb_set(payload, '{current_confirmed_registrations}', to_json(v_total_confirmed_registrations)::jsonb) where event_id = v_event_id and NEW.status='CONFIRMED';
  
  return NEW;
end;
$$ language plpgsql;

create trigger _500_log_attendee_confirmed_count
after update on publ.attendees
for each row
 execute procedure priv.log_attendee_confirmed_count();
comment on function priv.log_attendee_confirmed_count() is E'Ensures that every update attendee on status confirmed is update on logs';