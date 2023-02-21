import Link from "next/link";
import { PlusSquare } from "lucide-react";



import { IData, IHeader, Type, initLimit } from "@/types/filter";
import { sdk } from "@/lib/sdk";
import { Collection } from "@/components/table/Collection";
import { buttonVariants } from "@/components/ui/button";


const AttendeesPage = async ({ searchParams: { offset, filter, first, orderBy } }) => {
  const { attendees } = await sdk().GetAllAttendee();

  const headerAttendees: IHeader[] = [
    { title: "Nom", value: "Nom", type: Type?.string, isSortable: true, isVisible: true },
    { title: "Prenom", value: "Prénom", type: Type?.string, isSortable: false, isVisible: true },
    { title: "email", value: "email", type: Type?.string, isSortable: false, isVisible: true },
    { title: "status", value: "Status", type: Type?.string, isSortable: false, isVisible: true },
    { title: "Evenements", value: "Évenements", type: Type?.string, isSortable: false, isVisible: true },
    { title: "firstSlug", value: "id", type: Type?.string, isSortable: false, isVisible: false },
  ];

  const rawAttendees: IData[] = attendees.nodes.map(({ id, firstname, lastname, email, status, event }) => ({
    Nom: firstname,
    Prenom: lastname,
    email: email,
    status: status,
    Evenements: event?.name,
    firstSlug: id,
  }));

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-baseline justify-between w-full max-w-3xl gap-2 mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Tous les participants
        </h1>
        <Link href={"/dashboard/participants/create"} className={buttonVariants({ size: "lg", variant: "link" })}>
          <PlusSquare className="w-4 h-4 mr-2" /> Ajouter
        </Link>
      </div>

      <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
        {attendees?.nodes?.length > 0 ? (
          <Collection
            totalCount={attendees?.totalCount}
            pageInfo={attendees?.pageInfo}
            header={headerAttendees}
            data={rawAttendees}
            initLimit={initLimit}
          />
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p>
              Vous n&apos;avez pas encore créé d&apos;organisation <u>ou</u> aucun ne correspondant a votre recherche.
            </p>
            <Link href={`/dashboard/participants/create`} className={buttonVariants({ size: "lg", variant: "outline" })}>
              <PlusSquare className="w-4 h-4 mr-2" /> Créer une organisation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AttendeesPage;