import { Task } from "graphile-worker";
import axios from "axios";
enum stateWebhook {
  RESA_BILLET = "RESA_BILLET",
  MAJ_INSCRIPTION = "MAJ_INSCRIPTION",
  MAJ_PARTICIPANT = "MAJ_PARTICIPANT",
  ANNULATION = "ANNULATION",
  SCAN_PARTICIPANT = "SCAN_PARTICIPANT",
}

export const sendWebHook: Task = async (payload, { addJob, withPgClient }) => {
  const { attendeeId, state } = payload as {
    attendeeId: string;
    state: stateWebhook;
  };

  const { rows: attendeeAndEvent } = await withPgClient(pgClient =>
    pgClient.query(
      `select atts.firstname, atts.lastname, atts.email, atts.panel_number, atts.status, evts.name, evts.webhooks, evts.id 
          from publ.attendees atts
          inner join publ.registrations regs on regs.id = atts.registration_id
          inner join publ.events evts on evts.id = regs.event_id
          where atts.id = $1;`,
      [attendeeId]
    )
  );

  const { rows: formFieldsDetails } = await withPgClient(pgClient =>
    pgClient.query(
      `SELECT  ffs.label, unnest(array_agg(DISTINCT affs.value)) AS values
      FROM publ.attendee_form_fields affs
      INNER JOIN publ.form_fields ffs ON ffs.event_id = $1
      WHERE affs.attendee_id = $2  AND affs.field_id = ffs.id
      GROUP BY affs.attendee_id, ffs.label;`,
      [attendeeAndEvent[0].id, attendeeId]
    )
  );
  console.log(
    "🚀 ~ file: send_webhook.ts:38 ~ constsendWebHook:Task= ~ formFieldsDetails:",
    attendeeAndEvent,
    formFieldsDetails.filter(
      formFieldDetail =>
        !["Civilité", "Email", "Nom", "Prénom"].includes(formFieldDetail.label)
    )
  );

  //test
  attendeeAndEvent[0]?.webhooks?.map(async (webhook: string) => {
    try {
      await axios.post(webhook, {
        state:
          attendeeAndEvent[0].status === "CONFIRMED"
            ? stateWebhook.SCAN_PARTICIPANT
            : state,
        firstname: attendeeAndEvent[0].firstname,
        lastname: attendeeAndEvent[0].lastname,
        email: attendeeAndEvent[0].email,
        panel_number: attendeeAndEvent[0].panel_number,
        event_name: attendeeAndEvent[0].name,
        status: attendeeAndEvent[0].status,
        additional_information: formFieldsDetails.filter(
          formFieldDetail =>
            !["Civilité", "Email", "Nom", "Prénom"].includes(
              formFieldDetail.label
            )
        ),
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: send_webhook.ts:38 ~ attendeeAndEvent[0]?.webhooks?.map ~ error:",
        error?.response?.data
      );
    }
  });
};
