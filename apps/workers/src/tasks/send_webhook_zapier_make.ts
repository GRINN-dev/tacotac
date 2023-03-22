import { Task } from "graphile-worker";
import axios from "axios";
enum stateWebhook {
  RESA_BILLET = "RESA_BILLET",
  MAJ_INSCRIPTION = "MAJ_INSCRIPTION",
  MAJ_PARTICIPANT = "MAJ_PARTICIPANT",
  ANNULATION = "ANNULATION",
}

export const sendWebHookZapierMake: Task = async (
  payload,
  { addJob, withPgClient }
) => {
  const { attendeeId, state } = payload as {
    attendeeId: string;
    state: stateWebhook;
  };
  const { rows: attendeeAndEvent } = await withPgClient(pgClient =>
    pgClient.query(
      `select atts.firstname, atts.lastname, atts.panel_number, evts.name, evts.webhooks 
          from publ.attendees atts
          inner join publ.registrations regs on regs.id = atts.registration_id
          inner join publ.events evts on evts.id = regs.event_id
          where atts.id = $1;`,
      [attendeeId]
    )
  );
  console.log(
    "🚀 ~ file: send_webhook_zapier_make.ts:28 ~ attendeeAndEvent:",
    attendeeAndEvent
  );
  attendeeAndEvent[0].webhooks.map(async (webhook: string) => {
    console.log(
      "🚀 ~ file: send_webhook_zapier_make.ts:41 ~ attendeeAndEvent[0].webhooks.map ~ webhook:",
      webhook
    );

    await axios.post(webhook, {
      state: state,
      firstname: attendeeAndEvent[0].firstname,
      lastname: attendeeAndEvent[0].lastname,
      panel_number: attendeeAndEvent[0].panel_number,
      event_name: attendeeAndEvent[0].name,
    });
  });
};
