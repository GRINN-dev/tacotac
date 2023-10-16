import { Task } from "graphile-worker";
import axios from "axios";
enum stateWebhook {
  RESA_BILLET = "RESA_BILLET",
  MAJ_INSCRIPTION = "MAJ_INSCRIPTION",
  MAJ_PARTICIPANT = "MAJ_PARTICIPANT",
  ANNULATION = "ANNULATION",
}

export const sendWebHook: Task = async (payload, { addJob, withPgClient }) => {
  const { attendeeId, state } = payload as {
    attendeeId: string;
    state: stateWebhook;
  };

  const { rows: attendeeAndEvent } = await withPgClient(pgClient =>
    pgClient.query(
      `select atts.firstname, atts.lastname, atts.panel_number, atts.status, evts.name, evts.webhooks 
          from publ.attendees atts
          inner join publ.registrations regs on regs.id = atts.registration_id
          inner join publ.events evts on evts.id = regs.event_id
          where atts.id = $1;`,
      [attendeeId]
    )
  );
  //test
  attendeeAndEvent[0]?.webhooks?.map(async (webhook: string) => {
    try {
      await axios.post(webhook, {
        state: state,
        firstname: attendeeAndEvent[0].firstname,
        lastname: attendeeAndEvent[0].lastname,
        panel_number: attendeeAndEvent[0].panel_number,
        event_name: attendeeAndEvent[0].name,
        status: attendeeAndEvent[0].status,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: send_webhook.ts:38 ~ attendeeAndEvent[0]?.webhooks?.map ~ error:",
        error?.response?.data
      );
    }
  });
};
