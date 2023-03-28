import { sdk } from "@/lib/sdk";
import { CreateAttendeeForm } from "./form";

const CreateAttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await sdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex flex-col items-baseline w-full max-w-3xl gap-2 mx-auto">
        <div className="flex items-center">
          <div className="text-3xl font-semibold">{eventBySlug.name}</div>
          <img src={eventBySlug?.eventBranding?.logo} alt="logo" className="w-32 ml-4 rounded-md h-14" />
        </div>

        <CreateAttendeeForm {...eventBySlug} />
      </div>
    </section>
  );
};

export default CreateAttendeePage;
