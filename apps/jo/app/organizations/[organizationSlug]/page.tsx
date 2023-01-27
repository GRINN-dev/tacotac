import Link from "next/link";
import { Cog, PlusSquare } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";

const OrganizationPage = async ({ params: { organizationSlug } }) => {
  const data = await sdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { organizationBySlug: organization } = data;
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {organization.name}
        </h1>
        <Link
          href={`/organizations/${organization.slug}/infos`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <Cog aria-hidden className="h-8 w-8" />
          <span className="sr-only">Paramètres</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-3xl  items-baseline justify-between gap-2">
        <h2 className="mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
          Tous les évènements
        </h2>
        <Link
          href={`/organizations/${organization.slug}/create`}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="mr-2 h-4 w-4" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="mx-auto mt-4 w-full max-w-3xl">
        {organization.events?.nodes.length > 0 ? (
          organization.events?.nodes.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between border-x  border-b border-slate-300 px-6 py-3 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
            >
              <Link href={`/organizations/${event.slug}`}>{event.name}</Link>

              <Link
                href={`/organizations/${event.slug}/infos`}
                className={buttonVariants({ variant: "outline" })}
              >
                <PlusSquare className="mr-2 h-4 w-4" /> Infos
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 items-start">
            <p>Vous n&apos;avez pas encore créé d&apos;évènements.</p>
            <Link
              href={`/organizations/${organization.slug}/infos`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="mr-2 h-4 w-4" /> Créer un évènement
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationPage;
export const dynamic = "force-dynamic";
