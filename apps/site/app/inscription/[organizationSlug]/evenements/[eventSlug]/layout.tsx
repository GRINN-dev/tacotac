import Link from "next/link";
import { ChevronRight, Clipboard, Cog, Home, PlusSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AttendeesLayout({
  children,
  params: { organizationSlug, eventSlug },
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  return (
    <>
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4 rounded-md shadow">
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="flex-shrink-0 w-3 h-3" aria-hidden="true" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="ml-4 text-sm font-medium underline">{eventSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link
                    href={`/inscription/${organizationSlug}/evenements/${eventSlug}`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">Mes participants</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    href={`/inscription/${organizationSlug}/evenements/${eventSlug}/infos`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <Cog aria-hidden className="w-4 h-4 mr-4" />
                      Infos événements
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/inscription/${organizationSlug}/evenements/${eventSlug}/participant/create`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <PlusSquare className="w-4 h-4 mr-4" />
                      Ajouter un participant
                    </DropdownMenuItem>
                  </Link>

                  <Link
                    href={`/inscription/${organizationSlug}/evenements/${eventSlug}/brandings`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <Clipboard aria-hidden className="w-4 h-4 mr-4" />
                      Charte graphique formulaire
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        </ol>
      </nav>
      <div className="w-full"></div>

      {/* </section> */}
      {children}
    </>
  );
}
