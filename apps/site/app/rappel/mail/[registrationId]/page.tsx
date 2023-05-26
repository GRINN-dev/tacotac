import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { UpdateAttendeeMailForm } from "./form";

const UpdateAttendeeMailPage = async ({ params: { registrationId } }) => {
  const { attendees } = await serverSdk().GetAttendeesWithoutMailByRegistrationId({
    registrationId: registrationId,
  });
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex max-w-3xl items-baseline gap-2">
        <UpdateAttendeeMailForm {...attendees} />
      </div>
    </section>
  );
};

export default UpdateAttendeeMailPage;
