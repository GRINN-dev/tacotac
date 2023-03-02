import Link from "next/link";
import { ChevronRight, Cog, Home, PlusSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  return (
    <section className="flex flex-wrap mt-4 ml-4">
      <nav className="flex flex-col" aria-label="Breadcrumb">
        <ol role="list" className="flex px-6 space-x-4 shadow">
          <li className="flex">
            <div className="flex items-center">
              <Link
                href={`/dashboard/organisations`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Home className="flex-shrink-0 w-3 h-3" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="flex-shrink-0 w-3 h-3" aria-hidden="true" />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="ml-4 text-sm font-medium underline">{organizationSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link
                    href={`/inscription/${organizationSlug}/evenements/`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">Mes événements</DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <Link
                    href={`/inscription/${organizationSlug}/infos`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <Cog aria-hidden className="w-4 h-4 mr-4" />
                      Infos organisation
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/dashboard/${organizationSlug}/evenements/create`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <PlusSquare className="w-4 h-4 mr-4" />
                      Créer un événement
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        </ol>
      </nav>
      {children}
    </section>
  );
}
