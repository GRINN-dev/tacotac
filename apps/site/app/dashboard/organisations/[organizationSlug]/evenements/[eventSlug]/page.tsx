import Link from "next/link";
import { PlusSquare, Send } from "lucide-react";

import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Button, buttonVariants } from "@/components/ui/button";
import { Collection } from "../../../../../../components/table/Collection";
import CopyToClipboard from "./CopyToClipboard";
import { SendAllEmail } from "./SendAllEmail";
import { SendAllEmailConfirmDonation } from "./SendAllEmailConfirmDonation";

const AttendeesPage = async ({
  params: { organizationSlug, eventSlug },
  searchParams: { offset, filter, first, orderBy },
}) => {
  const { eventBySlug } = await sdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
    first: Number(first) || initLimit,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
    orderBy: orderBy,
  });

  const headerAttendees: IHeader[] = [
    { title: "Nom", value: "lastname", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Prenom", value: "firstname", type: Type?.string, isSortable: false, isVisible: true },
    { title: "email", value: "email", type: Type?.string, isSortable: false, isVisible: true },
    { title: "status", value: "status", type: Type?.string, isSortable: false, isVisible: true },
    { title: "N° Panneau", value: "panelNumber", type: Type.number, isSortable: false, isVisible: true },
    { title: "QrCode", value: "qrCode", type: Type.string, isSortable: false, isVisible: true },
    { title: "Billet", value: "ticket", type: Type.string, isSortable: false, isVisible: true },
    { title: "Details", value: "details", type: Type?.string, isSortable: false, isVisible: true },
  ];

  const flattenedAttendeesFromRegistrations = eventBySlug?.registrations?.nodes?.reduce((acc, { attendeesList }) => {
    return acc.concat(attendeesList);
  }, []);

  const rawAttendees: IData[] = flattenedAttendeesFromRegistrations?.map(
    ({ id, lastname, firstname, email, status, panelNumber, qrCodeUrl, pdfUrl }) => ({
      Nom: lastname,
      Prenom: firstname,
      email: email,
      status: status,
      "N° Panneau": panelNumber,
      QrCode: (
        <a className="underline" href={qrCodeUrl} target="_blank" rel="noreferrer">
          {" "}
          Qr Code (pdf)
        </a>
      ),
      Billet: (
        <a className="underline" href={pdfUrl} target="_blank" rel="noreferrer">
          {" "}
          Billet (pdf)
        </a>
      ),
      Details: (
        <Link
          className={buttonVariants({ variant: "outline", size: "sm" })}
          href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/${id}`}
        >
          <PlusSquare className="w-4 h-4 " />
        </Link>
      ),
    })
  );

  return (
    <section className="container grid items-center w-full gap-6 pt-6 pb-8 md:py-10">
      <div className="flex flex-row items-center justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les participants
        </h2>
        <div className="flex flex-col">
          {" "}
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            target="_blank"
            href={`/inscription/${organizationSlug}/evenements/${eventSlug}/participant`}
          >
            iFrame inscription
          </Link>
          <CopyToClipboard />
        </div>

        <SendAllEmailConfirmDonation eventId={eventBySlug?.id} />
        <SendAllEmail eventId={eventBySlug?.id} />
      </div>
      {flattenedAttendeesFromRegistrations.length > 0 ? (
        <Collection
          totalCount={eventBySlug?.registrations?.totalCount}
          pageInfo={eventBySlug?.registrations?.pageInfo}
          header={headerAttendees}
          data={rawAttendees}
          initLimit={initLimit}
          isRedirectStop
        />
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p>
            Vous n&apos;avez pas encore ajouter de participants <u>ou</u> aucun ne correspondant a votre recherche.
          </p>
          <Link
            href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/create`}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <PlusSquare className="w-4 h-4 mr-2" /> Ajouter un participant
          </Link>
        </div>
      )}
    </section>
  );
};

export default AttendeesPage;
