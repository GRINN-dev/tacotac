import Link from "next/link";
import { PlusSquare } from "lucide-react";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MyDataTable } from "./_components/data-table";

const EventsPage = async ({ params: { organizationSlug = "all" } }) => {
  const events =
    organizationSlug === "all"
      ? (await serverSdk().GetCurrentUserEvents()).userEvents?.nodes
      : (
          await serverSdk().GetOrganizationBySlug({
            slug: organizationSlug,
          })
        ).organizationBySlug?.events?.nodes;

  return (
    <section className="container pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Tous les évènements</h1>
      <Link className={cn(buttonVariants())} href={`/admin/${organizationSlug}/create`}>
        Créer un évènement
      </Link>

      {events?.length > 0 ? (
        <div className="mt-8 ">
          <MyDataTable data={events} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-start gap-4 ">
          <p>
            Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
          </p>
          <Link
            href={`/admin/${organizationSlug}/create`}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <PlusSquare className="mr-2 h-4 w-4" /> Créer un évènement
          </Link>
        </div>
      )}
    </section>
  );
};

export default EventsPage;
