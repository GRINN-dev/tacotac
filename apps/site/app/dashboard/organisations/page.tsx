import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";


const OrganizationsPage = async ({ searchParams: { offset, filter, first, orderBy } }) => {
  const { organizations } = await sdk().GetAllOrganization();

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
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Toutes les organizations
        </h1>
        <Link  href={`/dashboard/organisations/create`} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
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
            <Link href={`/dashboard/organisations/create`} className={buttonVariants({ size: "lg", variant: "outline" })}>
              <PlusSquare className="w-4 h-4 mr-2" /> Créer une organisation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationsPage;