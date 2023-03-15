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
  payload jsonb, 
  sign_code text );

create or replace function publ.scan_attendee(ticket_payload publ.ticket_payload) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_event_id uuid;
  v_ticket_number text;
  v_attendee_id uuid;
  v_attendee_email text;
  v_panel_number int:= ticket_payload.panel_number;--cast ici du typage car il etait impossible d'insérer tu texte de json en typ int dans attendees par exemple 
BEGIN

      if ticket_payload.sign_code is null then
        v_ticket_number:=ticket_payload.ticket_number;
        v_event_id:=ticket_payload.event_id;
        v_attendee_id:=ticket_payload.attendee_id;
        v_attendee_email:=ticket_payload.email;
      else
      --on récupere ici en cas de probleme qr code les infos necessaire de l'attendee via le sign_code
        select regs.event_id, atts.ticket_number, atts.id, atts.email into v_event_id, v_ticket_number,v_attendee_id, v_attendee_email from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.sign_code=ticket_payload.sign_code;
        insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_SIGN_CODE',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

      if  ticket_payload.email is null then
        insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

      update publ.attendees as atts set 
          status = CASE 
                      when v_panel_number is null then 'TICKET_SCAN'
                      when v_panel_number is not null then 'CONFIRMED'
                      ELSE status
                   END,
          email = v_attendee_email, 
          panel_number = v_panel_number 
      where atts.id=v_attendee_id and atts.ticket_number=v_ticket_number returning * into v_attendee;

      if not found then
          insert into publ.logs (event_id,status,payload) values (
            v_event_id,
            'ERROR',
            jsonb_build_object('ticket_payload',ticket_payload));
      else
          insert into publ.logs (event_id,status,payload) values (
            v_event_id,
             CASE 
               when v_panel_number is null then 'WARNING_PANEL'
               when v_panel_number is not null then 'OK'
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
  v_ticket_number text;
  v_attendee_email text;
  v_iter int;
BEGIN

    for v_iter in 1..array_length(ticket_payloads,1) loop
    
            if ticket_payloads[v_iter].sign_code is null then
              v_ticket_number:= ticket_payloads[v_iter].ticket_number;
              v_event_id:= ticket_payloads[v_iter].event_id;
              v_attendee_id:= ticket_payloads[v_iter].attendee_id;
              v_panel_number := ticket_payloads[v_iter].panel_number;
              v_attendee_email:= ticket_payloads[v_iter].email;
            else
            --on récupere ici en cas de probleme qr code les infos necessaire de l'attendee via le sign_code
              select regs.event_id, atts.ticket_number, atts.id, atts.email into v_event_id, v_ticket_number,v_attendee_id, v_attendee_email from publ.attendees atts inner join publ.registrations regs on regs.id=atts.registration_id where atts.sign_code=ticket_payloads[v_iter].sign_code;
              insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_SIGN_CODE',jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
            end if;

            if  ticket_payloads[v_iter].email is null then
                insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
            end if;
            
            update publ.attendees as atts set 
                status = CASE 
                            when v_panel_number is null then 'TICKET_SCAN'
                            when v_panel_number is not null then 'CONFIRMED'
                            ELSE status
                        END,
                email = v_attendee_email, 
                panel_number = v_panel_number 
            where atts.id=v_attendee_id and atts.ticket_number=v_ticket_number returning * into v_attendee;

            if not found then
                insert into publ.logs (event_id,status,payload) values (
                  v_event_id,
                  'ERROR',
                  jsonb_build_object('ticket_payload',ticket_payloads[v_iter],'is_coming_from_offline_mode',true));
            else
                insert into publ.logs (event_id,status,payload) values (
                v_event_id,
                CASE 
                  when v_panel_number is null then 'WARNING_PANEL'
                  when v_panel_number is not null then 'OK'
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



