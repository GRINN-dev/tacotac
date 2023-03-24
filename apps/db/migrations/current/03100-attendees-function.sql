
/*
  FUNCTION: update_attendee_email_and_send_email
  DESCRIPTION: update the mail attendee and send email with qr code and pdf
*/

create or replace function publ.update_attendee_email_and_send_email(attendees publ.attendees[]) returns publ.attendees[] as $$
DECLARE 
  v_attendee publ.attendees;
  v_attendees publ.attendees[]:= '{}';
  v_iter int;
  
begin

    for v_iter in 1..array_length(attendees, 1) loop
        update publ.attendees a
        set email=attendees[v_iter].email
        where a.id=attendees[v_iter].id 
        returning * into v_attendee;
        
        v_attendees := array_append(v_attendees, v_attendee);

        perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', v_attendee.id, 'state','MAJ_INSCRIPTION'));

        perform graphile_worker.add_job('sendMissingEmailPdf', json_build_object('attendeeId', v_attendee.id));

    end loop;
  
  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function update_attendee_email_and_send_email(attendees publ.attendees[]) is E'@arg0variant patch';
grant execute on function update_attendee_email_and_send_email(attendees publ.attendees[]) to :DATABASE_VISITOR;
