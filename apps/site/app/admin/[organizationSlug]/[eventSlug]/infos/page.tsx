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
      <section className="container pb-8 pt-6 md:py-10">
        <h1 className="admin-h1">Modifier les informations</h1>

        <UpdateEventForm {...eventBySlug} />
      </section>
    </>
  );
};

export default InfosEventsPage;
