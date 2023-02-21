import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clipboard, Cog, PlusSquare } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function EventsLayout({
  children,
  params: { organizationSlug },
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <section className="flex justify-start">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800 pt-24">
          <h1 className="px-4 text-xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {organizationSlug}
          </h1>
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              <Link
                href={`/dashboard/organisations/${organizationSlug}/evenements/create`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <PlusSquare className="w-8 h-8 mr-4" />
                Créer un événement
              </Link>
              <Link
                href={`/dashboard/organisations/${organizationSlug}/evenements/infos`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Cog aria-hidden className="w-8 h-8 mr-4" />
                Infos
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:pl-64 w-full">{children}</div>
    </section>
  );
}
