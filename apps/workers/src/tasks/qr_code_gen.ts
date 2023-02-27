import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";
import dayjs from "dayjs";
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
  const qrcode = await generateQRCode(
    JSON.stringify({
      ticketNumber: ticketNumber,
      eventName: eventName,
      email: email,
    })
  );

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: email,
      from: { name: "L'équipe", email: "baptiste@obole.eu" },
      subject: `${firstname} votre confirmation d'inscription à ${eventName}`,
      templateId: BILLET_TEMPLATE,
      dynamicTemplateData: {
        PRENOM_INSCRIT: firstname,
        NOM_INSCRIT: lastname,
        Titre_Evenement: eventName,
        ID_BILLET: ticketNumber,
        Jour_Text_Evenement: dayjs(startsAt).format("dddd"),
        Jour_Evenement: dayjs(startsAt).day(),
        Mois_Evenement: dayjs(startsAt).format("MMMM"),
        AAAA_Evenement: dayjs(startsAt).year(),
        Heure_Debut_Evenement: dayjs(startsAt).format("HH:mm"),
        Heure_Fin_Evenement: dayjs(endsAt).format("HH:mm"),
        Nom_Lieu_Evenement: placeName,
        Adresse_Evenement: "Lille",
        Detail_Acces_Evenement: "blabla",
      },
    },
  };
  console.log(
    "🚀 ~ file: qr_code_gen.ts:64 ~ constqrCodeGen:Task= ~ sendEmailPayload:",
    sendEmailPayload
  );
  //addJob("sendEmail", sendEmailPayload);
  console.log("🚀 ~ file: qrCodeGen.ts:9 ~ constsayHi:Task= ~ qrcode:", qrcode);
  //!name && addJob("say_hi", { name: "stranger" }); //addJob permet de chainer des jobs : exécuter un job depuis un job en cours d'execution
};

// avec helpers
