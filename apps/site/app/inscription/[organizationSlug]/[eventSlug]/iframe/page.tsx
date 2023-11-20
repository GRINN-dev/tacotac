/* eslint-disable @next/next/no-img-element */
import { serverSdk } from "@/lib/server-sdk";
import { CreateAttendeeForm2 } from "./form/create-attendee-form";

const CreateAttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const data = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });
  const { eventBySlug } = data;

  return (
    <section
      className="container grid items-center gap-6 bg-white pb-8 pt-3 text-[#1e1d2d] md:py-4"
      style={{ ...eventBySlug?.eventBranding?.cssVariables }}
      data-theme="light"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-baseline gap-2">
        <div className="flex items-center">
          <div className="text-3xl font-semibold">{eventBySlug.name}</div>
        </div>
        <CreateAttendeeForm2 event={eventBySlug} />
      </div>
    </section>
  );
};

export default CreateAttendeePage;
