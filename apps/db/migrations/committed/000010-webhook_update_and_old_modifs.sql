--! Previous: sha1:9b3089a31799184e75d87514b88864e214eb4a69
--! Hash: sha1:d8209a6214371d1f3a729b8966f3d233fbd246a2
--! Message: webhook_update_and_old_modifs

--! split: 1-fix-invitation.sql
-- Enter migration here
drop type if exists publ.type_error_code_and_message cascade;
create type publ.type_error_code_and_message as (
  data json,
  error_code text,
  error_message text,
  error_value integer
);

drop function if exists publ.invite_to_organization cascade;
create function publ.invite_to_organization(organization_id uuid, username citext = null, email citext = null, role text = 'HOST')
  returns publ.type_error_code_and_message as $$
declare
  v_code text;
  v_user publ.users;
  v_invite_error publ.type_error_code_and_message;
begin
  -- Initialize the error structure
  v_invite_error.error_code := null;
  v_invite_error.error_message := null;

  -- Are we allowed to add this person
  -- Are we logged in
  if publ.current_user_id() is null then
    v_invite_error.error_code:='LOGIN';
    v_invite_error.error_message:='You must log in to invite a user';
    return v_invite_error;
  end if;

  select * into v_user from publ.users where users.username = invite_to_organization.username;

  -- Are we the owner of this organization
  if not exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = publ.current_user_id()
      and organization_memberships.role in ('OWNER','ADMIN')
  ) then
    v_invite_error.error_code:='DNIED';
    v_invite_error.error_message:='You''re not allowed to invite to this organization';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'You''re not allowed to invite to this organization' using errcode = 'DNIED';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if v_user.id is not null and exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = v_user.id
  ) then
    v_invite_error.error_code:='ISMBR';
    v_invite_error.error_message:='Cannot invite someone who is already a member';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'Cannot invite someone who is already a member' using errcode = 'ISMBR';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if email is not null then
    v_code = encode(gen_random_bytes(7), 'hex');
  end if;

  if v_user.id is not null and not v_user.is_verified then
    v_invite_error.error_code:='VRFY2';
    v_invite_error.error_message:='The user you attempted to invite has not verified their account';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'The user you attempted to invite has not verified their account' using errcode = 'VRFY2';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  if v_user.id is null and email is null then
    v_invite_error.error_code:='NTFND';
    v_invite_error.error_message:='Could not find a person to invite';

    -- Raise an exception and capture it, but continue processing
    BEGIN
      raise exception 'Could not find a person to invite' using errcode = 'NTFND';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;  -- Ignore the exception and continue
    END;

  end if;

  -- Invite the user si pas d'erreur
  IF v_invite_error.error_code IS NULL THEN
    insert into publ.organization_invitations(organization_id, user_id, email, code, role)
     values (invite_to_organization.organization_id, v_user.id, email, v_code, role);
  END IF;

  -- Return the error structure (null if no errors occurred)
  return v_invite_error;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;

--! split: 2-fix_update_trigger_on_branding.sql
create or replace function priv.event_branding__update_with_event() returns trigger as $$
begin

    if (exists (select 1 from publ.event_brandings where event_id = NEW.id)) then
        update publ.event_brandings
        set
            header_mail_name = NEW.name
        where event_id = NEW.id;
    else
          insert into publ.event_brandings(event_id, font, logo, rich_text, short_text,header_mail_name) values(NEW.id,'roboto','https://lille.lanuitdubiencommun.com/lib_YZQWsZJIBnpPHhyU/9co78sidc8k6jjf1.png?w=140','##rich text
   goes  here','short text', NEW.name) ;
    end if;

  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

--! split: 3-send-email-at-correct-time.sql
create or replace function publ.send_email_attendee_event(registration_id uuid) returns publ.row_event_attendee as $$
DECLARE 
  v_registration_id uuid := registration_id;
  v_row publ.row_event_attendee;
  email_payload jsonb;
begin
  
  --on vérifie qu'il n'ypas de participant en cas contraire on remonte une erreur
  if not exists (select atts.id  from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        where atts.registration_id = v_registration_id and atts.status ='IDLE') then
    raise exception 'Pas de participant' using errcode = 'RGNST';
  end if;

     
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
        evts.starts_at AT TIME ZONE 'Europe/Paris',
        evts.ends_at AT TIME ZONE 'Europe/Paris',
        evts.details,
        evtsb.header_mail_name, 
        evtsb.header_mail_contact, 
        evtsb.logo
        from publ.attendees atts
        inner join publ.registrations regs on regs.id = atts.registration_id
        inner join publ.events evts on evts.id = regs.event_id
        inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
        where atts.registration_id = v_registration_id and atts.status ='IDLE'
        into v_row;

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

        perform graphile_worker.add_job('sendEmail', json_build_object('attendeeId',v_row.id, 'sendEmailPayload',email_payload));
     
  return v_row;
end;
$$ language plpgsql VOLATILE SECURITY DEFINER;
comment on function send_email_attendee_event(event_id uuid) is E'Select registration_id to send email to attendee';
grant execute on function publ.send_email_attendee_event(uuid) to :DATABASE_VISITOR;

--! split: 4-send_webhook_update_attendee.sql
drop function if exists priv.send_webhook___update_attendee() cascade;
create function priv.send_webhook___update_attendee() returns trigger as $$
begin
  perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', NEW.id, 'state','MAJ_PARTICIPANT'));
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;



create trigger _500_send_webhook___update_attendee
  after update on publ.attendees
  for each row
  execute procedure priv.send_webhook___update_attendee();
comment on function priv.send_webhook___update_attendee() is E'Ensures that every update attendee send webhook to the client.';
