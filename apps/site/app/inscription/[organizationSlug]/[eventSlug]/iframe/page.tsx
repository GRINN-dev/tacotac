/* eslint-disable @next/next/no-img-element */
import { CreateAttendeeForm2 } from "./form/create-attendee-form";
import { serverSdk } from "@/lib/server-sdk";

const CreateAttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });
console.log(data)
  const { eventBySlug } = data;

  return (
    <section className="container grid items-center gap-6 pt-3 pb-8 md:py-4 text-foreground bg-background"
      style={...eventBySlug?.eventBranding?.cssVariables}
    data-theme="light"
    >
      <div className="flex flex-col items-baseline max-w-3xl gap-2 mx-auto">
        <div className="flex items-center">
          <div className="text-3xl font-semibold">{eventBySlug.name}</div>
          {/* <img src={eventBySlug?.eventBranding?.logo} alt="logo" className="w-32 ml-4 rounded-md h-14" /> */}
        </div>
        {/* {currentDate < eventBySlug.bookingStartsAt ? ( */}
        <CreateAttendeeForm2 event={eventBySlug} />
        {/* ) : (
          <p className="text-red-500">Les inscriptions ne sont pas encore ouvertes pour cet événement.</p>
        )} */}
        {/* TODO à décommenter */}
      </div>
    </section>
  );
};

export default CreateAttendeePage;
