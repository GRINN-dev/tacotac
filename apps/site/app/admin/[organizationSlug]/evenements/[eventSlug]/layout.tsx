import { serverSdk } from "@/lib/server-sdk";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventsSidebar } from "./_components/event-sidebar";

export default async function AttendeesLayout({
  children,
  params: { organizationSlug, eventSlug },
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });
  return (
    <>
      <div className="grid h-full grid-cols-[300px_1fr]">
        <EventsSidebar eventSlug={eventSlug} organizationSlug={organizationSlug} eventId={eventBySlug?.id} />
        <ScrollArea className="h-full">{children}</ScrollArea>
      </div>
    </>
  );
}
