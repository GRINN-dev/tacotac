import { Task } from "graphile-worker";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isDev = process.env.NODE_ENV !== "production";

export interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const sendEmail: Task = async (payload, { addJob, withPgClient }) => {
  console.log(
    "🚀 ~ file: send_email.ts:13 ~ constsendEmail:Task= ~ payload:",
    payload
  );
  const { sendEmailPayload, registrationId } = payload as {
    registrationId: string;
    sendEmailPayload: SendEmailPayload;
  };
  await sgMail
    .send({
      ...sendEmailPayload.mailData,
      mailSettings: { sandboxMode: { enable: false } },
    })
    .then(async (response: any) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      console.log("Email sent successfully");
      const { rows } = await withPgClient(pgClient =>
        pgClient.query(
          `update publ.registrations
          set is_email_sent = true
          where publ.registrations.id = $1;`,
          [registrationId]
        )
      );
    })
    .catch((error: any) => {
      console.error(error);
    });
  if (isDev) {
    console.log(
      sendEmailPayload.mailData.dynamicTemplateData,
      sendEmailPayload.mailData.to
    );
  }
};
