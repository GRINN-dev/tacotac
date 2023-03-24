import dayjs from "dayjs";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { SendEmailPayload } from "./send_email";

export const sendMissingEmailPdf: Task = async (
  payload,
  { addJob, withPgClient }
) => {
  const { attendeeId } = payload as {
    attendeeId: string;
  };
  console.log(
    "🚀 ~ file: send_missing_email_pdf.ts:9 ~ attendeeId:",
    attendeeId
  );
  const { rows } = await withPgClient(pgClient =>
    pgClient.query(
      `SELECT atts.*,evts.id as event_id, evts.name, evts.place_name, 
    evts.address_line_1, evts.starts_at, evts.ends_at, evtsb.header_mail_name, evtsb.header_mail_contact
    FROM publ.attendees atts
    inner join publ.registrations regs on regs.id = atts.registration_id
    inner join publ.events evts on evts.id = regs.event_id
    inner join publ.event_brandings evtsb on evtsb.event_id = evts.id
    WHERE atts.id = $1;`,
      [attendeeId]
    )
  );

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: rows[0].email,
      from: {
        name: rows[0].header_mail_name,
        email: rows[0].header_mail_contact,
      },
      templateId: BILLET_TEMPLATE,
      dynamicTemplateData: {
        Event_Name: rows[0].name,
        First_Name: rows[0].firstname,
        Last_Name: rows[0].lastname,
        Ticket_Number: rows[0].ticket_number,
        String_Day: dayjs(rows[0].starts_at).format("dddd"),
        Day: dayjs(rows[0].starts_at).day(),
        Month: dayjs(rows[0].starts_at).format("MMMM"),
        Year: dayjs(rows[0].starts_at).year(),
        Starts_At: dayjs(rows[0].starts_at).format("HH:mm"),
        Ends_At: dayjs(rows[0].ends_at).format("HH:mm"),
        Place_Name: rows[0].place_name,
        Address: rows[0].address_line_1,
        Detail: rows[0].details,
        Qr_Code_Url: rows[0].qr_code_url,
        Code_Invit: rows[0].sign_code,
        Pdf_Url: rows[0].pdf_url,
        Cancel: "test",
        Current_Year: dayjs().format("YYYY"),
      },
    },
  };

  addJob("sendEmail", {
    attendeeId: rows[0].id,
    sendEmailPayload: sendEmailPayload,
  });
};
