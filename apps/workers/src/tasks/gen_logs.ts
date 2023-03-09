import { Task } from "graphile-worker";

export const genLogs: Task = async (payload, { addJob, withPgClient }) => {
  const { eventId, isScanning } = payload as {
    eventId: string;
    isScanning: boolean;
  };

  const {
    rows: [{ v_total_registrations }],
  } = await withPgClient(pgClient =>
    pgClient.query(
      `select  count(atts.status) as v_total_registrations from publ.registrations regs 
       inner join publ.attendees atts on regs.id= atts.registration_id
       where atts.status!='CANCELLED' and regs.event_id=$1 group by regs.event_id;`,
      [eventId]
    )
  );

  await withPgClient(pgClient =>
    pgClient.query(
      `update publ.logs set payload = jsonb_set(payload, '{current_total_registrations}', $2) where event_id = $1;`,
      [eventId, v_total_registrations]
    )
  );
  if (isScanning) {
    const {
      rows: [{ v_total_confirmed_registrations }],
    } = await withPgClient(pgClient =>
      pgClient.query(
        `select  count(atts.status) as v_total_confirmed_registrations from publ.registrations regs 
        inner join publ.attendees atts on regs.id= atts.registration_id 
        where atts.status='CONFIRMED' and regs.event_id=$1 group by regs.event_id;`,
        [eventId]
      )
    );

    await withPgClient(pgClient =>
      pgClient.query(
        `update publ.logs 
        set payload = jsonb_set(payload, '{current_confirmed_registrations}',$2) 
        where event_id = $1;`,
        [eventId, v_total_confirmed_registrations]
      )
    );
  }
};
