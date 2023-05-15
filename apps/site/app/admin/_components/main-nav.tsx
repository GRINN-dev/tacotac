"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
          organizationSlug && pathname.split("/").length === 3 && "text-primary"
        )}
      >
        Stats
      </Link>
      <Link
        href={organizationSlug ? `/admin/${organizationSlug}/evenements` : "/admin/all/evenements"}
        className={cn(
          "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
          pathname.includes("evenements") && "text-primary"
        )}
      >
        Évènements
      </Link>
      <Link
        href={organizationSlug ? `/admin/${organizationSlug}/infos` : "/admin/all/parametres"}
        className={cn(
          "hover:text-primary text-muted-foreground text-sm font-medium transition-colors",
          pathname.includes("parametres") && "text-primary"
        )}
      >
        Paramètres
      </Link>
    </nav>
  );
}
