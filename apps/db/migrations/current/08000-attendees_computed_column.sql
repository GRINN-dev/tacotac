drop function if exists publ.events_total_registrations cascade;
create function publ.events_total_registrations(event publ.events ) returns int as $$
  select  COUNT(DISTINCT regs.id) from publ.registrations regs 
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
