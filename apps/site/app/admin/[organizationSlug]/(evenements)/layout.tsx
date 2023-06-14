import Link from "next/link";
import { PlusSquare } from "lucide-react";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ViewSwitcher } from "./_components/view-switcher";

export default async function Layout({
  params: { organizationSlug },
  children,
}: {
  params: { organizationSlug: string };
  children: React.ReactNode;
}) {
  const { organizationBySlug } = organizationSlug
    ? await serverSdk().GetOrganizationBySlug({
        slug: organizationSlug,
      })
    : { organizationBySlug: { name: "Kaypi" } };
  return (
    <>
      <ScrollArea className="container h-full space-y-6">
        <div className="mx-auto max-w-5xl space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{organizationBySlug?.name || "Tous mes événements"}</h2>
          {organizationSlug !== "all" && (
            <p className="text-muted-foreground">
              Bienvenue sur le dashboard administrateur de {organizationBySlug.name}. Vous pouvez créer des évènements
              et gérer les participants. Pour créer un évènement, cliquez sur le bouton ci-dessous.
            </p>
          )}
          <div className="flex gap-2 pt-4">
            <Link href={`/admin/${organizationSlug}/create`} className={buttonVariants({ variant: "outline" })}>
              <PlusSquare className="mr-2 h-4 w-4" /> Créer un évènement
            </Link>
            <ViewSwitcher organizationSlug={organizationSlug} />
          </div>
        </div>
        <Separator className="my-6" />

        <div className="mx-auto max-w-5xl">{children}</div>
      </ScrollArea>
    </>
  );
}
