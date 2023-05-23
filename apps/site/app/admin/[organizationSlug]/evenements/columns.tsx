"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetAllEventsQuery, GetOrganizationBySlugQuery } from "@/../../@tacotacIO/codegen/dist";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, RefreshCcw } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Filter } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Event {
  id?: string;
  // status?: string;
  bookingStartsAt?: string;
  bookingEndsAt?: string;
  startsAt?: string;
  endsAt?: string;
  name?: string;
  placeName?: string;
  city?: string;
  capacity?: number;
  totalRegistrations?: number;
  totalConfirmedRegistrations?: number;
}

export const columns: ColumnDef<GetOrganizationBySlugQuery["organizationBySlug"]["events"]["nodes"][number]>[] = [
  {
    accessorKey: "totalRegistrations",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total inscr.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <div className="text-accent text-3xl">{row.original.totalRegistrations}</div>
          <div className="text-accent">participants</div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "city", header: "Ville" },
  {
    accessorKey: "startsAt",
    header: "Début",
    cell: ({ row }) => {
      const startsAt = String(row.getValue("startsAt"));
      return (
        <span className=" text-xs">
          {new Date(startsAt).toLocaleDateString("fr-FR", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "isDraft",
    header: "Brouillon",
    cell: ({ row }) => {
      return (
        <Badge className="text-xs" variant={row.original.isDraft ? "secondary" : "default"}>
          {row.original.isDraft ? "Brouillon" : "Publié"}
        </Badge>
      );
    },
  },
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
              <Link href={`/admin/${row.original.organization.slug}/evenements/${row.original.slug}`}>
                Voir les détails
              </Link>
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

export const filters: Filter<GetOrganizationBySlugQuery["organizationBySlug"]["events"]["nodes"][number]>[] = [
  {
    columnId: "name",
    type: "text",
    displayName: "Nom",
  },
  {
    columnId: "registrations",
    type: "number-range",
    displayName: "Inscriptions",
  },
  {
    columnId: "startsAt",
    type: "date-range",
    displayName: "Début",
  },
  {
    columnId: "isDraft",
    type: "boolean",
    displayName: "Brouillon",
  },
];
