"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetAllOrganizationQuery } from "@/../../@tacotacIO/codegen/dist";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui";

export const OrganizationSelector: FC<{
  organizations: GetAllOrganizationQuery["organizations"]["nodes"];
}> = ({ organizations }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cafe = searchParams.get("cafe") || "all";
  return (
    <div className="px-2">
      <Select
        onValueChange={(value) => {
          router.push(`${pathname}?cafe=${value}`);
        }}
        value={cafe}
      >
        <SelectTrigger className="bg-background">
          <SelectValue placeholder="Mon café" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={`${pathname}?cafe=all`}>Tous les cafés</SelectItem>
          {organizations.map((organization) => (
            <SelectItem key={organization.id + "-selector"} value={organization.id}>
              {organization.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
/*
"use client"

import { FC } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { GetAllOrganizationQuery } from "@tacotacIO/codegen"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const OrganizationsSidebar: FC<{
  organizations: GetAllOrganizationQuery["organizations"]["nodes"]
}> = ({ organizations }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const cafe = searchParams.get("cafe") || "all"
  return (
    <nav id="cofee-shops" className="group h-full py-12 px-4">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href={`${pathname}?cafe=all`} className="flex items-center">
            <Avatar>
              <AvatarFallback
                className={cn(
                  cafe === "all" ? "bg-amber-500 text-white" : "bg-muted",
                  "border"
                )}
              >
                Tous
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                cafe === "all" ? "font-bold" : "font-normal",
                "h-0 w-0 overflow-hidden opacity-0 transition-all  group-hover:ml-2  group-hover:h-auto group-hover:w-auto group-hover:opacity-100"
              )}
            >
              Tous les cafés
            </span>
          </Link>
        </li>

        {organizations.map((organization) => (
          <li key={organization.id}>
            <Link
              href={`${pathname}?cafe=${organization.id}`}
              className="flex items-center "
            >
              <Avatar>
                <AvatarImage src={organization?.pictureUrl} />
                <AvatarFallback
                  className={cn(
                    cafe === organization.id
                      ? "bg-amber-500 text-white"
                      : "bg-muted",
                    "border"
                  )}
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
  )
}

*/
