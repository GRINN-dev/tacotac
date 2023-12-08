
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

    if payload.email is null and (v_attendee.email is null or v_attendee.email = '') then
      insert into publ.logs (event_id,status,payload) values (v_registration.event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',payload));
    end if;

    update publ.attendees att set 
        status='CONFIRMED', 
        panel_number=payload.panel_number, 
        email=CASE
                  WHEN v_attendee.email IS NOT NULL AND v_attendee.email <> '' THEN v_attendee.email
                  WHEN payload.email IS NOT NULL AND payload.email <> '' THEN payload.email
                  ELSE 'toto'
                END
    where ticket_number=payload.ticket_number;
  end if;
  return true;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.scan_attendee to :DATABASE_VISITOR;
