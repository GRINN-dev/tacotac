import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { Type, iData, iDataOrga } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";

const OrganizationsPage = async ({ searchParams: { offset, filter } }) => {
  const data = await sdk().GetAllOrganization({
    first: 2,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
  });

  const headerOrga = [
    { title: "Nom", value: "name", type: Type?.string },
    { title: "Description", value: "description", type: Type?.string },
  ];

  const rawOrga: any[] = data?.organizations?.nodes.map((organization) => ({
    Nom: organization?.name,
    Description: organization?.description,
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
        
        <Collection
          totalCount={data?.organizations?.totalCount}
          pageInfo={data?.organizations?.pageInfo}
          limit={2}
          header={headerOrga}
          data={rawOrga}
        />
      </div>
    </section>
  );
};

export default OrganizationsPage;