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
    <>
      {" "}
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Modifier la charte graphique
      </h1>
      <ThemeBuilder eventBySlug={eventBySlug} />
      <UpdateEventBrandingForm {...eventBySlug?.eventBranding} />
    </>
  );
};

export default InfosEventsBrandingsPage;
