import { MailDataRequired } from "@sendgrid/mail";

export interface SendEmailPayload {
  mailData: MailDataRequired;
}

export interface IPayloadQrCodeGen {
  registrationId: string;
}

export interface IRowAttendee {
  id: string;
  civility: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  registration_id: string;
  zip_code: string;
  hear_about: string;
  is_fundraising_generosity_ok: boolean;
  status: string;
  notes: string;
  is_inscriptor: boolean;
  is_vip: boolean;
  is_news_event_email: boolean;
  is_news_fondation_email: boolean;
  panel_number: string;
  ticket_number: string;
  is_email_sent: boolean;
  qr_code_url: string;
  pdf_url: string;
  sign_code: string;
  created_at: string;
  updated_at: string;
  event_id: string;
  name: string;
  place_name: string;
  address_line_1: string;
  starts_at: string;
  ends_at: string;
  details: string;
  city: string;
  header_mail_name: string;
  header_mail_contact: string;
  logo: string;
  image_ticket_url: string;
}

export interface CreateTicketPayload {
  ticket: {
    event_name: string;
    logo: string;
    first_name: string;
    last_name: string;
    ticket_number: string;
    string_day: string;
    day: string;
    month: string;
    year: number;
    starts_at: string;
    ends_at: string;
    place_name: string;
    address: string;
    detail: string;
    qr_code_url: string;
    code_invit: string;
    city: string;
  };
}

export interface GeneratePdfFilesPayload {
  pdfData: {
    template: any;
    linked_ressource_id: string;
    document_type: string;
  };
}
