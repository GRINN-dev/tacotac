"use client";

import { FC } from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Calendar, PlusSquare, Table } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";

export const AllEventsSidebar: FC<{
  organizationSlug: string;
}> = ({ organizationSlug }) => {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const cafe = searchParams.get("cafe") || "all";

  const sections = [
    {
      name: "",
      pages: [
        {
          name: "Calendrier",
          icon: Calendar,
          href: `/admin/${organizationSlug}/evenements/calendrier`,
        },
        {
          name: "Tableau",
          icon: Table,
          href: `/admin/${organizationSlug}/evenements`,
        },
        {
          name: "Créer un évènement",
          icon: PlusSquare,
          href: `/admin/${organizationSlug}/evenements/create`,
        },
      ],
    },
  ];
  return (
    <nav id="admin-pages" className={cn("mt-8 h-full lg:mt-0", params.eventSlug && "hidden")}>
      <ul className="flex flex-col gap-8">
        {sections.map((section) => (
          <li key={section.name}>
            <h3 className="text-md ml-4 font-bold">{section.name}</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {section.pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={`${page.href}?cafe=${cafe}`}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "gap-2",
                      ((page.href !== `/admin/${organizationSlug}/evenements` && pathname.startsWith(page.href)) ||
                        pathname === page.href) &&
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
      </ul>
    </nav>
  );
};
