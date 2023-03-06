import { Task } from "graphile-worker";

import dayjs from "dayjs";
import { generateDataForAttendees } from "./helpers";
import { IPayloadQrCodeGen, IRowAttendee } from "./helpers/type";
require("dayjs/locale/fr");
dayjs.locale("fr");

export const qrCodeGenPdf: Task = async (payload, { addJob, withPgClient }) => {
  const { registrationId } = payload as IPayloadQrCodeGen;
  console.log("🚀 ~ file: qrCodeGen.ts:5 ~ payload:", payload, registrationId);

  const { rows: attendees } = await withPgClient(pgClient =>
    pgClient.query(
      ` SELECT atts.*, evts.name, evts.place_name, 
      evts.address_line_1, evts.starts_at, evts.ends_at
      FROM publ.attendees atts
      inner join publ.registrations regs on regs.id = atts.registration_id
      INNER JOIN publ.events evts ON evts.id = regs.event_id
      WHERE atts.registration_id = $1;`,
      [registrationId]
    )
  );

  const storePdfBufferForMergedOnInscriptor: Buffer[] = [];

  //on check tous les particpants inscrits pour leur génerer les donées et send email
  for (const row of attendees as IRowAttendee[]) {
    //obligé de faire un for of sinon par exemple un for each alors la promesse all storePdfBufferForMergedOnInscriptor qui vérifie que tous les buffers bdfs ont bien été mis dans un tableau est compléte
    if (!row.is_inscriptor) {
      const { sendEmailPayload: sendEmailPayloadNoInscriptor, bufferPdf } =
        await generateDataForAttendees(registrationId, row, withPgClient, null);
      storePdfBufferForMergedOnInscriptor?.push(bufferPdf);
      if (row?.email) {
        addJob("sendEmail", {
          attendeeId: row.id,
          sendEmailPayload: sendEmailPayloadNoInscriptor,
        });
      }
    }
  }
  const results = await Promise.all(storePdfBufferForMergedOnInscriptor);
  console.log(
    "🚀 ~ file: index.ts:43 ~ constqrCodeGenPdf:Task= ~ results:",
    results
  );

  if (attendees?.at(0).is_inscriptor) {
    //dans cette condition on vérifie  l'inscripeur et on lui envoie ses données perso plus pdf des pautres particpants si présent
    const { sendEmailPayload: sendEmailPayloadInscriptor, bufferPdf } =
      await generateDataForAttendees(
        registrationId,
        attendees?.at(0),
        withPgClient,
        results
      );

    addJob("sendEmail", {
      attendeeId: attendees.at(0).id,
      sendEmailPayload: sendEmailPayloadInscriptor,
    });
  }
};

// avec helpers
