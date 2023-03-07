import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sdk } from "@/lib/sdk";
import EventCard from "./eventCard";

const ScanPage = async () => {
  const { events } = await sdk().GetAllEvents();
  return (
    <div className="container grid items-center gap-6 pt-6 pb-8 transition-opacity duration-500 bg-gray-100 opacity-100 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Événements
      </h1>

      <div>
        {events.nodes?.map((e, i) => {
          return (
            <Link href={`scanner/event/${e.slug}`}>
              <EventCard
                eventName={e?.name}
                eventDate={e?.startsAt}
                eventLocation={e?.city}
                eventSlug={e?.slug}
                eventPicture={""}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ScanPage;
