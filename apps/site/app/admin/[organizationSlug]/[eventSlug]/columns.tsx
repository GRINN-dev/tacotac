"use client";

import { FC, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { AttendeeStatus, GetEventBySlugQuery } from "@tacotacIO/codegen";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Crown, ExternalLink, MoreHorizontal, RefreshCcw, Send } from "lucide-react";



import { sdk } from "@/lib/sdk";
import { cn, transformStatus } from "@/lib/utils";
import { Filter } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const columns: (input: {
  organizationSlug: string;
  eventSlug: string;
  sendEmail: (ticketNumber: string) => void;
  updateIsVIp: (attendeeId: string, isVip: boolean) => void;
}) => ColumnDef<GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"][number]>[] = ({
  organizationSlug,
  eventSlug,
  sendEmail,
  updateIsVIp,
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
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/${organizationSlug}/${eventSlug}/participants/${row.original.id}`}
          className={buttonVariants({ variant: "link" })}
        >
          {row.original.lastname}
        </Link>
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // a mailto in the celle would be nice
    cell: ({ row }) => {
      return <a href={`mailto:${row.original.email}`}>{row.original.email}</a>;
    },
  },
  {
    accessorKey: "isVip",
    header: "VIP",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          className="border-primary border text-center text-xs"
          onClick={() => updateIsVIp(row?.original?.id, row?.original?.isVip)}
        >
          <Crown color={row?.original?.isVip ? "#10ad22" : "#ebe5e5"} strokeWidth={1.5} />
        </Button>
      );
    },
  },
  {
    accessorKey: "ticketNumber",
    header: "No. de billet",
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
      return <Badge variant="outline">{transformStatus(row.original.status)}</Badge>;
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
            <ExternalLink className="mr-2 h-4 w-4" /> Voir le QR Code
          </Link>
        ) : (
          <span className="text-muted-foreground">En préparation...</span>
        )}
      </>
    ),
  },
  {
    accessorKey: "pdfUrl",
    header: "Billet",
    cell: ({ row }) => (
      <>
        {row.original.pdfUrl ? (
          <Link
            className={cn(buttonVariants({ variant: "link", size: "sm" }))}
            href={row.original.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Voir le billet
          </Link>
        ) : (
          <span className="text-muted-foreground">En préparation...</span>
        )}
      </>
    ),
  },
  {
    header: "Renvoi billet",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          className="border-primary border text-xs"
          onClick={() => {
            sendEmail(row.original.ticketNumber);
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          <Send className="text-primary mr-2 h-4 w-4" />
        </Button>
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

const RowActions: FC<{
  row: Row<GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"][number]>;
  organizationSlug: string;
  eventSlug: string;
}> = ({ row, organizationSlug, eventSlug }) => {
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
        <DropdownMenuItem>
          <Link href={`/admin/${organizationSlug}/${eventSlug}/participants/${row.original.id}`}>Voir le détail</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.confirm("Voulez-vous supprimer ce participant ?") &&
              sdk()
                .DeleteAttendee({
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