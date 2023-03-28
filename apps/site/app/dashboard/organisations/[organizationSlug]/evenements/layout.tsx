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
    <section className="mt-4 ml-4 flex flex-wrap">
      <nav className="flex flex-col" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4  px-6 shadow">
          <li className="flex">
            <div className="flex items-center">
              <Link
                href={`/dashboard/organisations`}
                className={cn(
                  " group flex items-center rounded-md p-2 text-sm font-medium"
                )}
              >
                <Home className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="ml-4 text-sm font-medium underline">{organizationSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/evenements/`}
                      className={cn(
                        " group flex items-center rounded-md p-2 text-sm font-medium"
                      )}
                    >
                  <DropdownMenuItem className="self-center">
                      Mes événements
                  </DropdownMenuItem>

                    </Link>

                  <DropdownMenuSeparator />
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/infos`}
                      className={cn(
                        " group flex items-center rounded-md p-2 text-sm font-medium"
                      )}
                    >
                  <DropdownMenuItem className="self-center">
                      <Cog aria-hidden className="mr-4 h-4 w-4" />
                      Infos organisation
                  </DropdownMenuItem>

                    </Link>
                    <Link
                      href={`/dashboard/organisations/${organizationSlug}/evenements/create`}
                      className={cn(
                        " group flex items-center rounded-md p-2 text-sm font-medium"
                      )}
                    >
                  <DropdownMenuItem className="self-center">
                      <PlusSquare className="mr-4 h-4 w-4" />
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