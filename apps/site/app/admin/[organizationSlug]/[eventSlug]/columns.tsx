"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AttendeeStatus,
  GetAllEventsQuery,
  GetEventBySlugQuery,
  GetOrganizationBySlugQuery,
} from "@/../../@tacotacIO/codegen/dist";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, MoreHorizontal, RefreshCcw } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { Filter } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: (input: {
  organizationSlug: string;
  eventSlug: string;
}) => ColumnDef<GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"][number]>[] = ({
  organizationSlug,
  eventSlug,
}) => [
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
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Prénom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isVip",
    header: "VIP",
  },
  {
    accessorKey: "ticketNumber",
    header: "No. de ticket",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-muted text-muted-foreground font-mono text-xs">
        {row.original.ticketNumber}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {row.original.status === AttendeeStatus.Cancelled
            ? "Annulé"
            : row.original.status === AttendeeStatus.Confirmed
            ? "Confirmé"
            : row.original.status === AttendeeStatus.Idle
            ? "En attente"
            : row.original.status === AttendeeStatus.PanelScan
            ? "Panneau scanné"
            : row.original.status === AttendeeStatus.TicketScan
            ? "Ticket scanné"
            : "Inconnu"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "qrCodeUrl",
    header: "QR Code",
    cell: ({ row }) => (
      <>
        {row.original.qrCodeUrl ? (
          <Link
            className={cn(buttonVariants({ variant: "link", size: "sm" }))}
            href={row.original.qrCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Voir le billet
          </Link>
        ) : (
          <span className="text-muted-foreground">Pas de billet</span>
        )}
      </>
    ),
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
              <Link href={`/admin/${organizationSlug}/${eventSlug}/participants/${row.original.id}`}>
                Voir le détail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.confirm("Voulez-vous supprimer ce participant ?") &&
                  sdk().DeleteAttendee({
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

export const filters: Filter<GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"][number]>[] = [
  {
    columnId: "global",
    displayName: "Recherche globale",
    type: "text",
  },
  {
    columnId: "status",
    displayName: "Statut",
    type: "facet",
    options: [
      { value: String(AttendeeStatus.Confirmed), label: "Confirmé" },
      { value: String(AttendeeStatus.Idle), label: "En attente" },
      { value: String(AttendeeStatus.Cancelled), label: "Annulé" },
      { value: String(AttendeeStatus.PanelScan), label: "Panneau scanné" },
      { value: String(AttendeeStatus.TicketScan), label: "Ticket scanné" },
    ],
  },
  {
    columnId: "isVip",
    displayName: "VIP",
    type: "boolean",
  },
];
