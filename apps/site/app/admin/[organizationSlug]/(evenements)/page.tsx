import Link from "next/link";
import { PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MyDataTable } from "./_components/data-table";

const EventsPage = async ({ params: { organizationSlug = "all" } }) => {
  const events =
    organizationSlug === "all"
      ? (await sdk().GetAllEvents()).events?.nodes
      : (
          await sdk().GetOrganizationBySlug({
            slug: organizationSlug,
          })
        ).organizationBySlug?.events?.nodes;

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto  max-w-3xl gap-2">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
          Tous les évènements
        </h2>
        <Link className={cn(buttonVariants())} href={`/admin/${organizationSlug}/create`}>
          Créer un évènement
        </Link>
      </div>
      {events?.length > 0 ? (
        <ScrollArea className="mt-8 ">
          <div className="px-8">
            <MyDataTable data={events} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-start gap-4">
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
