import { Task } from "graphile-worker";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Paris");

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
      `select atts.firstname, atts.lastname, atts.email, atts.panel_number, atts.status, 
          atts.created_at, atts.updated_at, atts.is_vip, atts.ticket_number,
          evts.name, evts.webhooks, evts.id 
          from publ.attendees atts
          inner join publ.registrations regs on regs.id = atts.registration_id
          inner join publ.events evts on evts.id = regs.event_id
          where atts.id = $1;`,
      [attendeeId]
    )
  );

  const { rows: formFieldsDetails } = await withPgClient(pgClient =>
    pgClient.query(
      `select ffs.label, unnest(array_agg(distinct affs.value)) as values
        from publ.attendee_form_fields affs
        inner join publ.form_fields ffs ON ffs.event_id = $1
        where affs.attendee_id = $2  AND affs.field_id = ffs.id
        group by affs.attendee_id, ffs.label;`,
      [attendeeAndEvent[0].id, attendeeId]
    )
  );

  const additional_information =
    formFieldsDetails?.length > 4
      ? formFieldsDetails
          .filter(
            formFieldDetail =>
              !["Civilité", "Email", "Nom", "Prénom"].includes(
                formFieldDetail.label
              )
          )
          .reduce((acc, curr) => ({ ...acc, [curr.label]: curr.values }), {})
      : "pas de données supplémentaires";

  console.log(
    "🚀 ~ file: send_webhook.ts:36 ~ constsendWebHook:Task= ~ attendeeAndEvent:",
    attendeeAndEvent[0].email
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
        is_vip: attendeeAndEvent[0].is_vip ? "Oui" : "Non vip",
        ticket_number: attendeeAndEvent[0].ticket_number,
        created_at: dayjs
          .tz(attendeeAndEvent[0].created_at)
          .format("DD-MM-YYYY à HH:mm"),
        updated_at: dayjs
          .tz(attendeeAndEvent[0].updated_at)
          .format("DD-MM-YYYY à HH:mm"),
        ...additional_information,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: send_webhook.ts:38 ~ attendeeAndEvent[0]?.webhooks?.map ~ error:"
        //error?.response?.data
      );
    }
  });
};
