import { ReactNode } from "react";
import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { AdminPagesSidebar, MobileAdminDrawer, OrganizationsSidebar } from "@/components/navigation/admin-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { organizations } = await serverSdk().GetAllOrganization();
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
    <div className="flex h-full max-h-full w-full flex-col">
      <div className="bg-background align-center z-20 flex h-16 items-center gap-2 border-b px-4 py-2 shadow md:hidden">
        <MobileAdminDrawer organizations={organizations.nodes} currentUser={currentUser} />
        <div className="text-lg font-bold">Chez Daddy - admin</div>
      </div>
      <div className="flex h-[calc(100%-4rem)] w-full grow md:h-full">
        <ScrollArea className="bg-primary-foreground  hidden flex-none flex-col border-r lg:flex">
          <OrganizationsSidebar organizations={organizations.nodes} />
        </ScrollArea>

        {children}
      </div>
    </div>
  );
}
