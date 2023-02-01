import Link from "next/link";
import { Cog, PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";

const EventPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await sdk().GetEventBySlug({ eventSlug, organizationSlug });
  const { eventBySlug: event } = data;
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {event?.name}
        </h1>
       
      </div>
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les participants
        </h2>
        <Link
          href={`/organizations/${organizationSlug}/${event?.slug}/create-participant`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {event?.attendees?.nodes.length > 0 ? (
          event?.attendees?.nodes.map((attendee) => (
            <div
              key={attendee?.id}
              className="flex items-center justify-between px-6 py-3 border-b border-x border-slate-300 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
            >
              <Link href={`/organizations/${organizationSlug}/${event?.slug}/participant/${attendee?.id}`}>
                {attendee?.firstname} {attendee?.lastname}
              </Link>

              <Link
                 href={`/organizations/${organizationSlug}/${event?.slug}/participant/${attendee?.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                <PlusSquare className="w-4 h-4 mr-2" /> Infos
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>Vous n&apos;avez pas encore de participants.</p>
            <Link
              href={`/organizations/${organizationSlug}/${event?.slug}/create-participant`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="w-4 h-4 mr-2" /> Ajouter un participant
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPage;
export const dynamic = "force-dynamic";
