import Link from "next/link";
import dayjs from "dayjs";
import { PartyPopper } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ScanPage = async () => {
  const { events } = await serverSdk().GetAllEvents();
  return (
    <ScrollArea className="container grid h-full items-center gap-6 ">
      <h1 className="text-primary mt-10 text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Événements
      </h1>

      <div className="grid gap-4 pb-8 sm:grid-cols-2 md:grid-cols-3">
        {events.nodes?.map((event, i) => (
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
        ))}
      </div>
    </ScrollArea>
  );
};

export default ScanPage;
