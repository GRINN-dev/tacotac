--! Previous: sha1:320b5a892da57d2a6415c06cb8063f2a1a85fc66
--! Hash: sha1:1b3c44b6610f1292c3e6078494ea9bbef03bb6cd
--! Message: remove_job_from_loop

--! split: 1-current.sql
-- Enter migration here
-- Enter migration here

drop function if exists publ.register_complete_attendees cascade;
create function publ.register_complete_attendees(event_id uuid, complete_attendees publ.complete_attendees[]) returns publ.registrations as $$
declare
  v_registration publ.registrations;
  v_attendee publ.attendees;
  v_iter int;
  v_event publ.events;
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  if v_event is null then
    raise exception 'Event not found' using errcode = 'NTFND';
  end if;

  -- check des registration date de l'event
  if  v_event.booking_starts_at > NOW() and v_event.booking_ends_at < now() then
      raise exception 'Registration is not open' using errcode = 'RGNST';
  end if;



  insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;

  -- loop over each complete_attendee and for every one insert an attendee and then loop over the form fields and insert the values. The first attendee is inscriptor
  for v_iter in 1..array_length(complete_attendees, 1) loop

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
    v_iter = 1,
    complete_attendees[v_iter].attendee.is_vip)
    returning * into v_attendee;

    -- loop over the form fields and insert the values
    for v_iter2 in 1..array_length(complete_attendees[v_iter].attendee_form_fields, 1) loop
      insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
    end loop;


  end loop;
      perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

  return v_registration;
  
end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendees to :DATABASE_VISITOR;

drop function if exists publ.register_complete_attendee_csv cascade;
create function publ.register_complete_attendee_csv(event_id uuid, complete_attendees publ.complete_attendees[], is_forcing boolean = false) returns publ.attendee_import[] as $$
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
        insert into publ.attendee_form_fields (attendee_id, field_id, value) values (v_attendee.id, complete_attendees[v_iter].attendee_form_fields[v_iter2].field_id, complete_attendees[v_iter].attendee_form_fields[v_iter2].value);
      end loop;


    end if;
     
      v_attendees := array_append(v_attendees, v_attendee_imported);  
  end loop;
      perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

  return v_attendees;

end;
$$ language plpgsql volatile SECURITY DEFINER;
grant execute on function publ.register_complete_attendee_csv to :DATABASE_VISITOR;
