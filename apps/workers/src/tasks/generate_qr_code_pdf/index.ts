import { Task } from "graphile-worker";

import dayjs from "dayjs";
import { generateDocsForAttendees } from "./helpers";
import { IPayloadQrCodeGen, IRowAttendee } from "./helpers/type";
import { EMAIL_MISSING } from "../../utils/emailTemplates";
require("dayjs/locale/fr");
dayjs.locale("fr");

export const qrCodeGenPdf: Task = async (payload, { addJob, withPgClient }) => {
  const { registrationId } = payload as IPayloadQrCodeGen;

  const { rows: attendees } = await withPgClient(pgClient =>
    pgClient.query(
      ` SELECT atts.*,evts.id as event_id, evts.name, evts.place_name, 
      evts.address_line_1, evts.starts_at, evts.ends_at
      FROM publ.attendees atts
      inner join publ.registrations regs on regs.id = atts.registration_id
      INNER JOIN publ.events evts ON evts.id = regs.event_id
      WHERE atts.registration_id = $1;`,
      [registrationId]
    )
  );
  console.log(
    "🚀 ~ file: index.ts:23 ~ constqrCodeGenPdf:Task= ~ attendees:",
    attendees
  );

  const storePdfBufferForMergedOnInscriptor: Buffer[] = [];

  //on check tous les particpants inscrits pour leur génerer les docs et send email
  for (const row of attendees as IRowAttendee[]) {
    //obligé de faire un for of sinon par exemple un for each alors la promesse all storePdfBufferForMergedOnInscriptor qui vérifie que tous les buffers bdfs ont bien été mis dans un tableau est compléte
    if (!row.is_inscriptor) {
      const { sendEmailPayload: sendEmailPayloadNoInscriptor, bufferPdf } =
        await generateDocsForAttendees(registrationId, row, withPgClient, null);
      storePdfBufferForMergedOnInscriptor?.push(bufferPdf);
      if (row?.email) {
        addJob("sendEmail", {
          attendeeId: row.id,
          sendEmailPayload: sendEmailPayloadNoInscriptor,
        });
      } else {
        //essayer de voir pour faire partir ce mail après le mail du ticket
        addJob("sendEmail", {
          attendeeId: row.id,
          sendEmailPayload: {
            mailData: {
              to: attendees.at(0).email,
              from: { name: "L'équipe", email: "contact@obole.eu" },
              templateId: EMAIL_MISSING,
              dynamicTemplateData: {
                First_Name: row.firstname,
                Link_email: `${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/rappel/mail/${row.registration_id}`,
                Current_Year: dayjs(row.starts_at).format("YYYY"),
              },
            },
          },
        });
      }
    }
  }
  const results = await Promise.all(storePdfBufferForMergedOnInscriptor);

  //dans cette condition on gere uniquement le premier inscrit et on lui envoie ses docs plus docs des pautres particpants si présent
  const { sendEmailPayload: sendEmailPayloadInscriptor, bufferPdf } =
    await generateDocsForAttendees(
      registrationId,
      attendees?.at(0),
      withPgClient,
      results
    );

  addJob("sendEmail", {
    attendeeId: attendees.at(0).id,
    sendEmailPayload: sendEmailPayloadInscriptor,
  });
};

// avec helpers
