import { MailDataRequired } from "@sendgrid/mail";
import { Task } from "graphile-worker";
import { BILLET_TEMPLATE } from "../utils/emailTemplates";
import { generateQRCode } from "../utils/generateQRCode";

interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const qrCodeGen: Task = async (payload, { addJob }) => {
  const { name } = payload as { name?: string };
  console.log("🚀 ~ file: qrCodeGen.ts:5 ~ payload:", payload);
  console.log(`Hi ${name || "Unnamed"}`);
  const qrcode = await generateQRCode(
    JSON.stringify({ name: "Bat", sign_code: "AZE34RT" })
  );
  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: "baptiste.monet@icloud.com",
      from: { name: "L'équipe", email: "baptiste@obole.eu" },
      subject: "hola",
      templateId: BILLET_TEMPLATE,
      dynamicTemplateData: {
        PRENOM_INSCRIT: "Prénom",
        NOM_INSCRIT: "Nom",
        Titre_Evenement: "La nuit du bien commun",
        ID_BILLET: "TICKET-XXXX",
        Jour_Evenement: "29",
        Mois_Evenement: "12",
        AAAA_Evenement: "2023",
        Heure_Debut_Evenement: "20:30",
        Heure_Fin_Evenement: "22:30",
        Nom_Lieu_Evenement: "Théatre",
        Adresse_Evenement: "Lille",
        Detail_Acces_Evenement: "blabla",
      },
    },
  };
  //addJob("sendEmail", sendEmailPayload);
  console.log("🚀 ~ file: qrCodeGen.ts:9 ~ constsayHi:Task= ~ qrcode:", qrcode);
  //!name && addJob("say_hi", { name: "stranger" }); //addJob permet de chainer des jobs : exécuter un job depuis un job en cours d'execution
};

// avec helpers
