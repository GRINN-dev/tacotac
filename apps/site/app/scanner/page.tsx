import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { ArrowLeft, PartyPopper } from "lucide-react";



import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ScanPage = async () => {
  const { currentUser } = await serverSdk().GetCurrentUser();
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  let isMobileView = userAgent!.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  if (!currentUser) {
    redirect("/login");
  }

  const eventsSorted = currentUser.events?.nodes?.sort((a, b) => dayjs(a.startsAt).diff(dayjs(b.startsAt)) || 0);
  const returnCondition =
    currentUser.events?.nodes?.length > 0 ? `/${currentUser.events?.nodes[0]?.organization?.slug}` : "/all";

  return (
    <ScrollArea className="container grid h-full items-center gap-6 ">
      <div className="flex flex-row items-center  space-x-4">
        {!isMobileView && (
          <Link
            href={"/admin" + returnCondition}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" })) + "  mt-10 "}
          >
            <ArrowLeft className="mr-2  h-4 w-4 " />
          </Link>
        )}
        <h1 className="text-primary mt-10 text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Événements
        </h1>
      </div>

      <div className="grid gap-4 pb-8 sm:grid-cols-2 md:grid-cols-3">
        {eventsSorted.length > 0 ? (
          eventsSorted?.map((event, i) => (
            <Link href={`scanner/event/${event.id}/scan`} key={i}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{event.organization.name}</CardTitle>
                  <PartyPopper className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{event.name}</div>
                  <p className="text-muted-foreground text-xs">
                    Le {dayjs(event.startsAt).format("DD/MM/YYYY")} à {event.city}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="ml-16 mt-4">{"Vous n'avez pas d'événement à venir"}</div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ScanPage;