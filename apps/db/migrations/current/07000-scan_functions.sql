/*
  FUNCTION: scan_attendee
  DESCRIPTION: Confirmed attendees at event, add panel number and email if missing + store logs
*/

drop type if exists publ.ticket_payload; 
create type publ.ticket_payload as ( 
  event_id uuid, 
  attendee_id uuid, 
  ticket_number text, 
  panel_number int, 
  email citext, 
  payload jsonb );

create or replace function publ.scan_attendee(ticket_payload publ.ticket_payload) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_event_id uuid := ticket_payload.event_id;
  v_panel_number int:= ticket_payload.panel_number;--cast ici du typage car il etait impossible d'insérer tu texte de json en typ int dans attendees par exemple 
  v_attendee_id uuid := ticket_payload.attendee_id;--idem que précédent pour type uuid j'ai préféré tout caster afin d'éviter tout probleme futur
BEGIN

      if  ticket_payload.email is null then
        insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

      update publ.attendees as atts set 
          status = CASE 
                      when ticket_payload.ticket_number is not null and v_panel_number is null then 'TICKET_SCAN'
                      when ticket_payload.ticket_number is not null and v_panel_number is not null then 'CONFIRMED'
                      ELSE status
                   END,
          email = ticket_payload.email, 
          panel_number = v_panel_number 
      where atts.id=v_attendee_id and atts.ticket_number=ticket_payload.ticket_number returning * into v_attendee;

      if not found then
          insert into publ.logs (event_id,status,payload) values (
            v_event_id,
            'ERROR',
            jsonb_build_object('ticket_payload',ticket_payload));
      else
          insert into publ.logs (event_id,status,payload) values (
            v_event_id,
             CASE 
               when ticket_payload[v_iter].ticket_number is not null and v_panel_number is null then 'WARNING_PANEL'
               when ticket_payload[v_iter].ticket_number is not null and v_panel_number is not null then 'OK'
             END,
            jsonb_build_object('ticket_payload',ticket_payload));
      end if;

  return v_attendee;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendee(ticket_payload publ.ticket_payload) is E'scan du billet pour update la table attendees et logs';
grant execute on function publ.scan_attendee(ticket_payload publ.ticket_payload) to :DATABASE_VISITOR;

/*
  END FUNCTION: scan_attendee
*/

/*
  FUNCTION: scan_attendees_offline
  DESCRIPTION: Scan all attendees store when offline mode, add panel number and email if missing + store logs
*/

create or replace function publ.scan_attendees_offline(ticket_payloads publ.ticket_payload[]) returns publ.attendees[] as $$
DECLARE 
  v_attendee publ.attendees;
  v_attendees publ.attendees[];
  v_event_id uuid;
  v_panel_number int;
  v_attendee_id uuid;
  v_iter int;
BEGIN

    for v_iter in 1..array_length(ticket_payloads,1) loop
    
        v_event_id  := ticket_payloads[v_iter].event_id;
        v_panel_number := ticket_payloads[v_iter].panel_number;
        v_attendee_id  := ticket_payloads[v_iter].attendee_id;

            if  ticket_payloads[v_iter].email is null then
                insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
            end if;
            
            update publ.attendees as atts set 
                status = CASE 
                            when ticket_payloads[v_iter].ticket_number is not null and v_panel_number is null then 'TICKET_SCAN'
                            when ticket_payloads[v_iter].ticket_number is not null and v_panel_number is not null then 'CONFIRMED'
                            ELSE status
                        END,
                email = ticket_payloads[v_iter].email, 
                panel_number = v_panel_number 
            where atts.id=v_attendee_id and atts.ticket_number=ticket_payloads[v_iter].ticket_number returning * into v_attendee;

            if not found then
                insert into publ.logs (event_id,status,payload) values (
                  v_event_id,
                  'ERROR',
                  jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
            else
                insert into publ.logs (event_id,status,payload) values (
                v_event_id,
                CASE 
                  when ticket_payloads[v_iter].ticket_number is not null and v_panel_number is null then 'WARNING_PANEL'
                  when ticket_payloads[v_iter] ->> 'ticketNumber' is not null and v_panel_number is not null then 'OK'
                END,
                jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));

                v_attendees := array_append(v_attendees, v_attendee);
            end if;
    end loop;
  return v_attendees;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendees_offline(ticket_payloads publ.ticket_payload[]) is E'scan de tous les tickets offline';
grant execute on function publ.scan_attendees_offline(ticket_payloads publ.ticket_payload[]) to :DATABASE_VISITOR;

/*
  END FUNCTION: scan_attendees_offline
*/

/*
  FUNCTION: scan_attendee_by_sign_code
  DESCRIPTION: Scan attendee by sign code and add panel number
*/

create or replace function publ.scan_attendee_by_sign_code(scan_sign_code text,scan_email text, scan_panel_number int) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_ticket_payload publ.ticket_payload;
BEGIN

      select regs.event_id ,atts.id, atts.ticket_number, atts.panel_number, atts.email into v_ticket_payload from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.sign_code=sign_code;

      if  scan_email is null then
        insert into publ.logs (event_id,status,payload) values (v_ticket_payload.event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',v_ticket_payload));
      end if;
      update publ.attendees as atts set 
          status = CASE 
                      when scan_panel_number is null then 'TICKET_SCAN'
                      when scan_panel_number is not null then 'CONFIRMED'
                      ELSE status
                   END,
          email = scan_email, 
          panel_number = scan_panel_number 
      where atts.sign_code=scan_sign_code returning * into v_attendee;

      if not found then
          insert into publ.logs (event_id,status,payload) values (
            v_ticket_payload.event_id,
            'ERROR',
            jsonb_build_object('ticket_payload',v_ticket_payload));
      else
      v_ticket_payload.panel_number=scan_email;
      v_ticket_payload.panel_number=scan_panel_number;
          insert into publ.logs (event_id,status,payload) values (
            v_ticket_payload.event_id,
             CASE 
               when scan_panel_number is null then 'WARNING_PANEL'
               when scan_panel_number is not null then 'OK'
             END,
            jsonb_build_object('ticket_payload',v_ticket_payload));
      end if;

  return v_attendee;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendee_by_sign_code(scan_sign_code text,scan_email text, scan_panel_number int) is E'scan de tous les tickets offline';
grant execute on function publ.scan_attendee_by_sign_code(scan_sign_code text,scan_email text, scan_panel_number int) to :DATABASE_VISITOR;

/*
  END FUNCTION: scan_attendee_by_sign_code
*/