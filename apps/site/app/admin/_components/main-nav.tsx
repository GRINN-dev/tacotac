"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { Calendar, Cog } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  organizationSlug?: string;
  currentUser?: GetCurrentUserQuery["currentUser"];
}
export function MainNav({ className, organizationSlug = "all", ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href={organizationSlug ? `/admin/${organizationSlug}` : "/admin/all"}
        className={cn(
          "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
          pathname === `/admin/${organizationSlug}` && "text-primary"
        )}
      >
        <span className="hidden sm:inline">Évènements</span>
        <span className="sm:hidden">
          <Calendar />{" "}
        </span>
      </Link>
      {organizationSlug !== "all" ? (
        <Link
          href={`/admin/${organizationSlug}/infos`}
          className={cn(
            "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
            pathname.startsWith(`/admin/${organizationSlug}/infos`) && "text-primary"
          )}
        >
          <span className="hidden sm:inline">Paramètres équipe</span>
          <span className="sm:hidden">
            <Cog />
          </span>
        </Link>
      ) : (
        false
      )}
    </nav>
  );
}
