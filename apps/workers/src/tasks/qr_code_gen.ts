import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";

import dayjs from "dayjs";
import { generateBase64Buffer, putToS3 } from "../utils/functionDivers";
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
  } = payload as IPayloadQrCodeGen;
  console.log("🚀 ~ file: qrCodeGen.ts:5 ~ payload:", payload);
  const { qrCode, dataUrlQrCode, qrCodeFile } = await generateQRCode(
    JSON.stringify({
      ticketNumber: ticketNumber,
      eventName: eventName,
      email: email,
    })
  );

  // Créer un flux de données à partir de la chaîne de caractères du QR Code

  // a "key" is the name of the file stored into our bucket

  const { base64Data, type, image_name } = generateBase64Buffer(dataUrlQrCode);
  let key = `Qr_Code_${ticketNumber}_${image_name}.${type}`;

  let urlS3QrCode = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${key}`;

  await putToS3(key, base64Data, `image/${type}`);

  const { rows } = await withPgClient(pgClient =>
    pgClient.query(
      `update publ.registrations
        set qr_code_url = $1
        where publ.registrations.id = $2;`,
      [urlS3QrCode, registrationId]
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
        Cancel: "test",
        Current_Year: dayjs(startsAt).format("YYYY"),
      },
    },
  };

  addJob("sendEmail", { registrationId, sendEmailPayload });
  console.log("🚀 ~ file: qrCodeGen.ts:9 ~ constsayHi:Task= ~ qrcode:", qrCode);
  //!name && addJob("say_hi", { name: "stranger" }); //addJob permet de chainer des jobs : exécuter un job depuis un job en cours d'execution
};

// avec helpers
