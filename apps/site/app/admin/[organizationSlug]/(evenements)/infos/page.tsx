import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";



import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { Members } from "./_components/members";
import { UpdateOrganizationForm } from "./_components/update-form";

const InfosOrganizationPage = async ({ params: { organizationSlug } }) => {
  const data = await serverSdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { organizationBySlug: organization } = data;

  if (!organization) return <h1 className="admin-h1">Oups</h1>;

  return (
    <section className="bg-background text-foreground container h-full w-full rounded-t-3xl pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Mon équipe</h1>
      <h2 className="admin-h2">Modifier les infos principale</h2>

      <UpdateOrganizationForm {...organization} />

      <h2 className="admin-h2 mt-8">Membres</h2>
      <Members organization={organization} />
    </section>
  );
};

export default InfosOrganizationPage;