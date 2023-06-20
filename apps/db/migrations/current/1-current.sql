-- Enter migration here
drop trigger if exists generate_slug_trigger on publ.organizations;
CREATE TRIGGER generate_slug_trigger
BEFORE INSERT ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();


drop trigger if exists _700_generate_slug_trigger on publ.events;
  create trigger _700_generate_slug_trigger
    before insert on publ.events
    for each row
    execute procedure publ.generate_slug();


drop function if exists publ.users_events cascade;
create function publ.users_events(any_user publ.users) returns setof publ.events as $$
  select * from publ.events where organization_id in (select organization_id from publ.organization_memberships where user_id = any_user.id);
$$ language sql stable security definer;
grant execute on function publ.users_events to :DATABASE_VISITOR;



/* 
create table publ.events (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    slug text,
    description text not null,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    place_name text,
    address_line_1 text,
    address_line_2 text,
    zip_code text,
    city text,
    country text,
    lat float,
    lon float,
    starts_at timestamptz,
    ends_at timestamptz,
    booking_starts_at timestamptz,
    booking_ends_at timestamptz,
    status text references publ.event_status on delete restrict,
    capacity int,
    is_cancelled boolean not null default false,
    details text,
    webhooks text[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    is_draft boolean not null default true,
    constraint events_organization_id_name_key unique (organization_id, name),
    constraint events_organization_id_slug_key unique (organization_id, slug)
);
 */

 -- drop not null constraints on description

alter table publ.events alter column description drop not null;



/*
  FUNCTION: send_email_all_attendee_event
  DESCRIPTION: Send email to all attendee by event
*/

create or replace function publ.send_email_all_attendee_event(event_id uuid) returns publ.row_event_attendee[] as $$
DECLARE 
  v_attendees publ.row_event_attendee[];
  v_iter int;
  v_event_id uuid := event_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where regs.event_id = v_event_id and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

    for v_row in 
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
        evts.starts_at,
        evts.ends_at,
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where regs.event_id = v_event_id and atts.status ='IDLE'
    loop

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

        v_attendees := array_append(v_attendees, v_row);
        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
    end loop;

  return v_attendees;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_all_attendee_event(event_id uuid) is E'Select event to retrieve all attendee and send email to all attendee';
grant execute on function publ.send_email_all_attendee_event(uuid) to :DATABASE_VISITOR;
/*
  END FUNCTION: send_email_all_attendee_event
*/

