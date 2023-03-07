import { sdk } from "@/lib/sdk";
import EventCard from "./eventCard";

const ScanPage = async () => {
  const { events } = await sdk().GetAllEvents();

  return (
    <div className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Événements
      </h1>
      {events.nodes?.map((e, i) => {
        return <EventCard eventName={e?.name} eventDate={e?.startsAt} eventLocation={e?.city} eventPicture={""} />;
      })}
    </div>
  );
};

export default ScanPage;
