/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { MainNav } from "../_components/main-nav";
import { Search } from "../_components/search";
import { TeamSwitcher } from "../_components/team-switcher";
import { UserNav } from "../_components/user-nav";

export default async function AdminLayout({
  children,
  params: { organizationSlug },
}: {
  children: ReactNode;
  params: { organizationSlug: string };
}) {
  const { currentUser } = await serverSdk().GetCurrentUser();

  if (!currentUser) {
    return (
      <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
        <Card className="px-4 py-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard Administrateur</h1>
          <p className="mt-4 leading-7">
            Pour vous connecter au dashboard admin, vous devez être connecté en tant qu&apos;administrateur.
          </p>
          <Link href="/login" className={cn(buttonVariants(), "mt-4")}>
            Me connecter
          </Link>
        </Card>
      </div>
    );
  }
  return (
    <div className="bg-muted text-muted-foreground h-full max-h-full w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <img alt="logo Kaypi" className="h-10 object-contain" src="/logo/Kaypi_Logo_RVB_Icone_Positif.jpg.svg" />
          <TeamSwitcher
            teams={currentUser.organizations.nodes.map(({ organization }) => ({
              label: organization.name,
              value: organization.slug,
              pictureUrl: organization.logoUrl,
            }))}
          />

          <MainNav className="mx-6" organizationSlug={organizationSlug} />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-4rem)] ">{children}</div>
    </div>
  );
}
