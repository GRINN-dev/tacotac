import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function OrganisationsLayout({
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
    <section className="flex justify-start">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="w-1/6">
        <nav className="flex flex-col">
          <Link
            href={"/dashboard/organizations/" + organizationSlug + "/infos"}
            className={cn(
              "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm"
            )}
          >
            Événements {organizationSlug}
          </Link>
          <Link
            href={"/dashboard/organizations/" + organizationSlug + "/" + eventSlug}
            className={cn(
              "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm"
            )}
          >
            Participants {organizationSlug}
          </Link>
        </nav>
      </div>

      <div className="w-full">{children}</div>
    </section>
  );
}
