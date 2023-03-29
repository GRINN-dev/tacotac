import Link from "next/link";
import { PlusSquare } from "lucide-react";

import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";

const OrganizationsPage = async ({ searchParams: { offset, filter, first, orderBy } }) => {
  const { organizations } = await sdk().GetAllOrganization({
    first: Number(first) || initLimit,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
    orderBy: orderBy,
  });

  const headerOrga: IHeader[] = [
    { title: "Nom", value: "name", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Description", value: "description", type: Type?.string, isSortable: false, isVisible: true },
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawOrga: IData[] = organizations.nodes.map(({ name, description, slug }) => ({
    Nom: name,
    Description: description,
    slug: slug + "/evenements",
  }));

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl items-baseline justify-between gap-2">
        <h1 className="font-zenon-bold text-text-accent text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Toutes les organisations
        </h1>
        <Link href={`/dashboard/organisations/create`} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="mr-2 h-4 w-4" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="mx-auto mt-4 w-full max-w-3xl">
        {organizations?.nodes?.length > 0 ? (
          <Collection
            totalCount={organizations?.totalCount}
            pageInfo={organizations?.pageInfo}
            header={headerOrga}
            data={rawOrga}
            initLimit={initLimit}
          />
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Vous n&apos;avez pas encore créé d&apos;organisation <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
            <Link
              href={`/dashboard/organisations/create`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlusSquare className="mr-2 h-4 w-4" /> Créer une organisation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationsPage;
