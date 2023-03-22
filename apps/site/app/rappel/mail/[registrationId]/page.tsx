import { sdk } from "@/lib/sdk";
import { UpdateAttendeeMailForm } from "./form";

const UpdateAttendeeMailPage = async ({ params: { registrationId } }) => {
  const { attendees } = await sdk().GetAttendeesWithoutMailByRegistrationId({
    registrationId: registrationId,
  });
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl items-baseline gap-2">
        <UpdateAttendeeMailForm {...attendees} />
      </div>
    </section>
  );
};

export default UpdateAttendeeMailPage;
