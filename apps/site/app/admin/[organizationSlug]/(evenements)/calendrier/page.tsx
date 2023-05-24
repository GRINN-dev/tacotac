import { EventsOrderBy } from "@/../../@tacotacIO/codegen/dist";

import { serverSdk } from "@/lib/server-sdk";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AllEventsSidebar } from "../_components/all-events-sidebar";
import { EventsCalendar } from "./calendar";

export default async function Page({
  params: { organizationSlug },
  searchParams: { offset = "0", filter = undefined, first = "10", orderBy = undefined },
}) {
  const data = await serverSdk().GetOrganizationBySlug({
    slug: organizationSlug,
    first: Number(first),
    offset: Number(offset),
    ...(filter ? { filter: JSON.parse(filter) } : {}),
    orderBy: (orderBy as EventsOrderBy) || EventsOrderBy.CreatedAtDesc,
  });
  return (
    <section>
      <h1>Calendrier</h1>
      <EventsCalendar
        events={data.organizationBySlug.events.nodes}
        currentUserId={""}
        organizationSlug={organizationSlug}
      />
    </section>
  );
}
