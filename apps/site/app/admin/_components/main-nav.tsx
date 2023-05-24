"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Cog } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  organizationSlug?: string;
}
export function MainNav({ className, organizationSlug, ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href={organizationSlug ? `/admin/${organizationSlug}` : "/admin/all"}
        className={cn(
          "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
          pathname.includes("evenements") && "text-primary"
        )}
      >
        <span className="hidden sm:inline">Évènements</span>
        <span className="sm:hidden">
          <Calendar />{" "}
        </span>
      </Link>
      <Link
        href={organizationSlug ? `/admin/${organizationSlug}/infos` : "/admin/all/parametres"}
        className={cn(
          "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
          pathname.includes("parametres") && "text-primary"
        )}
      >
        <span className="hidden sm:inline">Paramètres</span>
        <span className="sm:hidden">
          <Cog />{" "}
        </span>
      </Link>
    </nav>
  );
}
