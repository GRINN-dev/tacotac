import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MyDataTable } from "./_components/data-table";
import { ExportCsv } from "./_components/export-csv";
import { SendAllEmail } from "./SendAllEmail";
import { SendAllEmailConfirmDonation } from "./SendAllEmailConfirmDonation";

const EventsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await serverSdk().GetEventBySlug({
    eventSlug,
    organizationSlug,
  });

  return (
    <ScrollArea className="h-full">
      <section className="container pb-8 pt-6 md:py-10">
        <h1 className="admin-h1">Tous les Participants</h1>

        <div className="flex max-w-3xl flex-row items-center gap-2">
          <Link className={cn(buttonVariants())} href={`/admin/${organizationSlug}/${eventSlug}/participants/create`}>
            Ajouter un participant
          </Link>
          <SendAllEmailConfirmDonation eventId={data?.eventBySlug?.id} />
          <SendAllEmail eventId={data?.eventBySlug?.id} />
          <ExportCsv users={data?.eventBySlug?.attendees} name={organizationSlug + "_" + eventSlug} />
        </div>
        <div className="h-8" />
        <MyDataTable
          data={data?.eventBySlug?.attendees?.nodes}
          organizationSlug={organizationSlug}
          eventSlug={eventSlug}
        />
      </section>
    </ScrollArea>
  );
};

export default EventsPage;
