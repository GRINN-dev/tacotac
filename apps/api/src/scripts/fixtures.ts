import { Pool } from "pg";
import { faker } from "@faker-js/faker";
enum CivilityStatus {
  /** Madame */
  Mme = "MME",
  /** Monsieur */
  Mr = "MR",
}

enum EventStatus {
  /** Inscription annulée */
  Cancelled = "CANCELLED",
  /** Présence confirmée à l'évenement */
  Confirmed = "CONFIRMED",
  /** En attente */
  Idle = "IDLE",
  /** Panneau scanné */
  PanelScan = "PANEL_SCAN",
  /** Ticket scanné */
  TicketScan = "TICKET_SCAN",
}
type EventInput = {
  addressLine1?: string;
  addressLine2?: string;
  bookingEndsAt?: Date;
  bookingStartsAt?: Date;
  capacity?: number;
  city?: string;
  country?: string;
  createdAt?: Date;
  description: string;
  details?: string;
  endsAt?: Date;
  isDraft?: boolean;
  isCancelled?: boolean;
  lat?: number;
  lon?: number;
  name: string;
  organizationId: string;
  placeName?: string;
  slug?: string;
  startsAt?: Date;
  updatedAt?: Date;
  zipCode?: string;
};

type AttendeeInput = {
  civility: CivilityStatus;
  createdAt?: Date;
  email?: string;
  firstname: string;
  hearAbout?: string;
  id?: string;
  isEmailSent?: boolean;
  isFundraisingGenerosityOk?: boolean;
  isInscriptor?: boolean;
  isNewsEventEmail?: boolean;
  isNewsFondationEmail?: boolean;
  is_vip?: boolean;
  lastname: string;
  notes?: string;
  panelNumber?: number;
  pdfUrl?: string;
  phoneNumber?: string;
  qrCodeUrl?: string;
  registrationId?: string;
  signCode?: string;
  status?: EventStatus;
  ticketNumber?: string;
  updatedAt?: Date;
  zipCode?: string;
};

type RegistrationInput = {
  createdAt?: Date;
  eventId?: string;
  hearAboutList?: string[];
  id?: string;
  updatedAt?: Date;
};

const rootPgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

faker.setLocale("fr");

const createEvent: (eventName: string) => Promise<string> = async eventName => {
  const {
    rows: [row],
  } = await rootPgPool.query(
    `
        insert into publ.events (
            address_line_1,
            address_line_2,
            booking_ends_at,
            booking_starts_at,
            capacity,
            city,
            country,
            created_at,
            description,
            details,
            ends_at,
            is_draft,
            is_cancelled,
            lat,
            lon,
            name,
            organization_id,
            place_name,
            slug,
            starts_at,
            updated_at,
            zip_code
        ) values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19,
            $20, $21, $22
        ) returning id;
        `,
    [
      faker.address.streetAddress(),
      faker.address.secondaryAddress(),
      faker.date.future(),
      faker.date.future(),
      faker.datatype.number(),
      faker.address.city(),
      faker.address.country(),
      faker.date.past(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.date.future(),
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.address.latitude(),
      faker.address.longitude(),
      eventName,
      "881a4dc1-b74f-4e21-9d37-87b83970642f",
      faker.lorem.words(),
      faker.lorem.slug(),
      faker.date.future(),
      faker.date.future(),
      faker.address.zipCode(),
    ]
  );
  return row.id;
};

const createRegistration: (
  eventId: string
) => Promise<string> = async eventId => {
  const {
    rows: [row],
  } = await rootPgPool.query(
    `
        insert into publ.registrations (
            created_at,
            event_id,
            hear_about_list,
            updated_at
        ) values (

            $1, $2, $3, $4
        ) returning id;
        `,
    [
      faker.date.past(),
      eventId,
      [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
      faker.date.future(),
    ]
  );
  return row.id;
};

const createAttendee: (
  registrationId: string,
  isInscriptor: boolean
) => Promise<string> = async (registrationId, isInscriptor) => {
  const {
    rows: [row],
  } = await rootPgPool.query(
    `
        insert into publ.attendees (
            civility,
            created_at,
            email,
            firstname,
            hear_about,
            id,
            is_email_sent,
            is_fundraising_generosity_ok,
            is_inscriptor,
            is_news_event_email,
            is_news_fondation_email,
            is_vip,
            lastname,
            notes,
            panel_number,
            pdf_url,
            phone_number,
            qr_code_url,
            registration_id,
            sign_code,
            status,
            ticket_number,
            updated_at,
            zip_code
        ) values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19,
            $20, $21, $22, $23, $24
        ) returning id;
        `,
    [
      faker.helpers.arrayElement(Object.values(CivilityStatus)),
      faker.date.past(),
      faker.internet.email(),
      faker.name.firstName(),
      faker.lorem.words(),
      faker.datatype.uuid(),
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      isInscriptor,
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.name.lastName(),
      faker.lorem.paragraph(),
      faker.datatype.number(),
      faker.internet.url(),
      faker.phone.number(),
      faker.internet.url(),
      registrationId,
      faker.lorem.slug(),
      faker.helpers.arrayElement(Object.values(EventStatus)),
      faker.datatype.uuid(),
      faker.date.future(),
      faker.address.zipCode(),
    ]
  );
  return row.id;
};

const main = async () => {
  console.log("Creating events...");
  // create 10 events. For each event create between 10 and 2000 registrations and for each registration create between 1 and 4 attendees. The first attendee is the inscriptor.
  const myEvents = [
    "Le Test du Bien Commun",
    "Changer par la Kaypi",
    "Les pépites de Jean-Pierre",
  ];
  for (let i = 0; i < myEvents.length; i++) {
    const eventId = await createEvent(myEvents[i]);
    console.log(`Event ${i + 1} created with id ${eventId}`);
    const numberOfRegistrations = faker.datatype.number({ min: 10, max: 2000 });
    for (let j = 0; j < numberOfRegistrations; j++) {
      const registrationId = await createRegistration(eventId);
      console.log(
        `Registration ${j + 1} created for event ${
          i + 1
        } with id ${registrationId}`
      );
      const numberOfAttendees = faker.datatype.number({ min: 1, max: 4 });
      for (let k = 0; k < numberOfAttendees; k++) {
        const attendeeId = await createAttendee(
          registrationId,
          k === 0 ? true : false
        );
        console.log(
          `Attendee ${k + 1} created for registration ${j + 1} for event ${
            i + 1
          } with id ${attendeeId}`
        );
      }
    }
  }

  return;
};

main();
