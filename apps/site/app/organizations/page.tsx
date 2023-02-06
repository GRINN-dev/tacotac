import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { Type, iData, iDataOrga } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import formatData from "@/components/table/taskTable";
import { buttonVariants } from "@/components/ui/button";

const OrganizationsPage = async ({ searchParams: { offset, filter } }) => {
  const data = await sdk().GetAllOrganization({
    first: 2,
    offset: Number(offset),
    filter: filter ? JSON.parse(filter) : null,
  });

  const header = [
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
        {data?.organizations?.nodes.map((organization) => (
          <div
            key={organization?.id}
            className="flex items-center justify-between px-6 py-3 border-b border-x border-slate-300 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
          >
            <Link href={`/organizations/${organization?.slug}`}>{organization?.name}</Link>

            <Link
              href={`/organizations/${organization?.slug}/infos`}
              className={buttonVariants({ variant: "outline" })}
            >
              <PlusSquare className="w-4 h-4 mr-2" /> Infos
            </Link>
          </div>
        ))}
        <Collection
          totalCount={data?.organizations?.totalCount}
          pageInfo={data?.organizations?.pageInfo}
          limit={2}
          {...formatData(header, rawOrga)}
        />
      </div>
    </section>
  );
};

export default OrganizationsPage;