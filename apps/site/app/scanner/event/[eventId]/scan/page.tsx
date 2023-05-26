import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { Scanner } from "./scanner";

const EventSlug = async ({ params: { eventId } }) => {
  const { event } = await serverSdk().GetEventById({
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
