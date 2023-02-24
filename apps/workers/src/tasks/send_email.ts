import { Task } from "graphile-worker";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const isDev = process.env.NODE_ENV !== "production";

export interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const sendEmail: Task = async payload => {
  const { mailData } = payload as SendEmailPayload;
  await sgMail
    .send({
      ...mailData,
      mailSettings: { sandboxMode: { enable: isDev } },
    })
    .then((response: any) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      console.log("Email sent successfully");
    })
    .catch((error: any) => {
      console.error(error);
    });
  if (isDev) {
    console.log(mailData.subject, mailData.dynamicTemplateData, mailData.to);
  }
};
