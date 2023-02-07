import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { IData, IHeader, Type } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";


const OrganizationsPage = async ({ searchParams: { offset, filter, first, orderBy } }) => {
  const data = await sdk().GetAllOrganization({
    first: Number(first) || 2,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
    orderBy: orderBy,
  });

  const headerOrga: IHeader[] = [
    { title: "Nom", value: "name", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Description", value: "description", type: Type?.string, isSortable: false, isVisible: true },
    { title: "slug", value: "slug", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawOrga: IData[] = data?.organizations?.nodes.map((organization) => ({
    Nom: organization?.name,
    Description: organization?.description,
    slug: organization?.slug,
  }));

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Vos organisations
        </h1>
        <Link href={"/organizations/create"} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {data?.organizations?.nodes?.length > 0 ? (
          <Collection
            totalCount={data?.organizations?.totalCount}
            pageInfo={data?.organizations?.pageInfo}
            header={headerOrga}
            data={rawOrga}
          />
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Vous n&apos;avez pas encore créé d&apos;organisation <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
            <Link href={`/organizations/create-event`} className={buttonVariants({ size: "lg", variant: "outline" })}>
              <PlusSquare className="w-4 h-4 mr-2" /> Créer une organisation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationsPage;