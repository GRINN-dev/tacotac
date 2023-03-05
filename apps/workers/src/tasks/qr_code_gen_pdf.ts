import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";

import dayjs from "dayjs";
import { generateBase64BufferForQrCode, putToS3 } from "../utils/sendToS3";
import { generatePdf, mergePDFBuffers } from "../utils/generatePdf";
require("dayjs/locale/fr");
dayjs.locale("fr");
interface SendEmailPayload {
  mailData: MailDataRequired;
}

interface IPayloadQrCodeGen {
  registrationId: string;
}

interface IRowAttendee {
  id: string;
  civility: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  registration_id: string;
  zip_code: string;
  hear_about: string;
  is_fundraising_generosity_ok: boolean;
  status: string;
  notes: string;
  is_inscriptor: boolean;
  is_vip: boolean;
  is_news_event_email: boolean;
  is_news_fondation_email: boolean;
  panel_number: string;
  ticket_number: string;
  is_email_sent: boolean;
  qr_code_url: string;
  pdf_link: string;
  sign_code: string;
  created_at: string;
  updated_at: string;
  name: string;
  place_name: string;
  address_line_1: string;
  starts_at: string;
  ends_at: string;
  details: string;
}

export const qrCodeGenPdf: Task = async (payload, { addJob, withPgClient }) => {
  const { registrationId } = payload as IPayloadQrCodeGen;
  console.log("🚀 ~ file: qrCodeGen.ts:5 ~ payload:", payload, registrationId);

  const { rows: attendees } = await withPgClient(pgClient =>
    pgClient.query(
      ` SELECT atts.*, evts.name, evts.place_name, 
      evts.address_line_1, evts.starts_at, evts.ends_at
      FROM publ.attendees atts
      inner join publ.registrations regs on regs.id = atts.registration_id
      INNER JOIN publ.events evts ON evts.id = regs.event_id
      WHERE atts.registration_id = $1;`,
      [registrationId]
    )
  );
  const storePdfBufferForMergedOnInscriptor: any = [];

  //on check tous les particpants inscrits pour leur génerer les donées et send email
  for (const row of attendees as IRowAttendee[]) {
    //obligé de faire un for of sinon par exemple un for each alors la promesse all storePdfBufferForMergedOnInscriptor qui vérifie que tous les buffers bdfs ont bien été mis dans un tableau est compléte
    let qrCodeKey: string;
    let urlS3QrCode: string;
    let pdfKey: string;
    let urlS3Pdf: string;
    if (!row.is_inscriptor) {
      const { dataUrlQrCode } = await generateQRCode(
        JSON.stringify({
          ticketNumber: row.ticket_number,
          firstname: row.firstname,
          lastname: row.lastname,
          email: row.email,
          attendeeId: row.id,
          registrationId: registrationId,
        })
      );

      const buffer = await generatePdf(
        `${row.ticket_number}  <img src="${dataUrlQrCode}" >`
      );
      storePdfBufferForMergedOnInscriptor?.push(buffer);
      const { base64Data, type, image_name } =
        await generateBase64BufferForQrCode(dataUrlQrCode);

      qrCodeKey = `Qr_Code_${row.ticket_number}_${image_name}.${type}`;
      urlS3QrCode = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${qrCodeKey}`;

      pdfKey = `PDF_${row.ticket_number}.pdf`;
      urlS3Pdf = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${pdfKey}`;

      await putToS3(qrCodeKey, base64Data, `image/${type}`, "base64");
      await putToS3(pdfKey, buffer, "application/pdf", "identity");

      await withPgClient(pgClient =>
        pgClient.query(
          `update publ.attendees atts set qr_code_url=$2 , pdf_link=$3 where atts.id = $1;`,
          [row.id, urlS3QrCode, urlS3Pdf]
        )
      );

      const sendEmailPayload: SendEmailPayload = {
        mailData: {
          to: row.email,
          from: { name: "L'équipe", email: "contact@obole.eu" },
          templateId: BILLET_TEMPLATE,
          dynamicTemplateData: {
            Event_Name: row.name,
            First_Name: row.firstname,
            Last_Name: row.lastname,
            Ticket_Number: row.ticket_number,
            String_Day: dayjs(row.starts_at).format("dddd"),
            Day: dayjs(row.starts_at).day(),
            Month: dayjs(row.starts_at).format("MMMM"),
            Year: dayjs(row.starts_at).year(),
            Starts_At: dayjs(row.starts_at).format("HH:mm"),
            Ends_At: dayjs(row.ends_at).format("HH:mm"),
            Place_Name: row.place_name,
            Address: row.address_line_1,
            Detail: row.details,
            Qr_Code: urlS3QrCode,
            Code_Invit: row.sign_code,
            Pdf_Link: urlS3Pdf,
            Cancel: "test",
            Current_Year: dayjs(row.starts_at).format("YYYY"),
          },
        },
      };
      if (row?.email) {
        addJob("sendEmail", { attendeeId: row.id, sendEmailPayload });
      }
    }
  }

  const results = await Promise.all(storePdfBufferForMergedOnInscriptor);

  //dans cette condition on vérifie  l'inscripeur et on lui envoie ses données perso plus pdf des pautres particpants si présent
  if (attendees?.at(0).is_inscriptor) {
    const { dataUrlQrCode } = await generateQRCode(
      JSON.stringify({
        ticketNumber: attendees.at(0).ticket_number,
        firstname: attendees.at(0).firstname,
        lastname: attendees.at(0).lastname,
        email: attendees.at(0).email,
        attendeeId: attendees.at(0).id,
        registrationId: registrationId,
      })
    );
    const buffer = await generatePdf(
      `${attendees.at(0).ticket_number}  <img src="${dataUrlQrCode}" >`
    );
    //ici on merged si il y en a via le spreaoperator des pdfs de participant avec le pd de l'inscripteur afin qu'il possede chaque inscription en plus des participants eux-mêmes
    const bufferMerged = await mergePDFBuffers([buffer, ...results]);
    const { base64Data, type, image_name } =
      await generateBase64BufferForQrCode(dataUrlQrCode);

    let qrCodeKeyInscriptor = `Qr_Code_${
      attendees.at(0).ticket_number
    }_${image_name}.${type}`;
    let urlS3QrCodeIsInscriptor = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${qrCodeKeyInscriptor}`;

    let pdfKeyInscriptor = `PDF_${attendees.at(0).ticket_number}.pdf`;
    let urlS3PdfInscriptor = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${pdfKeyInscriptor}`;

    await putToS3(qrCodeKeyInscriptor, base64Data, `image/${type}`, "base64");
    await putToS3(
      pdfKeyInscriptor,
      bufferMerged as Buffer,
      "application/pdf",
      "identity"
    );

    await withPgClient(pgClient =>
      pgClient.query(
        `update publ.attendees atts set qr_code_url=$2 , pdf_link=$3 where atts.id = $1;`,
        [attendees.at(0).id, urlS3QrCodeIsInscriptor, urlS3PdfInscriptor]
      )
    );

    const sendEmailPayload: SendEmailPayload = {
      mailData: {
        to: attendees.at(0).email,
        from: { name: "L'équipe", email: "contact@obole.eu" },
        templateId: BILLET_TEMPLATE,
        dynamicTemplateData: {
          Event_Name: attendees.at(0).name,
          First_Name: attendees.at(0).firstname,
          Last_Name: attendees.at(0).lastname,
          Ticket_Number: attendees.at(0).ticket_number,
          String_Day: dayjs(attendees.at(0).starts_at).format("dddd"),
          Day: dayjs(attendees.at(0).starts_at).day(),
          Month: dayjs(attendees.at(0).starts_at).format("MMMM"),
          Year: dayjs(attendees.at(0).starts_at).year(),
          Starts_At: dayjs(attendees.at(0).starts_at).format("HH:mm"),
          Ends_At: dayjs(attendees.at(0).ends_at).format("HH:mm"),
          Place_Name: attendees.at(0).place_name,
          Address: attendees.at(0).address_line_1,
          Detail: attendees.at(0).details,
          Qr_Code: urlS3QrCodeIsInscriptor,
          Code_Invit: attendees.at(0).sign_code,
          Pdf_Link: urlS3PdfInscriptor,
          Cancel: "test",
          Current_Year: dayjs(attendees.at(0).starts_at).format("YYYY"),
        },
      },
    };

    addJob("sendEmail", { attendeeId: attendees.at(0).id, sendEmailPayload });
  }
};

// avec helpers
