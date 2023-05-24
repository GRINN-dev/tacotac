"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Calendar, Menu, PlusSquare, Table } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AllEventsSidebar: FC<{
  organizationSlug: string;
}> = ({ organizationSlug }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const sections = [
    {
      name: "",
      pages: [
        {
          name: "Calendrier",
          icon: Calendar,
          href: `/admin/${organizationSlug}/calendrier`,
        },
        {
          name: "Tableau",
          icon: Table,
          href: `/admin/${organizationSlug}`,
        },
        {
          name: "Créer un évènement",
          icon: PlusSquare,
          href: `/admin/${organizationSlug}/create`,
        },
      ],
    },
  ];

  const Nav = ({ className }: { className?: string }) => (
    <nav id="" className={cn("h-full px-4 pt-8 lg:pt-0", className)}>
      <ul className="flex flex-col gap-8">
        {sections.map((section) => (
          <li key={section.name}>
            <h3 className="text-md ml-4 font-bold">{section.name}</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {section.pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={`${page.href}`}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "gap-2",
                      ((page.href !== `/admin/${organizationSlug}` && pathname.startsWith(page.href)) ||
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
  return (
    <>
      <Nav className="hidden md:block" />
      <Sheet
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent position="left" size="content">
          <Nav />
        </SheetContent>
      </Sheet>
    </>
  );
};
