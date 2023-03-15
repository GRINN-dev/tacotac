import { useReducer } from "react";
import Link from "next/link";
import { ArrowBigLeft, Camera, CameraIcon, PlusCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });

  return (
    <div className="">
      <div className="container">
        <h1 className="my-4 text-3xl font-extrabold leading-tight tracking-tighter text-center sm:text-3xl md:text-5xl lg:text-6xl">
          {event.name}
        </h1>
        <div> {event.description}</div>

        <div>Lieu : {event.city} </div>
        <div className="flex flex-col items-center justify-end gap-2 mt-40">
          <Scanner />
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
    </div>
  );
};
export default EventSlug;
