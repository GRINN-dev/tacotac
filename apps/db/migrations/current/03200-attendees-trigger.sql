
CREATE OR REPLACE FUNCTION publ.send_webhook_on_update_attendee() RETURNS TRIGGER AS $$
BEGIN
    perform graphile_worker.add_job('sendWebHook', json_build_object('attendeeId', NEW.id, 'state','MAJ_PARTICIPANT'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.send_webhook_on_update_attendee() is
  E'Useful shortcut to send a webhook on insert/update.';

create trigger _100_send_webhook_on_update_attendee_trigger
  before  update on publ.attendees
  for each row
execute procedure publ.send_webhook_on_update_attendee();