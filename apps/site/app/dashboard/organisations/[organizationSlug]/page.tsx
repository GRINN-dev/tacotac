import Link from "next/link";
import dayjs from "dayjs";
import { Cog, PlusSquare } from "lucide-react";



import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Collection } from "../../../../components/table/Collection";


const OrganizationPage = async ({ params: { organizationSlug }, searchParams: { offset, filter, first, orderBy } }) => {
  const data = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
    first: Number(first) || initLimit,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
    orderBy: orderBy,
  });

  const { organizationBySlug: organization } = data;

  const headerEvent: IHeader[] = [
    { title: "Nom", value: "name", type: Type?.string, isSortable: false, isVisible: true },
    { title: "Lieu", value: "city", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Début le", value: "startsAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Début inscr.", value: "bookingStartsAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Fin inscr.", value: "bookingEndsAt", type: Type?.date, isSortable: true, isVisible: true },
    { title: "Participants", value: "attendees", type: Type?.date, isSortable: false, isVisible: true },
    { title: "firstSlug", value: "firstSlug", type: Type?.string, isSortable: false, isVisible: false },
    { title: "secondSlug", value: "secondSlug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawEvent: IData[] = organization?.events?.nodes.map(
    ({ name, city, startsAt, bookingStartsAt, bookingEndsAt, attendees, slug }) => ({
      Nom: name,
      Lieu: city,
      "Début le": (
        <div className="flex flex-col">
          <div>{dayjs(startsAt).format("DD/MM/YYYY")}</div>{" "}
          <div>
            {" à "}
            {dayjs(startsAt).format("HH:mm")}
          </div>
        </div>
      ),
      "Début inscr.": dayjs(bookingStartsAt).format("DD/MM/YYYY"),
      "Fin inscr.": dayjs(bookingEndsAt).format("DD/MM/YYYY"),
      Participants: attendees?.nodes?.length,
      firstSlug: organization?.slug,
      secondSlug: slug,
    })
  );
  //pour pr
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {organization?.name}
        </h1>
        <Link
          href={`/dashboard/organisations/${organization?.slug}/infos`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <Cog aria-hidden className="w-8 h-8" />
          <span className="sr-only">Paramètres</span>
        </Link>
      </div>
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les évènements
        </h2>
        <Link
          href={`/dashboard/organizations/${organization?.slug}/create-event`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>
      {organization?.events?.nodes?.length > 0 ? (
        <Collection
          totalCount={organization?.events?.totalCount}
          pageInfo={organization?.events?.pageInfo}
          header={headerEvent}
          data={rawEvent}
          initLimit={initLimit}
          routerPath="/dashboard/evenements"
        />
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p>
            Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
          </p>
          <Link href={`/dashboard/organizations/create-event`} className={buttonVariants({ size: "lg", variant: "outline" })}>
            <PlusSquare className="w-4 h-4 mr-2" /> Créer un évènement
          </Link>
        </div>
      )}
    </section>
  );
};

export default OrganizationPage;