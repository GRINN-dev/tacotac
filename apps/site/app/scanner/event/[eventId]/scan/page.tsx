import Link from "next/link";
import { ArrowBigLeft, List, PlusCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { ShowCurrentRegistrationAttendee } from "./getData";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });
  const organisation = await sdk().GetOrganizationById({ id: event?.organizationId });
  return (
    <div className="">
      <div className="container">
        <h1 className="my-4 text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {event.name}
        </h1>
        <div> {event.description}</div>

        <div>Lieu : {event.city} </div>
        <div>Capacité : {event?.capacity} places</div>
        <ShowCurrentRegistrationAttendee eventId={eventId} />

        <div className="mt-20 flex flex-col items-center justify-end gap-2">
          <Scanner />
        </div>
        <div className="flex flex-col items-center">
          <Link className={buttonVariants({ size: "sm", className: "absolute bottom-10" })} href={``}>
            <List className="mr-2" /> Liste des inscrits
          </Link>
          <Link
            className={buttonVariants({ size: "sm", className: "absolute bottom-24" })}
            href={`/inscription/${organisation?.organization?.slug}/evenements/${event?.slug}/participant`}
          >
            <PlusCircle className="mr-2" /> Ajouter un participant
          </Link>
        </div>

        <div className="absolute bottom-2">
          <Link href={"/scanner"} className="flex items-center">
            <ArrowBigLeft className="h-10 w-10" /> Evénements
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EventSlug;
