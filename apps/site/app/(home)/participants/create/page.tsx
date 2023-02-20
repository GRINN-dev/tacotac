import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { CreateOrganizationForm } from "./form";

const AttendeePage = async () => {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <Link href="/participants">
          <ArrowBigLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Créer un nouveau participant
        </h1>
      </div>
      <div className="mx-auto flex w-full max-w-3xl  items-baseline gap-2">
        <CreateOrganizationForm />
      </div>
    </section>
  );
};

export default AttendeePage;
