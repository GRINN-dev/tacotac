import Link from "next/link";
import dayjs from "dayjs";
import { Cog, PlusSquare } from "lucide-react";

import { iData } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { TableEvent } from "../../../components/table/TableEvent";
import formatData from "../../../components/table/taskTable";

const OrganizationPage = async ({ params: { organizationSlug }, searchParams: { offset, filter } }) => {
  const limit = 2;
  const data = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
    first: limit,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
  });

  const { organizationBySlug: organization } = data;
  const header = ["Nom", "Lieu", "Commence le", "Debut inscription", "Fin inscription", "Participants"];

  const rawOrga: iData[] = organization?.events?.nodes.map((event) => ({
    Nom: event?.name,
    Lieu: event?.city,
    "Commence le": dayjs(event?.happeningAt).format("DD/MM/YYYY"),
    "Debut inscription": dayjs(event?.bookingStartsAt).format("DD/MM/YYYY"),
    "Fin inscription": dayjs(event?.bookingEndsAt).format("DD/MM/YYYY"),
    Participants: event?.attendees?.nodes?.length,
  }));

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
      <TableEvent limit={limit} {...organization} {...formatData(header, rawOrga)} />
    </section>
  );
};

export default OrganizationPage;
