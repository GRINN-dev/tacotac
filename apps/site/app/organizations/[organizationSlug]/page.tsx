import Link from "next/link";
import {
  GetAllEventsByOrganizationIdQuery,
  GetOrganizationBySlugQuery,
} from "@/../../@tacotacIO/codegen/dist";
import dayjs from "dayjs";
import { Cog, PlusSquare } from "lucide-react";





import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { TableEvent } from "../../../components/table/TableEvent";
import formatData from "../../../components/table/taskTable";

interface iEvent
  extends ExtractArrayType<
    ExtractType<GetAllEventsByOrganizationIdQuery, "events">,
    "nodes"
  > {
  params: any;
}

const OrganizationPage = async ({
  params: { organizationSlug },
  searchParams: { name, first, last, offset },
}) => {
  const limit = 2;
  const data = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
    first: limit,
    offset: Number(offset),
  });

  //erreur Le type 'string' ne satisfait pas la contrainte 'never'. ??!
  //   type EventNode = ExtractType<
  //   ExtractArrayType<
  //     ExtractArrayType<
  //       ExtractType<GetOrganizationBySlugQuery, 'organizationBySlug'>,
  //       'events'
  //     >,
  //     'edges'
  //   >,
  //   'node'
  // >;
  const { organizationBySlug: organization } = data;
  const header = [
    "Nom",
    "Lieu",
    "Commence le",
    "Debut inscription",
    "Fin inscription",
    "Participants",
  ];

  const rawOrga = [
    ...organization?.events?.nodes.map((event) => {
      return {
        Nom: event?.name,
        Lieu: event?.city,
        "Commence le": dayjs(event?.happeningAt).format("DD/MM/YYYY"),
        "Debut inscription": dayjs(event?.bookingStartsAt).format(
          "DD/MM/YYYY"
        ),
        "Fin inscription": dayjs(event?.bookingEndsAt).format(
          "DD/MM/YYYY"
        ),
        Participants: event?.attendees?.nodes?.length,
      };
    }),
  ];

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {organization?.name}
        </h1>
        <Link
          href={`/organizations/${organization?.slug}/infos`}
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
          href={`/organizations/${organization?.slug}/create-event`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>
      <TableEvent
        organization={organization}
        limit={limit}
        {...formatData(header, rawOrga)}
      />
    </section>
  );
};

export default OrganizationPage;