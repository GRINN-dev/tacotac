


CREATE OR REPLACE FUNCTION publ.registration_by_event_slug(event_slug text)
RETURNS  publ.registrations AS $$
DECLARE
  attendees publ.registrations%ROWTYPE;
BEGIN
    SELECT reg.*
    FROM publ.registrations reg
    INNER JOIN publ.events evt ON evt.id = reg.event_id
    INNER JOIN publ.attendees att ON att.registration_id = reg.id
    WHERE evt.slug = event_slug into attendees;
    RETURN  attendees;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


grant execute on function publ.registration_by_event_slug( text) to :DATABASE_VISITOR;

create or replace function publ.create_registration_by_event_id_and_attendee_id(event_id uuid, attendee_id uuid) returns void as $$
DECLARE 
  code text;
  ticket_num TEXT;
  new_registration_id UUID;
begin

code :=  substring(uuid_generate_v4()::text, 1, 6);
ticket_num := 'TICKET_' || md5(random()::text || clock_timestamp()::text);

    if exists (select booking_starts_at, booking_ends_at from publ.events where id=event_id and  (booking_starts_at <= NOW() and booking_ends_at >= now())) then
    
        insert into publ.registrations(event_id) values (event_id) on conflict do nothing returning id INTO new_registration_id;

        update publ.attendees attds set registration_id = new_registration_id where attds.id=attendee_id;

--certainement a delete check
      if exists (select is_inscriptor from publ.attendees att where att.id=attendee_id ) then
          update publ.registrations regs
          set sign_code = code, ticket_number = ticket_num
          where regs.id in (select registration_id from publ.attendees atts where atts.id=attendee_id );
      end if;
      
    end if ;
     
  return;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER SET search_path TO pg_catalog, public, pg_temp;

grant execute on function publ.create_registration_by_event_id_and_attendee_id( uuid, uuid) to :DATABASE_VISITOR;



--transformer cette fonction en mutation pour envoi via iframe
create or replace function publ.send_email_confirmation_by_registration_id(reg_id uuid) returns void as $$
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
    code_invit text;
    att_id uuid;
    evt_id uuid;
 begin

  select  reg.ticket_number, reg.sign_code, att.id, att.firstname,  att.lastname, att.email, evt.id, evt.name, evt.slug, evt.place_name, evt.starts_at, evt.ends_at 
  into  ticket_num, code_invit,att_id, first_name, last_name, attendee_email,evt_id,  event_name, event_slug, place_name, starts_at, ends_at
  from publ.registrations reg 
  inner join publ.attendees att on att.registration_id = reg.id 
  inner join publ.events evt on evt.id = reg.event_id 
  where  reg.id=reg_id;  

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
          'endsAt',ends_at,
          'signCode',code_invit
        ));
end;
$$ language plpgsql strict volatile security definer;

grant execute on function publ.send_email_confirmation_by_registration_id(uuid) to :DATABASE_VISITOR;
