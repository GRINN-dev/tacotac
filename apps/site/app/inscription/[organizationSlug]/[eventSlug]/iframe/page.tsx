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
    <section className="container grid items-center gap-6 pt-3 pb-8 md:py-4 text-[#1e1d2d] bg-white"
      style={...eventBySlug?.eventBranding?.cssVariables}
    data-theme="light"
    >
      <div className="flex flex-col items-baseline max-w-3xl gap-2 mx-auto">
        <div className="flex items-center">
          <div className="text-3xl font-semibold">{eventBySlug.name}</div>
        </div>
        <CreateAttendeeForm2 event={eventBySlug} />
        
      </div>
    </section>
  );
};

export default CreateAttendeePage;
