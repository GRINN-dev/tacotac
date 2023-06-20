"use client";

import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { Cog } from "lucide-react";

import { Button } from "@/components/ui";
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
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
