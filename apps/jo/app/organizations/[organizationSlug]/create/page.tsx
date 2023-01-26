import Link from "next/link";
import { ArrowBigLeft, CogIcon, PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { CreateEventForm } from "./form";

const OrganizationPage = async ({ params: { organizationSlug } }) => {
  const { organizationBySlug } = await sdk().GetOrganizationBySlug({
    slug: organizationSlug,
  });
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <Link href={`/organizations/${organizationSlug}`}>
          <ArrowBigLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Créer un nouvel événement
        </h1>
      </div>
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <CreateEventForm organizationId={organizationBySlug.id} />
      </div>
    </section>
  );
};

export default OrganizationPage;
