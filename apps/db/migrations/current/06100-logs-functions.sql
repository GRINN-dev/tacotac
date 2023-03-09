

drop function if exists publ.data_scan_real_time cascade;
create function publ.data_scan_real_time(event_id uuid) returns publ.logs as $$
declare
    v_data text;
begin
   select * from publ.logs as logs where logs.event_id=event_id;

end;
$$ language plpgsql ;
comment on function data_scan_real_time(event_id uuid) is E'Ensure that we can vizualize all the data from scanning';
grant execute on function publ.data_scan_real_time to :DATABASE_VISITOR;

