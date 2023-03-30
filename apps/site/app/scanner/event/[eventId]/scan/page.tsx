import Link from "next/link";
import { EventStatus } from "@/../../@tacotacIO/codegen/dist";
import { ArrowBigLeft, List, PlusCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Button, buttonVariants } from "@/components/ui/button";
import AttendeesModal from "./attendeesModal";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });
  const organisation = await sdk().GetOrganizationById({ id: event?.organizationId });
  const attendees = event?.registrations?.nodes?.reduce((acc, { attendeesList }) => {
    return acc.concat(attendeesList);
  }, []);
  return (
    <div className="">
      <div className="container">
        <h1 className="my-4 text-3xl font-extrabold leading-tight tracking-tighter text-center sm:text-3xl md:text-5xl lg:text-6xl">
          {event.name}
        </h1>
        <div> {event.description}</div>

        <div>Lieu : {event.city} </div>
        <div>Capacité : {event?.capacity} places</div>
        <div>
          {" "}
          {event?.totalConfirmedRegistrations} présents / {event?.totalRegistrations} inscrits{" "}
        </div>
        <div className="flex flex-col items-center justify-end gap-2 mt-20">
          <Scanner />
        </div>
        <div className="flex flex-col items-center">
          <Button className={buttonVariants({ size: "sm", className: "absolute bottom-10" })}>
            <List className="mr-2" />{" "}
            <AttendeesModal eventId={event?.id} eventName={event?.name} attendees={attendees} />
          </Button>

          <Link
            className={buttonVariants({ size: "sm", className: "absolute bottom-24" })}
            href={`/inscription/${organisation?.organization?.slug}/evenements/${event?.slug}/participant`}
          >
            <PlusCircle className="mr-2" /> Ajouter un participant
          </Link>
        </div>

        <div className="absolute bottom-2">
          <Link href={"/scanner"} className="flex items-center">
            <ArrowBigLeft className="w-10 h-10" /> Evénements
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EventSlug;
