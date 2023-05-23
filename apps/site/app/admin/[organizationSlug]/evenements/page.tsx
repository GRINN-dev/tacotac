import Link from "next/link";
import { EventsOrderBy } from "@/../../@tacotacIO/codegen/dist";
import { PlusSquare } from "lucide-react";

import { initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AllEventsSidebar } from "./_components/all-events-sidebar";
import { MyDataTable } from "./_components/data-table";
import { columns } from "./columns";

const EventsPage = async ({
  params: { organizationSlug },
  searchParams: { offset = "0", filter = undefined, first = "2000", orderBy = undefined },
}) => {
  const data = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
    first: Number(first) || initLimit,
    offset: Number(offset),
    ...(filter ? { filter: JSON.parse(filter) } : {}),
    orderBy: (orderBy as EventsOrderBy) || EventsOrderBy.CreatedAtDesc,
  });

  const { organizationBySlug: organization } = data;

  return (
    <div className="grid h-full grid-cols-[300px_1fr]">
      <AllEventsSidebar organizationSlug={organizationSlug} />
      <ScrollArea className="h-full">
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
          <div className="mx-auto  w-full max-w-3xl gap-2">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
              Tous les évènements
            </h2>
            <Link className={cn(buttonVariants())} href={`/admin/${organizationSlug}/evenements/create`}>
              Créer un évènement
            </Link>
          </div>
          {organization?.events?.nodes?.length > 0 ? (
            <ScrollArea className="mt-8 ">
              <div className="px-8">
                <MyDataTable data={organization.events.nodes} />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p>
                Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
              </p>
              <Link
                href={`/admin/${organizationSlug}/evenements/create`}
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                <PlusSquare className="mr-2 h-4 w-4" /> Créer un évènement
              </Link>
            </div>
          )}
        </section>
      </ScrollArea>
    </div>
  );
};

export default EventsPage;
