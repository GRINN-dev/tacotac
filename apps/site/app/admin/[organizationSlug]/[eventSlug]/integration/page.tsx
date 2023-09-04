import { headers } from "next/headers";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { CopyToClipboard } from "./_components/CopyToClipboard";
import { IFrameViewer } from "./_components/iframe-viewer";

export default async function Page({
  params: { eventSlug, organizationSlug },
}: {
  params: {
    eventSlug: string;
    organizationSlug: string;
  };
}) {
  const headersList = headers();
  console.log("🚀 ~ file: page.tsx:18 ~ headersList:", headersList.get("host"));
  return (
    <section className="container pb-8 pt-6 md:py-10 ">
      <h1 className="admin-h1">Intégrer le formulaire d&apos;inscription</h1>

      <Link className={cn(buttonVariants())} href={`/inscription/${organizationSlug}/${eventSlug}/iframe`}>
        Voir le formulaire d&apos;inscription
      </Link>

      <CopyToClipboard eventSlug={eventSlug} host={headersList.get("host")} organisationSlug={organizationSlug} />

      <IFrameViewer href={`/inscription/${organizationSlug}/${eventSlug}/iframe`} />
    </section>
  );
}
