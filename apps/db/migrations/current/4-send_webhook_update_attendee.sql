
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
