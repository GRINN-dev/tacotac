import Link from "next/link";
import router from "next/router";
import { PlusSquare } from "lucide-react";

import { serverSdk } from "@/lib/server-sdk";
import { buttonVariants } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AddNewTeamCard } from "./_components/add-new-team-card";
import { CreateEventForm } from "./form";

const CreateEventPage = async ({ params: { organizationSlug } }) => {
  const { organizationBySlug } = await serverSdk().GetOrganizationBySlug({
    slug: organizationSlug,
  });

  const { currentUser } = await serverSdk().GetCurrentUser();

  if (organizationSlug === "all")
    return (
      <main className="container pb-8 pt-6 md:py-10">
        <h1 className="admin-h1">Choisir une organisation</h1>
        <div className="grid w-max gap-4">
          {currentUser?.organizations?.nodes?.map((organization) => (
            <Link key={organization.organization.id} href={`/admin/${organization.organization.slug}/create`}>
              <Card className="flex items-center  px-6 py-2">
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={
                      organization.organization.logoUrl ||
                      `https://avatar.vercel.sh/${organization.organization.slug}.png`
                    }
                    alt={organization.organization.name}
                  />
                  <AvatarFallback>
                    {organization.organization.name
                      .split(" ")
                      .filter((word) => word.length > 1)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">{organization.organization.name}</h2>
                </div>
              </Card>
            </Link>
          ))}

          {currentUser?.organizations?.nodes?.length === 0 && <AddNewTeamCard />}
        </div>
      </main>
    );

  return (
    <section className="container  pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Créer un nouvel événement</h1>
      <div className="mt-8">
        <CreateEventForm organizationId={organizationBySlug?.id} />
      </div>
    </section>
  );
};

export default CreateEventPage;
