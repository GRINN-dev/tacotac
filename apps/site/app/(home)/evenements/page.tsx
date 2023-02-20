import Link from "next/link";
import dayjs from "dayjs";
import { PlusSquare } from "lucide-react";

import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";

const EventsPage = async ({ searchParams: { offset, filter, first, orderBy } }) => {
  const { events } = await sdk().GetAllEvents();

  const headerEvent: IHeader[] = [
    { title: "Nom", value: "name", type: Type?.string, isSortable: false, isVisible: true },
    { title: "Lieu", value: "city", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Début le", value: "happeningAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Début inscr.", value: "bookingStartsAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Fin inscr.", value: "bookingEndsAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Participants", value: "attendees", type: Type?.date, isSortable: false, isVisible: true },
    { title: "Organisations", value: "organisations", type: Type?.date, isSortable: false, isVisible: true },
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawEvent: IData[] = events?.nodes.map(
    ({ id, name, city, happeningAt, bookingStartsAt, bookingEndsAt, attendees, slug, organizationId }) => ({
      Nom: name,
      Lieu: city,
      "Début le": (
        <div className="flex flex-col">
          <div>{dayjs(happeningAt).format("DD/MM/YYYY")}</div>{" "}
          <div>
            {" à "}
            {dayjs(happeningAt).format("HH:mm")}
          </div>
        </div>
      ),
      "Début inscr.": dayjs(bookingStartsAt).format("DD/MM/YYYY"),
      "Fin inscr.": dayjs(bookingEndsAt).format("DD/MM/YYYY"),
      Participants: attendees?.nodes?.length,
      organisations: organizationId,
      slug: id,
    })
  );

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Tous les événements
        </h1>
        <Link href={"/evenements/create"} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {events?.nodes?.length > 0 ? (
          <Collection
            totalCount={events?.totalCount}
            pageInfo={events?.pageInfo}
            header={headerEvent}
            data={rawEvent}
            initLimit={initLimit}
          />
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Vous n&apos;avez pas encore créé d&apos;organisation <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
            <Link href={`/evenements/create`} className={buttonVariants({ size: "lg", variant: "outline" })}>
              <PlusSquare className="w-4 h-4 mr-2" /> Créer une organisation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;
