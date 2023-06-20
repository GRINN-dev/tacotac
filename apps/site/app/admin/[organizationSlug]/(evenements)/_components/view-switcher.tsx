"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { Calendar, Cog, Table } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const ViewSwitcher: FC<{
  organizationSlug: string;
  currentUser: GetCurrentUserQuery["currentUser"];
}> = ({ organizationSlug, currentUser }) => {
  const pathname = usePathname();

  const membership = currentUser.organizations?.nodes?.find(
    ({ organization }) => organization.slug === organizationSlug
  );

  return (
    <>
      <Link
        href={`/admin/${organizationSlug}/calendrier`}
        className={cn(
          buttonVariants({
            variant: pathname === `/admin/${organizationSlug}/calendrier` ? "default" : "ghost",
          })
        )}
      >
        <Calendar />
      </Link>

      <Link
        href={`/admin/${organizationSlug}`}
        className={cn(
          buttonVariants({
            variant: pathname === `/admin/${organizationSlug}` ? "default" : "ghost",
          })
        )}
      >
        <Table />
      </Link>

      {organizationSlug !== "all" && membership.role !== "HOST" && (
        <Link
          href={`/admin/${organizationSlug}/infos`}
          className={cn(
            buttonVariants({
              variant: pathname === `/admin/${organizationSlug}/infos` ? "default" : "ghost",
            })
          )}
        >
          <Cog />
        </Link>
      )}
    </>
  );
};
