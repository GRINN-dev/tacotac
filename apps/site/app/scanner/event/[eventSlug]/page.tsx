import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";

const EventSlug = async ({ params: { eventSlug } }) => {
  const { events } = await sdk().GetEventByEventSlug({
    eventSlug: eventSlug,
  });
  return (
    <div className="">
      {events?.edges?.map((e, i) => {
        return (
          <div key={i} className="container">
            <h1 className="my-4 text-3xl font-extrabold leading-tight tracking-tighter text-center sm:text-3xl md:text-5xl lg:text-6xl">
              {e.node.name}
            </h1>
            <div> {e?.node?.description}</div>
            <div>à {e?.node?.city}</div>
            <div>Capacité : {e?.node?.capacity}</div>
            <div>Lieu : {e?.node?.placeName} </div>
            <Link href={``}>Liste des inscrits</Link>
            <div className="absolute bottom-2">
              <Link href={"/scanner"} className="flex items-center">
                <ArrowBigLeft className="w-12 h-12" /> Retour événements
              </Link>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};
export default EventSlug;
