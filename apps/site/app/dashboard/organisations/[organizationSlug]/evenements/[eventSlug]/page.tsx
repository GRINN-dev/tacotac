import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Collection } from "../../../../../../components/table/Collection";


const EventPage = async ({
  params: { organizationSlug, eventSlug },
  searchParams: { offset, filter, first, orderBy },
}) => {
  const { eventBySlug } = await sdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  const headerAttendees: IHeader[] = [
    { title: "Nom", value: "lastname", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Prenom", value: "firstname", type: Type?.string, isSortable: false, isVisible: true },
    { title: "email", value: "email", type: Type?.string, isSortable: false, isVisible: true },
    { title: "status", value: "status", type: Type?.string, isSortable: false, isVisible: true },
    { title: "N° Panneau", value: "panelNumber", type: Type.number, isSortable: false, isVisible: true },
    { title: "eventId", value: "eventId", type: Type?.string, isSortable: false, isVisible: false },
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawAttendees: IData[] = eventBySlug?.attendees?.nodes.map(
    ({ id, firstname, lastname, email, status, eventId, panelNumber }) => ({
      Nom: lastname,
      Prenom: firstname,
      email: email,
      status: status,
      "N° Panneau": panelNumber,
      eventId: eventId,
      slug: "/participant/" + id,
    })
  );

  //pour pr
  return (
    <section className="w-full container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les participants
        </h2>
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

export default EventPage;