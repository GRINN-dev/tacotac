import Link from "next/link";
import { Attendee } from "@/../../@tacotacIO/codegen/dist";
import { HelpCircle, PlusSquare } from "lucide-react";

import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { eventStatusArray } from "@/components/data/status";
import { buttonVariants } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Collection } from "../../../../../../components/table/Collection";
import { CopyToClipboard } from "./CopyToClipboard";
import { ModalStatus } from "./ModalStatus";
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
    { title: "Inscripteur", value: "isInscriptor", type: Type?.string, isSortable: false, isVisible: true },
    { title: "N° Panneau", value: "panelNumber", type: Type.number, isSortable: false, isVisible: true },
    { title: "QrCode", value: "qrCode", type: Type.string, isSortable: false, isVisible: true },
    { title: "Billet", value: "ticket", type: Type.string, isSortable: false, isVisible: true },
    { title: "Details", value: "details", type: Type?.string, isSortable: false, isVisible: true },
  ];

  const flattenedAttendeesFromRegistrations: Attendee[] = eventBySlug?.registrations?.nodes?.reduce(
    (acc, { attendeesList }) => {
      return acc.concat(attendeesList);
    },
    []
  );

  const rawAttendees: IData[] = flattenedAttendeesFromRegistrations?.map(
    ({ id, lastname, firstname, email, status, panelNumber, qrCodeUrl, pdfUrl, isInscriptor }) => ({
      Nom: lastname,
      Prenom: firstname,
      email: email,
      status: (
        <div className="flex items-center justify-center space-x-2">
          <p>{status}</p>
          <HoverCard>
            <HoverCardTrigger>
              <HelpCircle className="h-4 w-4 text-sm" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">{eventStatusArray.find((value) => value.enum === status)?.name}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
      Inscripteur: isInscriptor ? "Oui" : "Non",
      "N° Panneau": panelNumber,
      QrCode: (
        <a className={"underline"} href={qrCodeUrl}>
          Qr Code (pdf)
        </a>
      ),
      Billet: (
        <a className={"underline"} href={pdfUrl}>
          Billet (pdf)
        </a>
      ),
      Details: (
        <Link
          className={buttonVariants({ variant: "outline", size: "sm" })}
          href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/${id}`}
        >
          <PlusSquare className="h-4 w-4 " />
        </Link>
      ),
    })
  );

  return (
    <>
      <section className="container grid w-full items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-row items-center justify-between gap-2">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
            Tous les participants
          </h2>
          <ModalStatus/>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            target="_blank"
            href={`/inscription/${organizationSlug}/${eventSlug}/iframe`}
          >
            iFrame inscription
          </Link>

          <SendAllEmailConfirmDonation eventId={eventBySlug?.id} />
          <SendAllEmail eventId={eventBySlug?.id} />
        </div>
        
        {flattenedAttendeesFromRegistrations?.length > 0 ? (
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
              <PlusSquare className="mr-2 h-4 w-4" /> Ajouter un participant
            </Link>
          </div>
        )}
      </section>
      <div className="container max-w-prose">
        <CopyToClipboard eventSlug={eventSlug} organisationSlug={organizationSlug} />
      </div>
    </>
  );
};

export default AttendeesPage;