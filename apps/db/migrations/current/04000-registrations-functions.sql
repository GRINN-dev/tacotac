--transformer cette fonction en mutation pour envoi via iframe
create or replace function publ.send_email_confirmation_by_id(evt_id uuid, att_id uuid) returns void as $$
 begin
    perform graphile_worker.add_job('qrCodeGen', json_build_object(
          'registrationId',(select id from publ.registrations reg where reg.attendee_id = att_id and reg.event_id = evt_id),
          'ticketNumber',(select ticket_number from publ.registrations reg where reg.attendee_id = att_id and reg.event_id = evt_id),
          'eventId', evt_id,
          'attendeeId', att_id,
          'email',(select email from publ.attendees att where att.id = att_id),
          'firstname',(select firstname from publ.attendees att where att.id = att_id),
          'lastname',(select lastname from publ.attendees att where att.id = att_id),
          'eventName',(select name from publ.events evt where evt.id = evt_id),
          'slug',(select slug from publ.events evt where evt.id = evt_id),
          'placeName',(select place_name from publ.events evt where evt.id = evt_id),
          'startsAt',(select starts_at from publ.events evt where evt.id = evt_id),
          'endsAt',(select ends_at from publ.events evt where evt.id = evt_id)
        ));
end;
$$ language plpgsql strict volatile security definer;

grant execute on function publ.send_email_confirmation_by_id(uuid, uuid) to :DATABASE_VISITOR;
