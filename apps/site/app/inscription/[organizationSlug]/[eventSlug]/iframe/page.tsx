/* eslint-disable @next/next/no-img-element */
import { sdk } from "@/lib/sdk";
import { CreateAttendeeForm } from "./form";

const CreateAttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await sdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-baseline gap-2">
        <div className="flex items-center">
          <div className="text-3xl font-semibold">{eventBySlug.name}</div>
          <img src={eventBySlug?.eventBranding?.logo} alt="logo" className="ml-4 h-14 w-32 rounded-md" />
        </div>

        <CreateAttendeeForm {...eventBySlug} />
      </div>
    </section>
  );
};

export default CreateAttendeePage;