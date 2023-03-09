
/*
  FUNCTION: register_attendees
  DESCRIPTION: Register attendees to event, generate ticket_number, send worker
*/


create or replace function publ.register_attendees(event_id uuid, attendees publ.attendees[]) returns publ.registrations as $$
DECLARE 
  v_registration publ.registrations;
  v_event publ.events;
  v_iter int;
  
begin

    -- select l'event dans v_event
  select * from publ.events where id = event_id into v_event;

  -- check des registration date de l'event
  if  v_event.booking_starts_at <= NOW() and v_event.booking_ends_at >= now() then
      raise exception 'Registration not started yet' using errcode = 'RGNST';
  end if;

  -- creation de la registration et stockage du resultat dans la variable
    insert into publ.registrations (event_id ) values (event_id) returning * into v_registration;


  -- creation des attendees avec une boucle for, le premier attendee créé (le premier du tableau) est l'inscripteur
    for v_iter in 1..array_length(attendees, 1) loop
        insert into publ.attendees (civility, hear_about, zip_code, is_fundraising_generosity_ok, status, registration_id, firstname, lastname, email, phone_number, is_inscriptor, ticket_number, sign_code)
        values (attendees[v_iter].civility, attendees[v_iter].hear_about ,attendees[v_iter].zip_code,attendees[v_iter].is_fundraising_generosity_ok ,attendees[v_iter].status, v_registration.id, attendees[v_iter].firstname, attendees[v_iter].lastname, attendees[v_iter].email, attendees[v_iter].phone_number, v_iter = 1,'TICKET_' || md5(random()::text || clock_timestamp()::text),substring(uuid_generate_v4()::text, 1, 6));
    end loop;
  
    perform graphile_worker.add_job('qrCodeGenPdf', json_build_object('registrationId', v_registration.id));

  return v_registration;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function register_attendees(event_id uuid, attendees publ.attendees[]) is E'@arg1variant patch';
grant execute on function publ.register_attendees(uuid, publ.attendees[]) to :DATABASE_VISITOR;
/*
  END FUNCTION: register_attendees
*/


/*
  FUNCTION: confirmed_attendees
  DESCRIPTION: Confirmed attendees at event, add panel number and email if missing
*/

create or replace function publ.confirmed_scan_attendees( attendees publ.attendees[]) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_iter int;
  
begin

  -- update des attendees avec une boucle for
    for v_iter in 1..array_length(attendees, 1) loop
      update publ.attendees as atts set status = attendees[v_iter].status, email = attendees[v_iter].email, panel_number = attendees[v_iter].panel_number 
      where atts.id=attendees[v_iter].id returning * into v_attendee;
    end loop;

  return v_attendee;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function confirmed_scan_attendees( attendees publ.attendees[]) is E'@arg0variant patch';
grant execute on function publ.confirmed_scan_attendees( publ.attendees[]) to :DATABASE_VISITOR;

/*
  END FUNCTION: confirmed_attendees
*/
