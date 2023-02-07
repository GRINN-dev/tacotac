import Link from "next/link";
import dayjs from "dayjs";
import { Cog, PlusSquare } from "lucide-react";

import { IData, IHeader, Type } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";

const EventPage = async ({
  params: { organizationSlug, eventSlug },
  searchParams: { offset, filter, first, orderBy },
}) => {
  const data = await sdk().GetAttendeeByEventSlug({
    eventSlug,
    organizationSlug,
    first: Number(first) || 2,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
    orderBy: orderBy,
  });
  const { eventBySlug: event } = data;

  const headerAttendees: IHeader[] = [
    { title: "Prénom", value: "firstname", type: Type?.string, isSortable: false, isVisible: true },
    { title: "Nom", value: "lastname", type: Type?.string, isSortable: false, isVisible: true },
    { title: "Email", value: "email", type: Type?.date, isSortable: false, isVisible: true },
    { title: "Status", value: "status", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Date", value: "updatedAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawAttendees: IData[] = event?.attendees?.nodes.map((attendee) => ({
    Prénom: attendee?.firstname,
    Nom: attendee?.lastname,
    Email: attendee?.email,
    Status: attendee?.status,
    Date: dayjs(attendee?.updatedAt).format("DD/MM/YYYY"),
    slug: "/participant/" + attendee?.id,
  }));

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {event?.name}
        </h1>
      </div>
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les participants
        </h2>
        <Link
          href={`/organizations/${organizationSlug}/${event?.slug}/create-participant`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {event?.attendees?.nodes.length > 0 ? (
          <Collection
            totalCount={event?.attendees?.totalCount}
            pageInfo={event?.attendees?.pageInfo}
            header={headerAttendees}
            data={rawAttendees}
          />
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Vous n&apos;avez pas encore de participants <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
            <Link
              href={`/organizations/${organizationSlug}/${event?.slug}/create-participant`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="w-4 h-4 mr-2" /> Ajouter un participant
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPage;