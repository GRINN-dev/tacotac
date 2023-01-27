import Link from "next/link";
import { Cog, PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";

const EventPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await sdk().GetEventBySlug({ eventSlug, organizationSlug });
  const { eventBySlug: event } = data;
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {event.name}
        </h1>
        <Link
          href={`/organizations/${event.slug}/infos`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <Cog aria-hidden className="h-8 w-8" />
          <span className="sr-only">Paramètres</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-3xl  items-baseline justify-between gap-2">
        <h2 className="mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
          Tous les participants
        </h2>
        <Link
          href={`/organizations/${event.slug}/infos`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="mr-2 h-4 w-4" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="mx-auto mt-4 w-full max-w-3xl">
        {event.attendees?.nodes.length > 0 ? (
          event.attendees?.nodes.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center justify-between border-x  border-b border-slate-300 px-6 py-3 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
            >
              <Link href={`/organizations/${attendee.id}`}>
                {attendee.firstname} {attendee.lastname}
              </Link>

              <Link
                href={`/organizations/${attendee.id}/infos`}
                className={buttonVariants({ variant: "outline" })}
              >
                <PlusSquare className="mr-2 h-4 w-4" /> Infos
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 items-start">
            <p>Vous n&apos;avez pas encore créé d&apos;évènements.</p>
            <Link
              href={`/organizations/${event.slug}/infos`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="mr-2 h-4 w-4" /> Créer un évènement
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPage;
export const dynamic = "force-dynamic";
