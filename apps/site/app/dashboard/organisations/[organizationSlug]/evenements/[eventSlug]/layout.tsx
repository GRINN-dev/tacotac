import Link from "next/link";
import { ChevronRight, Clipboard, Cog, Home, PlusSquare } from "lucide-react";



import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


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
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <>
      {/* <section className="w-1/2 m-4"> */}
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800 pt-24">
          <h1 className="px-4 text-xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {eventSlug}
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
                href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/create`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <PlusSquare className="w-8 h-8 mr-4" />
                Ajouter un participant
              </Link>
              <Link
                href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/infos`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Cog aria-hidden className="w-8 h-8 mr-4" />
                Infos
              </Link>
              <Link
                href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/brandings`}
                className={cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Clipboard aria-hidden className="w-8 h-8 mr-4" />
                Charte graphique formulaire
              </Link>
            </nav>
          </div>
        </div>
      </div> */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4 rounded-md  shadow">
          <li className="flex">
            <div className="flex items-center">
              <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="ml-4 text-sm font-medium underline">{eventSlug}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    Mes participants
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/infos`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <Cog aria-hidden className="w-4 h-4 mr-4" />
                    Infos événements
                  </Link>
                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/participant/create`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <PlusSquare className="w-4 h-4 mr-4" />
                    Ajouter un participant
                  </Link>

                  <Link
                    href={`/dashboard/organisations/${organizationSlug}/evenements/${eventSlug}/brandings`}
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <Clipboard aria-hidden className="w-4 h-4 mr-4" />
                    Charte graphique formulaire
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