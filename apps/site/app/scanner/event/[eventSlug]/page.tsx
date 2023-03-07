import { sdk } from "@/lib/sdk";

const EventSlug = async ({
  params: { organizationSlug, eventSlug },
  searchParams: { offset, filter, first, orderBy },
}) => {
  const { events } = await sdk().GetEventByEventSlug({
    eventSlug: eventSlug,
  });
  return (
    <div className="">
      {events?.edges?.map((e, i) => {
        return (
          <div key={i} className="container">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              {e.node.name}
            </h1>
            <div> {e?.node?.description}</div>
            <div>à {e?.node?.city}</div>
            <div>Capacité : {e?.node?.capacity}</div>
          </div>
        );
      })}{" "}
    </div>
  );
};
export default EventSlug;
