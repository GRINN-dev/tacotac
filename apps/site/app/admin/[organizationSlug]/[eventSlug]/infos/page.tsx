import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { UpdateEventForm } from "./UpdateForm";
import { UpdateForm } from "./form";

const InfosEventsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <>
      <section className="container pb-8 pt-6 md:py-10">
        {/*
        <UpdateEventForm {...eventBySlug} />
        <div className="h-40" /> */}
        <UpdateForm event={eventBySlug} />
      </section>
    </>
  );
};

export default InfosEventsPage;
