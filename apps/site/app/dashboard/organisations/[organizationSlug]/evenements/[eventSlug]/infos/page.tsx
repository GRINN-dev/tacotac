import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { UpdateEventForm } from "./UpdateForm";

const InfosEventsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await sdk().GetEventBySlug({ eventSlug: eventSlug, organizationSlug: organizationSlug });

  return (
    <>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
          <Link href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}`}>
            <ArrowBigLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Modifier les informations
          </h1>
        </div>
        <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
          <UpdateEventForm {...eventBySlug} />
        </div>
      </section>
    </>
  );
};

export default InfosEventsPage;
