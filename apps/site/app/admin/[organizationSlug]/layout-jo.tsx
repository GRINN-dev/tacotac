import { ReactNode } from "react";
import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { AdminPagesSidebar, MobileAdminDrawer, OrganizationsSidebar } from "@/components/navigation/admin-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function Layout({
  params: { organizationSlug },
  children,
}: {
  params: { organizationSlug: string };
  children: ReactNode;
}) {
  const { organizationBySlug } = await serverSdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { currentUser } = await serverSdk().GetCurrentUser();
  const { organizations } = await serverSdk().GetAllOrganization();

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
    <div className="flex h-full max-h-full w-full flex-col">
      <div className="bg-background align-center z-20 flex h-16 items-center gap-2 border-b px-4 py-2 shadow md:hidden">
        <MobileAdminDrawer organizations={organizations.nodes} currentUser={currentUser} />
        <div className="text-lg font-bold">Chez Daddy - admin</div>
      </div>
      <div className="flex h-[calc(100%-4rem)] w-full grow md:h-full">
        <ScrollArea
          id="pages-admins"
          className=" bg-secondary hidden w-56 flex-none flex-col border-r py-12 px-4 md:flex"
        >
          <AdminPagesSidebar organizations={organizations.nodes} currentUser={currentUser} />
        </ScrollArea>

        <ScrollArea className="grow">
          <main className="relative py-2 md:py-8 lg:py-12">
            <div className="absolute top-2 right-2 z-10">
              <ThemeToggle />
            </div>
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
