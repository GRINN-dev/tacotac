import { EventsOrderBy } from "@tacotacIO/codegen";

import { serverSdk } from "@/lib/server-sdk";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AllEventsSidebar } from "../_components/all-events-sidebar";
import { EventsCalendar } from "./calendar";

export default async function Page({
  params: { organizationSlug },
  searchParams: { offset = "0", filter = undefined, first = "10", orderBy = undefined },
}) {
  const events =
    organizationSlug === "all"
      ? (await serverSdk().GetCurrentUserEvents()).userEvents?.nodes
      : (
          await serverSdk().GetOrganizationBySlug({
            slug: organizationSlug,
          })
        ).organizationBySlug?.events?.nodes;

  return (
    <section>
      <h1>Calendrier</h1>
      <EventsCalendar events={events} currentUserId={""} organizationSlug={organizationSlug} />
    </section>
  );
}
