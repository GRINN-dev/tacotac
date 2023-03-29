import Link from "next/link";
import { ChevronRight, Clipboard, Cog, FileDown, Home, PlusSquare } from "lucide-react";



import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <ol role="list" className="flex space-x-4 rounded-md px-6  shadow">
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="ml-4 text-sm font-medium underline">{eventSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}`}
                    className={cn(
                      "group flex items-center rounded-md p-2 text-sm font-medium "
                    )}
                  >
                    <DropdownMenuItem className="self-center">Mes participants</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/infos`}
                    className={cn(
                      "group flex items-center rounded-md p-2 text-sm font-medium "
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <Cog aria-hidden className="mr-4 h-4 w-4" />
                      Infos événements
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/create`}
                    className={cn(
                      "group flex items-center rounded-md p-2 text-sm font-medium "
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <PlusSquare className="mr-4 h-4 w-4" />
                      Ajouter un participant
                    </DropdownMenuItem>
                  </Link>

                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/brandings`}
                    className={cn(
                      "group flex items-center rounded-md p-2 text-sm font-medium "
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <Clipboard aria-hidden className="mr-4 h-4 w-4" />
                      Charte graphique formulaire
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/import`}
                    className={cn(
                      "group flex items-center rounded-md p-2 text-sm font-medium "
                    )}
                  >
                    <DropdownMenuItem className="self-center">
                      <FileDown aria-hidden className="mr-4 h-4 w-4" />
                      Importer un CSV de participants
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