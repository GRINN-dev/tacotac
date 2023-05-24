"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ClipboardCheck,
  Cog,
  Group,
  Import,
  Menu,
  Paintbrush,
  PictureInPicture,
  PlusSquare,
  QrCode,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const EventsSidebar: FC<{
  organizationSlug: string;
  eventSlug: string;
  eventId: string;
}> = ({ organizationSlug, eventSlug, eventId }) => {
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
          name: "Participants",
          icon: Group,
          href: `/admin/${organizationSlug}/${eventSlug}`,
        },
        {
          name: "Infos event",
          icon: Cog,
          href: `/admin/${organizationSlug}/${eventSlug}/infos`,
        },
        {
          name: "Import CSV",
          icon: Import,
          href: `/admin/${organizationSlug}/${eventSlug}/import`,
        },
        {
          name: "Ajout participant",
          icon: PlusSquare,
          href: `/admin/${organizationSlug}/${eventSlug}/participant/create`,
        },
        {
          name: "Charte graphique billetterie",
          icon: Paintbrush,
          href: `/admin/${organizationSlug}/${eventSlug}/brandings`,
        },
        {
          name: "Journal des interactions",
          icon: ClipboardCheck,
          href: `/admin/${organizationSlug}/${eventSlug}/logs`,
        },
        {
          name: "Intégration",
          icon: PictureInPicture,
          href: `/admin/${organizationSlug}/${eventSlug}/integration`,
        },
        {
          name: "Scanner",
          icon: QrCode,
          href: `/scanner/event/${eventId}/scan`,
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
                      ((page.href !== `/admin/${organizationSlug}/${eventSlug}` && pathname.startsWith(page.href)) ||
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
