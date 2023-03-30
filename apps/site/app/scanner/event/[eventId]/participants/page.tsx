import { sdk } from "@/lib/sdk";

const AttendeesPage = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });

  return (
    <div className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Participants de l&apos;événement {event.name}
      </h1>
      <div>
        {event?.registrations.nodes?.map((registration) => {
          return registration.attendees?.nodes.map((a, i) => {
            return (
              <div key={i}>
                <div>
                  {a.firstname} {a.lastname}
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default AttendeesPage;
