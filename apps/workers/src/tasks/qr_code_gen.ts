import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";

import dayjs from "dayjs";
import { generateUrl } from "../utils/uploadFilesWorkers";
import { S3 } from "@aws-sdk/client-s3";
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

function generateBase64Buffer(data: string) {
  const base64Data = Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = data.split(";")[0].split("/")[1];
  const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);

  return { base64Data, type, image_name };
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
  const s3 = new S3({
    endpoint: "https://cellar-c2.services.clever-cloud.com",
    region: "EU",
    credentials: {
      accessKeyId: process.env.BUCKET_KEY!,
      secretAccessKey: process.env.BUCKET_SECRET!,
    },
  });
  // Créer un flux de données à partir de la chaîne de caractères du QR Code

  // a "key" is the name of the file stored into our bucket

  try {
    const { base64Data, type, image_name } =
      generateBase64Buffer(dataUrlQrCode);
    let key = `Qr_Code_${ticketNumber}_${image_name}.${type}`;

    let urlS3QrCode = `https://cellar-c2.services.clever-cloud.com/${process.env.BUCKET_NAME}/${key}`;

    const s3Params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64", // required
      ContentType: `image/${type}`, // required. Notice the back ticks
    };
    await s3.putObject(s3Params, (err: any, data: any) => {
      if (err) {
        console.log("err: ", err.message);
      } else {
        console.log("finalUrl S3: ", urlS3QrCode);
      }
    });
    const { rows } = await withPgClient(pgClient =>
      pgClient.query(
        `update publ.registrations
        set qr_code_url = $1
        where publ.registrations.id = $2;`,
        [urlS3QrCode, registrationId]
      )
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: qr_code_gen.ts:70 ~ constqrCodeGen:Task= ~ error:",
      error
    );
  }

  // return {
  //   url: url.url + process.env.BUCKET_NAME!,
  //   fields: url.fields,
  // };

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
        qrcode: dataUrlQrCode,
        Cancel: "test",
        Current_Year: dayjs(startsAt).format("YYYY"),
      },
    },
  };

  //addJob("sendEmail", { registrationId, sendEmailPayload });
  console.log("🚀 ~ file: qrCodeGen.ts:9 ~ constsayHi:Task= ~ qrcode:", qrCode);
  //!name && addJob("say_hi", { name: "stranger" }); //addJob permet de chainer des jobs : exécuter un job depuis un job en cours d'execution
};

// avec helpers
