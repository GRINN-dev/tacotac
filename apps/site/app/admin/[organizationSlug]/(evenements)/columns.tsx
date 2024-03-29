"use client";

import { FC, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EventStatus, GetOrganizationBySlugQuery } from "@tacotacIO/codegen";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, RefreshCcw } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Filter } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<GetOrganizationBySlugQuery["organizationBySlug"]["events"]["nodes"][number]>[] = [
  {
    accessorKey: "attendees",
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
        <Link href={`/admin/${row.original.organization.slug}/${row.original.slug}`}>
          <div className="text-accent text-3xl">
            {row.original.attendees.totalCount} <span className="text-base">/ {row.original?.capacity || "∞"}</span>
          </div>
          <div className="text-accent">participants</div>
        </Link>
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
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/${row.original.organization.slug}/${row.original.slug}`}
          className={buttonVariants({ variant: "link" })}
        >
          {row.original.name}
        </Link>
      );
    },
  },
  { accessorKey: "city", header: "Ville" },
  {
    accessorKey: "startsAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Début
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: "state",
    header: "Statut",
    cell: ({ row }) => {
      const state = String(row.getValue("state")) as EventStatus;
      return (
        <Badge
          className="text-xs"
          variant={
            state === EventStatus.Cancelled
              ? "desctructive"
              : state === EventStatus.Draft
              ? "secondary"
              : state === EventStatus.Ongoing
              ? "default"
              : state === EventStatus.Finished
              ? "outline"
              : "default"
          }
        >
          {state === EventStatus.Cancelled
            ? "Annulé"
            : state === EventStatus.Draft
            ? "Brouillon"
            : state === EventStatus.Ongoing
            ? "En cours"
            : state === EventStatus.Finished
            ? "Terminé"
            : "Publié"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  /* {
    accessorKey: "isDraft",
    header: "Brouillon",
    cell: ({ row }) => {
      return (
        <Badge className="text-xs" variant={row.original.isDraft ? "secondary" : "default"}>
          {row.original.isDraft ? "Brouillon" : "Publié"}
        </Badge>
      );
    },
  }, */
  {
    id: "actions",
    header: () => {
      return <Refresher />;
    },
    cell: ({ row }) => <RowActions row={row} />,
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
    columnId: "attendees",
    type: "number-range",
    displayName: "Inscriptions",
  },
  {
    columnId: "startsAt",
    type: "date-range",
    displayName: "Début",
  },
  {
    columnId: "state",
    type: "facet",
    displayName: "Statut",
    options: [
      { value: String(EventStatus.Draft), label: "Brouillon" },
      { value: String(EventStatus.Pending), label: "Publié" },
      { value: String(EventStatus.Ongoing), label: "En cours" },
      { value: String(EventStatus.Finished), label: "Terminé" },
      { value: String(EventStatus.Cancelled), label: "Annulé" },
    ],
  },
];

const RowActions: FC<{ row: Row<GetOrganizationBySlugQuery["organizationBySlug"]["events"]["nodes"][number]> }> = ({
  row,
}) => {
  const router = useRouter();
  const [isTransitionning, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        {/*   <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Link href={`/admin/${row.original.organization.slug}/${row.original.slug}`}>Voir les détails</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.confirm("Voulez-vous supprimer cet evenements ?") &&
              sdk()
                .DeleteEvent({
                  input: {
                    id: row.original.id,
                  },
                })
                .then(() => {
                  startTransition(() => {
                    router.refresh();
                  });
                });
          }}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
