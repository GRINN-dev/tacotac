import { sdk } from "@/lib/sdk";

const AttendeesPage = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });

  return <div className="">Attendees de l&apos;événement {event.name}</div>;
};

export default AttendeesPage;
