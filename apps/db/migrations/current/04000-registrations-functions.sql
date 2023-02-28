--transformer cette fonction en mutation pour envoi via iframe
create or replace function publ.send_email_confirmation_by_id(evt_id uuid, att_id uuid) returns void as $$
DECLARE
    ticket_num text;
    first_name text;
    last_name text;
    event_name text;
    event_slug text;
    place_name text;
    starts_at timestamp;
    ends_at timestamp;
    attendee_email text;
    reg_id uuid;
 begin

  select reg.id, ticket_number, att.firstname, att.lastname, att.email, evt.name, evt.slug, evt.place_name, evt.starts_at, evt.ends_at 
  into reg_id, ticket_num, first_name, last_name, attendee_email, event_name, event_slug, place_name, starts_at, ends_at
  from publ.registrations reg 
  inner join publ.attendees att on att.id = reg.attendee_id 
  inner join publ.events evt on evt.id = reg.event_id 
  where reg.attendee_id=att_id and reg.event_id=evt_id; 

    perform graphile_worker.add_job('qrCodeGen', json_build_object(
          'registrationId',reg_id,
          'ticketNumber',ticket_num,
          'eventId', evt_id,
          'attendeeId', att_id,
          'email',attendee_email,
          'firstname',first_name,
          'lastname',last_name,
          'eventName',event_name,
          'slug',event_slug,
          'placeName',place_name,
          'startsAt',starts_at,
          'endsAt',ends_at
        ));
end;
$$ language plpgsql strict volatile security definer;

grant execute on function publ.send_email_confirmation_by_id(uuid, uuid) to :DATABASE_VISITOR;
