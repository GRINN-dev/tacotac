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
      <div className="w-full"></div>

      {/* </section> */}
      {children}
    </>
  );
}
