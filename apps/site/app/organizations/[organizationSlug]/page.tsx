import { FC } from "react";
import Link from "next/link";
import { GetAllEventsByOrganizationIdQuery } from "@/../../@tacotacIO/codegen/dist";
import { Cog, PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";

interface iEvent
  extends ExtractArrayType<
    ExtractType<GetAllEventsByOrganizationIdQuery, "events">,
    "nodes"
  > {
  params: any;
}

const OrganizationPage = async ({ params: { organizationSlug } }) => {
  const data = await sdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { organizationBySlug: organization } = data;
  //const myEvent:iEvent={description:"",name:""}

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {organization.name}
        </h1>
        <Link
          href={`/organizations/${organization.slug}/infos`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <Cog aria-hidden className="w-8 h-8" />
          <span className="sr-only">Paramètres</span>
        </Link>
      </div>
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0 ">
          Tous les évènements
        </h2>
        <Link
          href={`/organizations/${organization.slug}/create`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {organization.events?.nodes.length > 0 ? (
          organization.events?.nodes.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between px-6 py-3 border-b border-x border-slate-300 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
            >
              <Link href={`/organizations/${event.slug}`}>{event.name}</Link>

              <Link
                href={`/organizations/${event.slug}/infos`}
                className={buttonVariants({ variant: "outline" })}
              >
                <PlusSquare className="w-4 h-4 mr-2" /> Infos
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>Vous n&apos;avez pas encore créé d&apos;évènements.</p>
            <Link
              href={`/organizations/${organization.slug}/infos`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="w-4 h-4 mr-2" /> Créer un évènement
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationPage;
export const dynamic = "force-dynamic";
