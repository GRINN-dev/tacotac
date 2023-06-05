import Link from "next/link";
import { CreateAttendeeForm2 } from "@/app/inscription/[organizationSlug]/[eventSlug]/iframe/form/create-attendee-form";
import { ArrowBigLeft } from "lucide-react";

import { serverSdk } from "@/lib/server-sdk";

const CreateAttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex max-w-3xl items-baseline gap-2">
        <Link href={`/admin/${organizationSlug}/${eventSlug}`}>
          <ArrowBigLeft className="text-primary h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Créer un nouveau participant
        </h1>
      </div>
      {/*   <div className="mx-auto flex max-w-3xl items-baseline gap-2">
        <CreateAttendeeForm {...eventBySlug} />
      </div> */}
      <div className="rounded-3xl border-4 border-dashed p-4">
        <CreateAttendeeForm2 event={eventBySlug} />
      </div>
    </section>
  );
};

export default CreateAttendeePage;
