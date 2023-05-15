"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { GetAllOrganizationQuery } from "@/../../@tacotacIO/codegen/dist";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export const OrganizationsSidebar: FC<{
  organizations: GetAllOrganizationQuery["organizations"]["nodes"];
}> = ({ organizations }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cafe = searchParams.get("cafe") || "all";
  return (
    <nav id="cofee-shops" className="group h-full w-max min-w-max py-12 px-2">
      <ul className="flex flex-col gap-6">
        <li>
          <Link href={`/admin`} className="flex items-center">
            <Avatar>
              <AvatarFallback className={cn(cafe === "all" ? "bg-amber-500 text-white" : "bg-muted", "border")}>
                Tous
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                cafe === "all" ? "font-bold" : "font-normal",
                "h-0 w-0 overflow-hidden opacity-0 transition-all  group-hover:ml-2  group-hover:h-auto group-hover:w-auto group-hover:opacity-100"
              )}
            >
              Toutes les organisations
            </span>
          </Link>
        </li>

        {organizations.map((organization) => (
          <li key={organization.id}>
            <Link href={`/admin/${organization.slug}`} className="flex items-center ">
              <Avatar>
                <AvatarImage src={organization?.logoUrl} />
                <AvatarFallback
                  className={cn(cafe === organization.id ? "bg-amber-500 text-white" : "bg-muted", "border")}
                >
                  {organization.name
                    ?.split(" ")
                    .splice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  cafe === organization.id ? "font-bold" : "font-normal",
                  "h-0 w-0 overflow-hidden opacity-0 transition-all  group-hover:ml-2  group-hover:h-auto group-hover:w-auto group-hover:opacity-100"
                )}
              >
                {organization.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
