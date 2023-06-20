/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
  const { currentUser } = await serverSdk({
    cache: "no-store",
  }).GetCurrentUser();

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
    <div className="h-full max-h-full w-full">
      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4">
          <img alt="logo Kaypi" className="h-10 object-contain" src="/logo/Kaypi_Logo_RVB_Icone_Positif.jpg.svg" />
          <TeamSwitcher
            teams={currentUser.organizations.nodes.map(({ organization }) => ({
              label: organization.name,
              value: organization.slug,
              pictureUrl: organization.logoUrl,
              isCurrent: organization.slug === organizationSlug,
            }))}
          />

          {currentUser?.organizations?.nodes
            ?.filter((organization) => organization.role !== "HOST")
            ?.map((organization) => (
              <Link key={organization.organization.id} href={`/admin/${organization.organization.slug}/infos`}>
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

          {/* <MainNav className="mx-6 hidden sm:flex" organizationSlug={organizationSlug} /> */}
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            {/* <Search /> */}
            <UserNav currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-4rem)] ">{children}</div>
    </div>
  );
}
