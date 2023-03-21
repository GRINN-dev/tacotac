import Link from "next/link";

import { sdk } from "@/lib/sdk";
import EventCard from "./eventCard";

const ScanPage = async () => {
  const { events } = await sdk().GetAllEvents();
  return (
    <div className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Événements
      </h1>

      <div>
        {events.nodes?.map((event, i) => {
          return (
            <Link href={`scanner/event/${event.id}/scan`} key={i}>
              <EventCard {...event} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ScanPage;
