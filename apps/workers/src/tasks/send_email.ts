import { Task } from "graphile-worker";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isDev = process.env.NODE_ENV !== "production";

export interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const sendEmail: Task = async (payload, { addJob, withPgClient }) => {
  const { sendEmailPayload, attendeeId } = payload as {
    attendeeId?: string;
    sendEmailPayload: SendEmailPayload;
  };
  // console.log(
  //   "🚀 ~ file: send_email.ts:14 ~ constsendEmail:Task= ~ payload:",
  //   sendEmailPayload.mailData
  // );

  console.log("isDev: ", isDev);
  await sgMail
    .send({
      ...sendEmailPayload.mailData,
      mailSettings: { sandboxMode: { enable: isDev } },
    })
    .then(async (response: any) => {
      console.log("sendgrid response status code", response[0].statusCode);
      // attendeeId &&
      //   (await withPgClient(pgClient =>
      //     pgClient.query(
      //       `update publ.attendees atts
      //     set is_email_sent = true
      //     where atts.id = $1;`,
      //       [attendeeId]
      //     )
      //   ));
    })
    .catch((error: any) => {
      console.error("🚀 ~send email error: ", error?.body);
    });
  if (isDev) {
    console.log(
      sendEmailPayload.mailData.dynamicTemplateData,
      sendEmailPayload.mailData.to
    );
  }
};
