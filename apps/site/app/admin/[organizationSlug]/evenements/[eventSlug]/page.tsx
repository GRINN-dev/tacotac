import Link from "next/link";
import { EventsOrderBy } from "@/../../@tacotacIO/codegen/dist";
import { PlusSquare } from "lucide-react";

import { initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ModalStatus } from "./ModalStatus";
import { SendAllEmail } from "./SendAllEmail";
import { SendAllEmailConfirmDonation } from "./SendAllEmailConfirmDonation";
import { MyDataTable } from "./_components/data-table";
import { columns } from "./columns";

const EventsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await sdk().GetEventBySlug({
    eventSlug,
    organizationSlug,
  });

  return (
    <ScrollArea className="h-full">
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="mx-auto  w-full max-w-3xl gap-2">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
            Tous les Participants
          </h2>
          <Link
            className={cn(buttonVariants())}
            href={`/admin/${organizationSlug}/evenements/${eventSlug}/participants/create`}
          >
            Inviter un participant
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-row items-center justify-between gap-2">
          <ModalStatus />

          <SendAllEmailConfirmDonation eventId={data?.eventBySlug?.id} />
          <SendAllEmail eventId={data?.eventBySlug?.id} />
        </div>
        {data?.eventBySlug?.attendees?.nodes?.length > 0 ? (
          <ScrollArea className="mt-8 ">
            <div className="px-8">
              <MyDataTable
                data={data?.eventBySlug?.attendees?.nodes}
                organizationSlug={organizationSlug}
                eventSlug={eventSlug}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Aucun utilisateur n&apos;est inscrit pour le moment <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
          </div>
        )}
      </section>
    </ScrollArea>
  );
};

export default EventsPage;
