import {
  generateBase64BufferForQrCode,
  putToS3,
} from "../../../utils/sendToS3";
import { generatePdf, mergePDFBuffers } from "../../../utils/generatePdf";
import { generateQRCode } from "../../../utils/generateQRCode";
import { BILLET_TEMPLATE } from "../../../utils/emailTemplates";
import { MailDataRequired } from "@sendgrid/mail";
import dayjs from "dayjs";
import {
  CreateTicketPayload,
  GeneratePdfFilesPayload,
  IRowAttendee,
} from "./type";
import { WithPgClient } from "graphile-worker";
import { createHtmlTemplate } from "../../../utils/createHtmlTemplate";

interface SendEmailPayload {
  mailData: MailDataRequired;
}

export const generateDocsForAttendees = async (
  registrationId: string,
  rowData: IRowAttendee,
  withPgClient: WithPgClient,
  resultsStorePdfBuffer: Buffer[]
): Promise<{
  sendEmailPayload: SendEmailPayload;
  bufferPdf: Buffer;
}> => {
  let bufferPdf: Buffer;
  /*   const { dataUrlQrCode } = await generateQRCode(
    JSON.stringify({
      ticketNumber: rowData.ticket_number,
      firstname: rowData.firstname,
      lastname: rowData.lastname,
      email: rowData.email,
      attendeeId: rowData.id,
      registrationId: registrationId,
      eventId: rowData.event_id,
    })
  ); */
  const { dataUrlQrCode } = await generateQRCode(
    JSON.stringify({
      t_num: rowData.ticket_number,
      name: rowData.firstname,
      email: !!rowData.email,
      event: rowData.event_id,
      vip: rowData.is_vip,
    })
  );

  const reworkedTicket = {
    event_name: rowData.name,
    logo: rowData.logo,
    first_name: rowData.firstname,
    last_name: rowData.lastname,
    ticket_number: rowData.ticket_number,
    string_day: dayjs(rowData.starts_at).format("dddd"),
    day: dayjs(rowData.starts_at).format("DD"),
    month: dayjs(rowData.starts_at).format("MMMM"),
    year: dayjs(rowData.starts_at).year(),
    starts_at: dayjs(rowData.starts_at).format("HH:mm"),
    ends_at: dayjs(rowData.ends_at).format("HH:mm"),
    place_name: rowData.place_name,
    address: rowData.address_line_1,
    detail: rowData.details,
    city: rowData.city,
    qr_code_url: dataUrlQrCode,
    code_invit: rowData.sign_code,
  };

  const generatePdfFilePayload: GeneratePdfFilesPayload = {
    pdfData: {
      template: createHtmlTemplate<CreateTicketPayload>(
        {
          ticket: reworkedTicket,
        },
        "ticket_v1"
      ),
      linked_ressource_id: rowData.ticket_number,
      document_type: "TICKET",
    },
  };

  if (rowData?.is_inscriptor) {
    bufferPdf = await generatePdf(generatePdfFilePayload?.pdfData?.template);

    // on merge les pdfs SI il y a des pdfs issus des participants associés au premier inscris (via e spread operator)
    bufferPdf = (await mergePDFBuffers([
      bufferPdf,
      ...resultsStorePdfBuffer,
    ])) as Buffer;
  } else {
    bufferPdf = await generatePdf(generatePdfFilePayload?.pdfData?.template);
  }

  const { base64Data, type, image_name } = await generateBase64BufferForQrCode(
    dataUrlQrCode
  );

  const qrCodeKey = `Qr_Code_${rowData.ticket_number}_${image_name}.${type}`;
  const urlS3QrCode = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${qrCodeKey}`;

  const pdfKey = `PDF_${rowData.ticket_number}.pdf`;
  const urlS3Pdf = `${process.env.BUCKET_HOST}/${process.env.BUCKET_NAME}/${pdfKey}`;

  await putToS3(qrCodeKey, base64Data, `image/${type}`, "base64");
  await putToS3(pdfKey, bufferPdf, "application/pdf", "identity");

  await withPgClient(pgClient =>
    pgClient.query(
      `update publ.attendees atts set qr_code_url=$2 , pdf_url=$3 where atts.id = $1;`,
      [rowData.id, urlS3QrCode, urlS3Pdf]
    )
  );
  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: rowData.email,
      from: {
        name: rowData.header_mail_name,
        email: rowData.header_mail_contact,
      },
      templateId: BILLET_TEMPLATE,
      dynamicTemplateData: {
        Event_name: rowData.name,
        First_Name: rowData.firstname,
        Last_Name: rowData.lastname,
        Ticket_Number: rowData.ticket_number,
        Logo: rowData.logo,
        String_Day: dayjs(rowData.starts_at).format("dddd"),
        Day: dayjs(rowData.starts_at).format("DD"),
        Month: dayjs(rowData.starts_at).format("MMMM"),
        Year: dayjs(rowData.starts_at).year(),
        Starts_At: dayjs(rowData.starts_at).format("HH:mm"),
        Ends_At: dayjs(rowData.ends_at).format("HH:mm"),
        Place_Name: rowData.place_name,
        Address: rowData.address_line_1,
        Detail: rowData.details,
        Qr_Code_Url: urlS3QrCode,
        Code_Invit: rowData.sign_code,
        Pdf_Url: urlS3Pdf,
        Cancel: "test",
        Current_Year: dayjs().format("YYYY"),
      },
    },
  };

  return { sendEmailPayload, bufferPdf };
};
