"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Cog, Table } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const ViewSwitcher: FC<{ organizationSlug: string }> = ({ organizationSlug }) => {
  const pathname = usePathname();
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

      <Link
        href={`/admin/${organizationSlug}/info`}
        className={cn(
          buttonVariants({
            variant: pathname === `/admin/${organizationSlug}/infos` ? "default" : "ghost",
          })
        )}
      >
        <Cog />
      </Link>
    </>
  );
};
