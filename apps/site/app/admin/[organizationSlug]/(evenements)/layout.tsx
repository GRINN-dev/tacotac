import { ScrollArea } from "@/components/ui/scroll-area";
import { AllEventsSidebar } from "./_components/all-events-sidebar";

export default async function Layout({
  params: { organizationSlug },
  children,
}: {
  params: { organizationSlug: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <AllEventsSidebar organizationSlug={organizationSlug} />
      <ScrollArea className="bg-background text-foreground h-full grow rounded-tl-3xl">{children}</ScrollArea>
    </div>
  );
}
