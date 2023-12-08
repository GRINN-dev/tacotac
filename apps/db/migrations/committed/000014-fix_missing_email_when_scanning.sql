--! Previous: sha1:5d1f30be85370126d79fd8fc2a6740139049fb57
--! Hash: sha1:be93d924a16406207e1b051647a68bd3c52a2f2e
--! Message: fix_missing_email_when_scanning

--! split: 1-current.sql
-- Enter migration here

create or replace function publ.register_complete_attendee_csv(event_id uuid, complete_attendees publ.complete_attendees[], is_forcing boolean = false) returns publ.attendee_import[] as $$
declare
  v_registration publ.registrations;
  v_attendees publ.attendee_import[];
  v_attendee_imported publ.attendee_import;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin
  
  -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

    if exists (select 1 from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.email = complete_attendees[v_iter].attendee.email and regs.event_id=register_complete_attendee_csv.event_id and not is_forcing ) then

      v_attendee_imported.data:=null;
      v_attendee_imported.error_code:='ALEXT'; --'already exists
      v_attendee_imported.error_message:='Participant existe déjà';
      v_attendee_imported.error_value:=complete_attendees[v_iter].attendee.email;
    
    else 
      insert into publ.registrations (event_id ) values (register_complete_attendee_csv.event_id) returning * into v_registration;

      insert into publ.attendees (
      civility, 
      status, 
      registration_id, 
      firstname, 
      lastname, 
      email, 
      is_inscriptor, 
      is_vip
      ) values( complete_attendees[v_iter].attendee.civility,
      'IDLE', 
      v_registration.id, 
      complete_attendees[v_iter].attendee.firstname, 
      complete_attendees[v_iter].attendee.lastname,
      complete_attendees[v_iter].attendee.email, 
      true,
      complete_attendees[v_iter].attendee.is_vip)
      returning * into v_attendee;

      -- loop over the form fields and insert the values
      for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
        insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, (complete_attendees[v_iter].attendee_form_fields[v_iter2].value)::text);
      end loop;

      perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

    end if;
     
      v_attendees := array_append(v_attendees, v_attendee_imported);  
  end loop;

  return v_attendees;

end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendee_csv to :DATABASE_VISITOR;

--! split: 2-fix_scan_attendee_email.sql
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
                  ELSE att.email
                END
    where ticket_number=payload.ticket_number;
  end if;
  return true;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.scan_attendee to :DATABASE_VISITOR;
