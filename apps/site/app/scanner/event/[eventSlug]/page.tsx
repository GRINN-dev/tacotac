import Link from "next/link";
import { ArrowBigLeft, Camera, CameraIcon, PlusCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";

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
            <div className="flex flex-col items-center justify-end gap-2 mt-40">
              <Link className={buttonVariants({ size: "sm" })} href={``}>
                <Camera className="mr-2" /> Commencer à scanner
              </Link>
              <Link className={buttonVariants({ size: "sm" })} href={``}>
                Liste des inscrits
              </Link>
              <Link className={buttonVariants({ size: "sm" })} href={``}>
                <PlusCircle className="mr-2" /> Ajouter un participant
              </Link>
            </div>

            <div className="absolute bottom-2">
              <Link href={"/scanner"} className="flex items-center">
                <ArrowBigLeft className="w-10 h-10" /> Retour événements
              </Link>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};
export default EventSlug;
