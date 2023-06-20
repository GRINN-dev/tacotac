"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { Cog } from "lucide-react";

import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TeamSwitcherButton: FC<{
  organizationSlug: string;
  currentUser: GetCurrentUserQuery["currentUser"];
}> = ({ organizationSlug, currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  const membership = currentUser.organizations?.nodes?.find(
    ({ organization }) => organization.slug === organizationSlug
  );

  if (organizationSlug !== "all")
    return (
      <Button
        variant={pathname.startsWith(`/admin/${organizationSlug}/infos`) ? "default" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/admin/${organizationSlug}/infos`);
        }}
        disabled={!membership || membership.role === "HOST"}
      >
        <Cog />
      </Button>
    );

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Cog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>À quelle équipe souhaitez-vous accéder ?</DialogTitle>
          <DialogDescription>
            Accédez à une équipe pour inviter de nouveaux membres, gérer les paramètres de l&apos;équipe, etc.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
