"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ClipboardCheck, Cog, Group, Import, Paintbrush, PlusSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";

export const EventsSidebar: FC<{
  organizationSlug: string;
  eventSlug: string;
}> = ({ organizationSlug, eventSlug }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cafe = searchParams.get("cafe") || "all";

  const sections = [
    {
      name: "Evenement",
      pages: [
        {
          name: "Participants",
          icon: Group,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}`,
        },
        {
          name: "Infos event",
          icon: Cog,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}/infos`,
        },
        {
          name: "Import CSV",
          icon: Import,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}/import`,
        },
        {
          name: "Ajout participant",
          icon: PlusSquare,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}/participant/create`,
        },
        {
          name: "Charte graphique billetterie",
          icon: Paintbrush,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}/brandings`,
        },
        {
          name: "Journal des interactions",
          icon: ClipboardCheck,
          href: `/admin/${organizationSlug}/evenements/${eventSlug}/logs`,
        },
      ],
    },
  ];
  return (
    <nav id="admin-pages" className="mt-8 h-full lg:mt-0">
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
      </ul>
    </nav>
  );
};
