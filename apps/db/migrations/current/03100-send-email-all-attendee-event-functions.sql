drop type if exists publ.row_event_attendee; 
create type publ.row_event_attendee as ( 
  id text,
  firstname text,
  lastname text,
  ticket_number text,
  sign_code text,
  email text,
  qr_code_url text,
  pdf_url text,
  name text,
  place_name text,
  address_line_1 text,
  starts_at timestamptz,
  ends_at timestamptz,
  details text);

create or replace function publ.send_email_all_attendee_event(event_id uuid) returns publ.row_event_attendee[] as $$
DECLARE 
  v_attendees publ.row_event_attendee[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin

    for v_row in 
        select atts.id,
        atts.firstname,
        atts.lastname,
        atts.ticket_number,
        atts.sign_code,
        atts.email,
        atts.qr_code_url,
        atts.pdf_url,
        evts.name,
        evts.place_name,
        evts.address_line_1,
        evts.starts_at,
        evts.ends_at,
        evts.details
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='IDLE'
    loop
        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', 'L''équipe', 'email', 'contact@obole.eu'),
            'templateId', 'd-4ff875093aa24081af57ffc3d405537c',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Ticket_Number', v_row.ticket_number,
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
                'Code_Invit', v_row.sign_code,
                'Pdf_Url', v_row.pdf_url,
                'Cancel', 'test',
                'Current_Year', to_char(v_row.starts_at, 'YYYY')
            )
        )) into email_payload;
    v_attendees := array_append(v_attendees, v_row);
    perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
    end loop;

   
  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_all_attendee_event(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee';
grant execute on function publ.send_email_all_attendee_event(uuid) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees
*/