import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";

import dayjs from "dayjs";
import { generateBase64BufferForQrCode, putToS3 } from "../utils/sendToS3";
import { generatePdf } from "../utils/generatePdf";
require("dayjs/locale/fr");
dayjs.locale("fr");
interface SendEmailPayload {
  mailData: MailDataRequired;
}

interface IPayloadQrCodeGen {
  registrationId: string;
  ticketNumber: string;
  eventId: string;
  attendeeId: string;
  email: string;
  firstname: string;
  lastname: string;
  eventName: string;
  slug: string;
  placeName: string;
  startsAt: string;
  endsAt: string;
  signCode: string;
}

export const qrCodeGen: Task = async (payload, { addJob, withPgClient }) => {
  const {
    registrationId,
    ticketNumber,
    eventId,
    attendeeId,
    email,
    firstname,
    lastname,
    eventName,
    slug,
    placeName,
    startsAt,
    endsAt,
    signCode,
  } = payload as IPayloadQrCodeGen;
  console.log("🚀 ~ file: qrCodeGen.ts:5 ~ payload:", payload);
  const { dataUrlQrCode } = await generateQRCode(
    JSON.stringify({
      ticketNumber: ticketNumber,
      firstname: firstname,
      lastname: lastname,
      email: email,
      attendeeId: attendeeId,
      eventId: eventId,
      registrationId: registrationId,
    })
  );

  let qrCodeKey;
  let urlS3QrCode;
  let pdfKey;
  let urlS3Pdf;
  try {
    const buffer = await generatePdf("test");
    const { base64Data, type, image_name } =
      await generateBase64BufferForQrCode(dataUrlQrCode);

    qrCodeKey = `Qr_Code_${ticketNumber}_${image_name}.${type}`;
    urlS3QrCode = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${qrCodeKey}`;

    pdfKey = `PDF_${ticketNumber}.pdf`;
    urlS3Pdf = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${pdfKey}`;

    await putToS3(qrCodeKey, base64Data, `image/${type}`, "base64");
    await putToS3(pdfKey, buffer, "application/pdf", "identity");
  } catch (error) {
    console.log(
      "🚀 ~ file: qr_code_gen.ts:85 ~ constqrCodeGen:Task= ~ error:",
      error
    );
  }

  const { rows } = await withPgClient(pgClient =>
    pgClient.query(
      `update publ.registrations
        set qr_code_url = $1, pdf_link=$2
        where publ.registrations.id = $3;`,
      [urlS3QrCode, urlS3Pdf, registrationId]
    )
  );

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: email,
      from: { name: "L'équipe", email: "contact@obole.eu" },
      templateId: BILLET_TEMPLATE,
      dynamicTemplateData: {
        Event_Name: eventName,
        First_Name: firstname,
        Last_Name: lastname,
        Ticket_Number: ticketNumber,
        String_Day: dayjs(startsAt).format("dddd"),
        Day: dayjs(startsAt).day(),
        Month: dayjs(startsAt).format("MMMM"),
        Year: dayjs(startsAt).year(),
        Starts_At: dayjs(startsAt).format("HH:mm"),
        Ends_At: dayjs(endsAt).format("HH:mm"),
        Place_Name: placeName,
        Address: "Lille",
        Detail: "blabla",
        Qr_Code: urlS3QrCode,
        Code_Invit: signCode,
        Pdf_Link: urlS3Pdf,
        Cancel: "test",
        Current_Year: dayjs(startsAt).format("YYYY"),
      },
    },
  };

  addJob("sendEmail", { registrationId, sendEmailPayload });
};

// avec helpers
