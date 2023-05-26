import { sdk } from "@/lib/sdk";
import { ImportAttendeesForm } from "./form";

const ImportAttendeesPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await sdk().GetEventBySlug({ eventSlug: eventSlug, organizationSlug: organizationSlug });
  return (
    <>
      <section className="container pb-8 pt-6 md:py-10">
        <h1 className="admin-h1">Importer une liste de participants</h1>

        <ImportAttendeesForm eventSlug={eventSlug} organizationSlug={organizationSlug} {...eventBySlug} />
      </section>
    </>
  );
};

export default ImportAttendeesPage;
