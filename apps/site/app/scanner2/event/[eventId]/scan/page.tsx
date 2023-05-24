import Link from "next/link";
import { ArrowBigLeft, ArrowLeft, ArrowLeftCircle, List, PlusCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AttendeesModal from "./attendeesModal";
import { ShowCurrentRegistrationAttendee } from "./getData";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });
  return <Scanner event={event} />;
};
export default EventSlug;

/*
if (/Android|iPhone/i.test(navigator.userAgent)) {
  // This checks if the current device is in fact mobile
}
*/
