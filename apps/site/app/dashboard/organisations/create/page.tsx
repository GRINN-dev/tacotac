import Link from "next/link";
import { ArrowBigLeft, CogIcon, PlusSquare } from "lucide-react";



import { CreateOrganizationForm } from "./form";


const OrganizationPage = async () => {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <Link href="/dashboard/organisations">
          <ArrowBigLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Créer une nouvelle organisation
        </h1>
      </div>
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <CreateOrganizationForm />
      </div>
    </section>
  );
};

export default OrganizationPage;