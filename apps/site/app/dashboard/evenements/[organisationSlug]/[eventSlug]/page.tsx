import Link from "next/link";
import { Cog, PlusSquare } from "lucide-react";

import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Collection } from "../../../../../components/table/Collection";

const EventPage = async ({
  params: { organisationSlug, eventSlug },
  searchParams: { offset, filter, first, orderBy },
}) => {
  const { eventBySlug } = await sdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organisationSlug,
  });

  const headerAttendees: IHeader[] = [
    { title: "Nom", value: "Nom", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Prenom", value: "Prénom", type: Type?.string, isSortable: false, isVisible: true },
    { title: "email", value: "email", type: Type?.string, isSortable: false, isVisible: true },
    { title: "status", value: "Status", type: Type?.string, isSortable: false, isVisible: true },
    { title: "eventId", value: "Event-id", type: Type?.string, isSortable: false, isVisible: true },
    { title: "firstSlug", value: "id", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawAttendees: IData[] = eventBySlug?.attendees?.nodes.map(
    ({ id, firstname, lastname, email, status, eventId }) => ({
      Nom: firstname,
      Prenom: lastname,
      email: email,
      status: status,
      eventId: eventId,
      firstSlug: id,
    })
  );

  //pour pr
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {eventBySlug?.name}
        </h1>
        <Link href={`/dashboard/evenements/${eventBySlug?.id}/infos`} className={buttonVariants({ size: "lg", variant: "link" })}>
          <Cog aria-hidden className="w-8 h-8" />
          <span className="sr-only">Paramètres</span>
        </Link>
      </div>
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les évènements
        </h2>
        <Link href={`/evenements/create`} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>
      {eventBySlug?.attendees?.nodes?.length > 0 ? (
        <Collection
          totalCount={eventBySlug?.attendees?.totalCount}
          pageInfo={eventBySlug?.attendees?.pageInfo}
          header={headerAttendees}
          data={rawAttendees}
          initLimit={initLimit}
        />
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p>
            Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
          </p>
          <Link href={`/dashboard/evenements/create`} className={buttonVariants({ size: "lg", variant: "outline" })}>
            <PlusSquare className="w-4 h-4 mr-2" /> Créer un évènement
          </Link>
        </div>
      )}
    </section>
  );
};

export default EventPage;
