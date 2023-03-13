/*
  FUNCTION: scan_attendee
  DESCRIPTION: Confirmed attendees at event, add panel number and email if missing + store logs
*/

create or replace function publ.scan_attendee(ticket_payload json) returns publ.attendees as $$
DECLARE 
  v_attendee publ.attendees;
  v_event_id uuid := ticket_payload->>'eventId';
  v_panel_number int:= ticket_payload->>'panelNumber';--cast ici du typage car il etait impossible d'insérer tu texte de json en typ int dans attendees par exemple 
  v_attendee_id uuid := ticket_payload->>'attendeeId';--idem que précédent pour type uuid j'ai préféré tout caster afin d'éviter tout probleme futur
BEGIN

--select (ticket_payload->>'eventId')::uuid into v_event_id;
      if  ticket_payload ->> 'email' is null then
        insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

      if  v_panel_number is null then
          insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_PANEL',jsonb_build_object('ticket_payload',ticket_payload));
      end if;
      
      update publ.attendees as atts set 
          status = CASE 
                      when ticket_payload ->> 'ticketNumber' is not null and v_panel_number is null then 'TICKET_SCAN'
                      when ticket_payload ->> 'ticketNumber' is not null and v_panel_number is not null then 'CONFIRMED'
                      ELSE status
                   END,
          email = ticket_payload ->> 'email', 
          panel_number = v_panel_number 
      where atts.id=v_attendee_id and atts.ticket_number=ticket_payload ->> 'ticketNumber' returning * into v_attendee;

      if not found then
          insert into publ.logs (event_id,status,payload) values (v_event_id,'ERROR',jsonb_build_object('ticket_payload',ticket_payload));
      else
          insert into publ.logs (event_id,status,payload) values (v_event_id,'OK',jsonb_build_object('ticket_payload',ticket_payload));
      end if;

  return v_attendee;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendee(ticket_payload json) is E'scan du billet pour update la table attendees et logs';
grant execute on function publ.scan_attendee(ticket_payload json) to :DATABASE_VISITOR;

/*
  END FUNCTION: scan_attendee
*/

/*
  FUNCTION: scan_attendees_offline
  DESCRIPTION: Scan all attendees store when offline mode, add panel number and email if missing + store logs
*/

create or replace function publ.scan_attendees_offline(tickets_payload json[]) returns publ.attendees[] as $$
DECLARE 
  v_attendee publ.attendees;
  v_attendees publ.attendees[] := '{}';
  v_event_id uuid;
  v_panel_number int;
  v_attendee_id uuid;
  v_iter int;
BEGIN

    for v_iter in 1..array_length(tickets_payload,1) loop
    
        v_event_id  := tickets_payload[v_iter]->>'eventId';
        v_panel_number := tickets_payload[v_iter]->>'panelNumber';
        v_attendee_id  := tickets_payload[v_iter]->>'attendeeId';

            if  tickets_payload[v_iter] ->> 'email' is null then
                insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_EMAIL',jsonb_build_object('ticket_payload',tickets_payload[v_iter],'is_coming_from_offline_mode',true));
            end if;

            if  v_panel_number is null then
                insert into publ.logs (event_id,status,payload) values (v_event_id,'WARNING_PANEL',jsonb_build_object('ticket_payload',tickets_payload[v_iter],'is_coming_from_offline_mode',true));
            end if;
            
            update publ.attendees as atts set 
                status = CASE 
                            when tickets_payload[v_iter] ->> 'ticketNumber' is not null and v_panel_number is null then 'TICKET_SCAN'
                            when tickets_payload[v_iter] ->> 'ticketNumber' is not null and v_panel_number is not null then 'CONFIRMED'
                            ELSE status
                        END,
                email = tickets_payload[v_iter] ->> 'email', 
                panel_number = v_panel_number 
            where atts.id=v_attendee_id and atts.ticket_number=tickets_payload[v_iter] ->> 'ticketNumber' returning * into v_attendee;

            if not found then
                insert into publ.logs (event_id,status,payload) values (v_event_id,'ERROR',jsonb_build_object('ticket_payload',tickets_payload[v_iter],'is_coming_from_offline_mode',true));
            else
                insert into publ.logs (event_id,status,payload) values (v_event_id,'OK',jsonb_build_object('ticket_payload',tickets_payload[v_iter],'is_coming_from_offline_mode',true));
                v_attendees := array_append(v_attendees, v_attendee);
            end if;
    end loop;
  return v_attendees;
  
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function scan_attendees_offline(tickets_payload json[]) is E'scan de tous les tickets offline';
grant execute on function publ.scan_attendees_offline(tickets_payload json[]) to :DATABASE_VISITOR;

/*
  END FUNCTION: scan_attendees_offline
*/
