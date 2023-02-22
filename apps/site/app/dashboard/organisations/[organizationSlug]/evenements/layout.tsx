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
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4  px-6 shadow">
          <li className="flex">
            <div className="flex items-center">
              <Link
                href={`/dashboard/organisations`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Home className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="ml-4 text-sm font-medium underline">{organizationSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="self-center">
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/evenements/`}
                      className={cn(
                        "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      Mes événements
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="self-center">
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/infos`}
                      className={cn(
                        "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <Cog aria-hidden className="w-4 h-4 mr-4" />
                      Infos organisation
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="self-center">
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/evenements/create`}
                      className={cn(
                        "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <PlusSquare className="w-4 h-4 mr-4" />
                      Créer un événement
                    </Link>
                  </DropdownMenuItem>
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