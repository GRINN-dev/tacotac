import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { UpdateEventBrandingForm } from "./UpdateForm";
import { ThemeBuilder } from "./_components/theme-builder";

const InfosEventsBrandingsPage = async ({ params: { organizationSlug, eventSlug } }) => {
  const { eventBySlug } = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  return (
    <main className="container  pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Modifier la charte graphique</h1>
      <ThemeBuilder eventBySlug={eventBySlug} />
      <UpdateEventBrandingForm {...eventBySlug?.eventBranding} />
    </main>
  );
};

export default InfosEventsBrandingsPage;
