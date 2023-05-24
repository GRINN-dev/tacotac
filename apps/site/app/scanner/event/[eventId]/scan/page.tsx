import { sdk } from "@/lib/sdk";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });
  return <Scanner event={event} />;
};
export default EventSlug;

/*
if (/Android|iPhone/i.test(navigator.userAgent)) {
  // This checks if the current device is in fact mobile
}
*/
