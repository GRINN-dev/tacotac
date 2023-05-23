import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { UpdateEventForm } from "./UpdateForm";

const InfosEventsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="mx-auto flex w-full max-w-3xl items-baseline gap-2">
          <Link href={`/admin/${organizationSlug}/evenements/${eventSlug}`}>
            <ArrowBigLeft className="text-primary h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Modifier les informations
          </h1>
        </div>
        <div className="mx-auto flex w-full max-w-3xl items-baseline gap-2">
          <UpdateEventForm {...eventBySlug} />
        </div>
      </section>
    </>
  );
};

export default InfosEventsPage;
