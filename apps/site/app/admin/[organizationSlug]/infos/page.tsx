import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Separator } from "@/components/ui/separator";
import { Members } from "./_components/members";
import { UpdateOrganizationForm } from "./_components/update-form";

const InfosOrganizationPage = async ({ params: { organizationSlug } }) => {
  const data = await sdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { organizationBySlug: organization } = data;

  return (
    <section className="bg-background text-foreground container h-full w-full rounded-t-3xl pt-6 pb-8 md:py-10">
      <h1 className="admin-h1">Mon organisation</h1>
      <h2 className="admin-h2">Modifier les infos principale</h2>

      <UpdateOrganizationForm {...organization} />

      <h2 className="admin-h2 mt-8">Membres</h2>
      <Members organization={organization} />
    </section>
  );
};

export default InfosOrganizationPage;
