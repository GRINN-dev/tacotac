import { sdk } from "@/lib/sdk";

const AttendeesPage = async ({ params: { eventSlug } }) => {
  const { events } = await sdk().AttendeesBySlugEvent({
    slug: eventSlug,
  });
  return <div>Liste des participants</div>;
};
export default AttendeesPage;
