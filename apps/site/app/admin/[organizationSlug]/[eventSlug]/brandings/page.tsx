import { serverSdk } from "@/lib/server-sdk";
import { Form } from "./form";

const InfosEventsBrandingsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <main className="container  pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Peronnaliser l&apos;événement</h1>

      <Form eventBySlug={eventBySlug} />
    </main>
  );
};

export default InfosEventsBrandingsPage;
