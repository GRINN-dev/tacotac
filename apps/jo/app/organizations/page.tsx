import Link from "next/link";
import { PlusSquare } from "lucide-react";

import { siteConfig } from "@/config/site";
import { sdk } from "@/lib/sdk";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

const OrganizationsPage = async () => {
  const data = await sdk().GetAllOrganization();
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Vos organisations
        </h1>
        <Link
          href={"/organizations/create"}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          <PlusSquare className="mr-2 h-4 w-4" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="mx-auto mt-4 w-full max-w-3xl">
        {data.organizations.nodes.map((organization) => (
          <div
            key={organization.id}
            className="flex items-center justify-between border-x  border-b border-slate-300 px-6 py-3 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
          >
            <Link href={`/organizations/${organization.slug}`}>
              {organization.name}
            </Link>

            <Link
              href={`/organizations/${organization.slug}/infos`}
              className={buttonVariants({ variant: "outline" })}
            >
              <PlusSquare className="mr-2 h-4 w-4" /> Infos
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizationsPage;
