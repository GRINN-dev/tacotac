import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { serverSdk } from "@/lib/server-sdk";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DrawerNav, SidebarNav } from "../../../../components/sidebar-nav";

export default async function Layout({
  children,
  params: { organizationSlug, eventSlug },
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  const data = await serverSdk().GetEventBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  const sidebarNavItems = [
    {
      title: "Participants",
      icon: "group",
      href: `/admin/${organizationSlug}/${eventSlug}`,
    },
    {
      title: "Infos event",
      icon: "cog",
      href: `/admin/${organizationSlug}/${eventSlug}/infos`,
    },
    {
      title: "Import CSV",
      icon: "import",
      href: `/admin/${organizationSlug}/${eventSlug}/import`,
    },
    {
      title: "Ajout participant",
      icon: "plusSquare",
      href: `/admin/${organizationSlug}/${eventSlug}/participants/create`,
    },
    {
      title: "Charte graphique billetterie",
      icon: "paintbrush",
      href: `/admin/${organizationSlug}/${eventSlug}/brandings`,
    },
    {
      title: "Journal des interactions",
      icon: "clipboardCheck",
      href: `/admin/${organizationSlug}/${eventSlug}/logs`,
    },
    {
      title: "Intégration",
      icon: "pictureInPicture",
      href: `/admin/${organizationSlug}/${eventSlug}/integration`,
    },
    {
      title: "Scanner",
      icon: "qrCode",
      href: `/scanner/event/${data.eventBySlug.id}/scan`,
    },
  ];

  return (
    <>
      <ScrollArea className="container h-full space-y-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 lg:justify-start">
          <div className="hidden w-1/5 lg:block" />
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">{data?.eventBySlug?.name}</h1>
            <Link className="flex items-center gap-2" href={`/admin/${organizationSlug}`}>
              <ArrowLeft className="h-3 w-3" />
              <span className="text-muted-foreground">Retour aux événements</span>
            </Link>
          </div>
          <div className="flex-none lg:hidden">
            <DrawerNav items={sidebarNavItems} />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="mx-auto flex max-w-5xl gap-4">
          <aside className="sticky top-0 hidden w-1/5 lg:block">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </ScrollArea>
    </>
  );
}
/* <div className="flex h-full w-full ">
        <EventsSidebar eventSlug={eventSlug} organizationSlug={organizationSlug} eventId={data?.eventBySlug?.id} />
        <ScrollArea className="bg-background text-foreground h-full grow rounded-tl-3xl">
          {children}

          <div className="h-48" aria-hidden="true" />
        </ScrollArea>
      </div> */
/*
import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/examples/forms/components/sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
*/
