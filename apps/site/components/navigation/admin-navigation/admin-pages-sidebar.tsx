"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { GetAllOrganizationQuery, GetCurrentUserQuery } from "@tacotacIO/codegen";
import { ClipboardEdit, Sprout, Store, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card } from "../../ui/card";
import { sections } from "./admin-navigation-entries";
import { OrganizationSelector } from "./org-selector";

export const AdminPagesSidebar: FC<{
  organizations: GetAllOrganizationQuery["organizations"]["nodes"];
  currentUser: GetCurrentUserQuery["currentUser"];
}> = ({ organizations, currentUser }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cafe = searchParams.get("cafe") || "all";

  return (
    <>
      <Card id="user-profile" className="flex items-center p-2">
        <Avatar>
          <AvatarFallback className="border bg-amber-500 text-white">
            <User size={20} />
          </AvatarFallback>
          <AvatarImage src={currentUser.avatarUrl} />
        </Avatar>
        <div className="flex flex-col px-2 py-1">
          <div className="text-muted-foreground line-clamp-1 text-sm font-bold uppercase tracking-wide">
            {currentUser.firstname}
          </div>
          <Link
            href="/compte"
            className="hover:text-accent-foreground inline-flex items-center gap-2 text-xs uppercase tracking-wide hover:font-bold hover:underline"
          >
            <ClipboardEdit size={12} />
            <span className="whitespace-nowrap">Mon compte</span>
          </Link>
        </div>
      </Card>
      <div className="mt-8  block lg:hidden">
        <OrganizationSelector organizations={organizations} />
      </div>
      <nav id="admin-pages" className="mt-8 h-full lg:mt-0">
        <ul className="flex flex-col gap-8">
          {sections.map((section) => (
            <li key={section.name}>
              <h3 className="text-md ml-4 font-bold">{section.name}</h3>
              <ul className="mt-2 flex flex-col gap-2">
                {section.pages.map((page) => (
                  <li key={page.name} className={cn(cafe === "all" && page.notAll && "hidden")}>
                    <Link
                      href={`${page.href}?cafe=${cafe}`}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "gap-2",
                        ((page.href !== "/admin" && pathname.startsWith(page.href)) || pathname === page.href) &&
                          "font-bold underline"
                      )}
                    >
                      {page.icon && <page.icon size={20} />}
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {cafe === "all" && (
            <li className="mt-8">
              <Link
                href="/admin/cafes"
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "gap-2"
                )}
              >
                <Store size={20} />
                Tous les cafés
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
