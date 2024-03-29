--! Previous: sha1:1b3c44b6610f1292c3e6078494ea9bbef03bb6cd
--! Hash: sha1:5d1f30be85370126d79fd8fc2a6740139049fb57
--! Message: update_send_email_ticket_number

--! split: 1-current.sql
-- Enter migration here
drop function if exists publ.send_email_attendee_event cascade;
create or replace function publ.send_email_attendee_event(ticket_number text) returns publ.row_event_attendee as $$
DECLARE 
  v_ticket_number text := ticket_number;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'y a pas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where atts.ticket_number = v_ticket_number and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

     
        select atts.id,
        atts.firstname,
        atts.lastname,
        atts.ticket_number,
        atts.email,
        atts.qr_code_url,
        atts.pdf_url,
        evts.name,
        evts.place_name,
        evts.address_line_1,
        evts.starts_at AT TIME ZONE 'Europe/Paris',
        evts.ends_at AT TIME ZONE 'Europe/Paris',
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where atts.ticket_number = v_ticket_number and atts.status ='IDLE'
        into v_row;

        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', v_row.header_mail_name, 'email', v_row.header_mail_contact),
            'templateId', 'd-4ff875093aa24081af57ffc3d405537c',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Ticket_Number', v_row.ticket_number,
                'Logo',v_row.logo,
                'String_Day', to_char(v_row.starts_at, 'Day'),
                'Day', to_char(v_row.starts_at, 'D'),
                'Month', to_char(v_row.starts_at, 'Month'),
                'Year', to_char(v_row.starts_at, 'YYYY'),
                'Starts_At', to_char(v_row.starts_at, 'HH24:MI'),
                'Ends_At', to_char(v_row.ends_at, 'HH24:MI'),
                'Place_Name', v_row.place_name,
                'Address', v_row.address_line_1,
                'Detail', v_row.details,
                'Qr_Code_Url', v_row.qr_code_url,
                'Pdf_Url', v_row.pdf_url,
                'Cancel', 'test',
                'Current_Year', to_char(v_row.starts_at, 'YYYY')
            )
        )) into email_payload;

        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
  return v_row;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_attendee_event(ticket_number text) is E'Select ticket_number to send email to attendee';
grant execute on function publ.send_email_attendee_event(text) to :DATABASE_VISITOR;
