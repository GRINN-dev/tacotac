import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { CreateEventForm } from "./form";

const CreateEventPage = async ({ params: { organizationSlug } }) => {
  const { organizationBySlug } = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
  });

  return (
    <section className="container  pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Créer un nouvel événement</h1>
      <div className="mt-8">
        <CreateEventForm organizationId={organizationBySlug?.id} />
      </div>
    </section>
  );
};

export default CreateEventPage;
