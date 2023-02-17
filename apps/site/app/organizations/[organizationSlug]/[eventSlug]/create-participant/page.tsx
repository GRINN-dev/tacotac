import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { CreateAttendeeForm } from "./form";

const AttendeePage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await sdk().GetAttendeeByEventSlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <Link href={`/organizations/${organizationSlug}`}>
          <ArrowBigLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Créer un nouveau participant
        </h1>
      </div>
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <CreateAttendeeForm eventId={eventBySlug?.id} />
      </div>
    </section>
  );
};

export default AttendeePage;
