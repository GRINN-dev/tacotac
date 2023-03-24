drop type if exists publ.row_event_attendee_confirm; 
create type publ.row_event_attendee_confirm as ( 
  id text,
  firstname text,
  lastname text,
  email text,
  status text,
  name text,
  place_name text
  );

/*
  FUNCTION: send_email_confirm_donation_by_event_id
  DESCRIPTION: Send email to all attendee to confirm donation by event id
*/

create or replace function publ.send_email_confirm_donation_by_event_id(event_id uuid) returns publ.row_event_attendee_confirm[] as $$
DECLARE 
  v_attendees publ.row_event_attendee_confirm[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee_confirm;
  email_payload jsonb;
begin

  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='CONFIRMED') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

    for v_row in 
        select 
        atts.id,
        atts.firstname,
        atts.lastname,
        atts.email,
        evts.name,
        evts.place_name,
        atts.status
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='CONFIRMED'
        --faire un inner join sur event brandings lorsque pr header mail merge

    loop

        select  jsonb_build_object('mailData', jsonb_build_object(
            'to', v_row.email,
            'from', jsonb_build_object('name', 'confirm don', 'email', 'contact@obole.eu'),
            'templateId', 'd-0e3f8b5d24b2410ab77993f93c0e72fc',
            'dynamicTemplateData', jsonb_build_object(
                'Event_Name', v_row.name,
                'First_Name', v_row.firstname,
                'Last_Name', v_row.lastname,
                'Place_Name', v_row.place_name,
                'Current_Year', date_trunc('year', now())::text
            )
        )) into email_payload;

        v_attendees := array_append(v_attendees, v_row);
        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));

    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_confirm_donation_by_event_id(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee and confirm donation';
grant execute on function publ.send_email_confirm_donation_by_event_id(uuid) to :DATABASE_VISITOR;
/*
  END FUNCTION: send_email_confirm_donation_by_event_id
*/