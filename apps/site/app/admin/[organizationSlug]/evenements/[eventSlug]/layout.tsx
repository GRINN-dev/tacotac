import { ScrollArea } from "@/components/ui/scroll-area";
import { EventsSidebar } from "./_components/event-sidebar";

export default function AttendeesLayout({
  children,
  params: { organizationSlug, eventSlug },
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  return (
    <>
      <div className="grid grid-cols-[300px_1fr]">
        <EventsSidebar eventSlug={eventSlug} organizationSlug={organizationSlug} />
        <ScrollArea className="h-full">{children}</ScrollArea>
      </div>
    </>
  );
}
