import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Collection } from "../../../../../../components/table/Collection";


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
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const flattenedAttendeesFromRegistrations = eventBySlug?.registrations?.nodes?.reduce((acc, { attendeesList }) => {
    return acc.concat(attendeesList);
  }, []);

  const rawAttendees: IData[] = flattenedAttendeesFromRegistrations?.map(
    ({ id, lastname, firstname, email, status, panelNumber }) => ({
      Nom: lastname,
      Prenom: firstname,
      email: email,
      status: status,
      "N° Panneau": panelNumber,
      slug: "/participant/" + id,
    })
  );
 
  return (
    <section className="container grid w-full items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl items-baseline justify-between gap-2">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
          Tous les participants
        </h2>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          target="_blank"

          href={`/inscription/${organizationSlug}/evenements/${eventSlug}/participant`}
        >
          iFrame inscription
        </Link>
      </div>
      {flattenedAttendeesFromRegistrations.length > 0 ? (
        <Collection
          totalCount={eventBySlug?.registrations?.totalCount}
          pageInfo={eventBySlug?.registrations?.pageInfo}
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

export default AttendeesPage;