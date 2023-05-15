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
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10 ">
      <div className="mx-auto  w-full max-w-3xl gap-2">
        <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
          Intégrer le formulaire d&apos;inscription
        </h1>

        <Link className={cn(buttonVariants())} href={`/inscription/${organizationSlug}/${eventSlug}/iframe`}>
          Voir le formulaire d&apos;inscription
        </Link>
      </div>
      <div className=" max-w-prose">
        <CopyToClipboard eventSlug={eventSlug} organisationSlug={organizationSlug} />
      </div>
      <IFrameViewer href={`/inscription/${organizationSlug}/${eventSlug}/iframe`} />
    </section>
  );
}
