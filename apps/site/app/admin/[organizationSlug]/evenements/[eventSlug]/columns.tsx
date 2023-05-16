"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetAllEventsQuery, GetEventBySlugQuery, GetOrganizationBySlugQuery } from "@/../../@tacotacIO/codegen/dist";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, RefreshCcw } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<
  GetEventBySlugQuery["eventBySlug"]["registrations"]["nodes"][number]["attendeesList"][number]
>[] = [
  {
    id: "actions",
    header: () => {
      return <Refresher />;
    },
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/*   <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
              {/*   <Link href={`/admin/${row.original.organization.slug}/evenements/${row.original.slug}`}>
                Voir les détails
              </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.confirm("Voulez-vous supprimer cet evenements ?") &&
                  sdk().DeleteEvent({
                    input: {
                      id: row.original.id,
                    },
                  });
              }}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "isVip", header: "VIP" },
  { accessorKey: "status", header: "Statut" },
];

const Refresher: FC = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.refresh();
      }}
      variant="ghost"
      className="h-8 w-8 p-0"
    >
      <span className="sr-only">Refresh</span>
      <RefreshCcw className="h-4 w-4" />
    </Button>
  );
};
