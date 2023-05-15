import { ReactNode } from "react";
import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { AdminPagesSidebar, MobileAdminDrawer, OrganizationsSidebar } from "@/components/navigation/admin-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MainNav } from "../_components/main-nav";
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
      <div className="flex h-full w-full items-center justify-center">
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
    <div className="h-full max-h-full  w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
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
      <ScrollArea className="h-[calc(100%-4rem)]">{children}</ScrollArea>
    </div>
  );
}
