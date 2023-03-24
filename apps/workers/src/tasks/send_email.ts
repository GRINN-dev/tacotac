import { Task } from "graphile-worker";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isDev = process.env.NODE_ENV !== "production";

export interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const sendEmail: Task = async (payload, { addJob, withPgClient }) => {
  const { sendEmailPayload, attendeeId } = payload as {
    attendeeId: string;
    sendEmailPayload: SendEmailPayload;
  };
  console.log(
    "🚀 ~ file: send_email.ts:17 ~ constsendEmail:Task= ~ attendeeId:",
    attendeeId
  );

  await sgMail
    .send({
      ...sendEmailPayload.mailData,
      mailSettings: { sandboxMode: { enable: isDev } },
    })
    .then(async (response: any) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      console.log("Email sent successfully");
      const { rows } = await withPgClient(pgClient =>
        pgClient.query(
          `update publ.attendees atts
          set is_email_sent = true
          where atts.id = $1;`,
          [attendeeId]
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
