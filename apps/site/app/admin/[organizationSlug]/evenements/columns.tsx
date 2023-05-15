"use client";

import Link from "next/link";
import { GetAllEventsQuery } from "@/../../@tacotacIO/codegen/dist";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

/*
id, nom, lieu, début, fin, debut inscriptions, fin inscriptions, inscriptions, participants, statut
*/

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

export const columns: ColumnDef<Event>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => {
      const id = String(row.getValue("id"));
      return <span className="text-muted-foreground hover:text-primary font-mono text-xs transition-colors">{id}</span>;
    },
  },
  // { accessorKey: "status", header: "Statut" },
  {
    accessorKey: "bookingStartsAt",
    header: "Début inscr.",
    cell: ({ row }) => {
      const bookingStartsAt = String(row.getValue("bookingStartsAt"));
      return (
        <span className=" text-xs">
          {new Date(bookingStartsAt).toLocaleDateString("fr-FR", {
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
    accessorKey: "bookingEndsAt",
    header: "Fin inscr.",
    cell: ({ row }) => {
      const bookingEndsAt = String(row.getValue("bookingEndsAt"));
      return (
        <span className=" text-xs">
          {new Date(bookingEndsAt).toLocaleDateString("fr-FR", {
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
    accessorKey: "endsAt",
    header: "Fin",
    cell: ({ row }) => {
      const endsAt = String(row.getValue("endsAt"));
      return (
        <span className=" text-xs">
          {new Date(endsAt).toLocaleDateString("fr-FR", {
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
  { accessorKey: "name", header: "Nom" },
  { accessorKey: "placeName", header: "Lieu" },
  { accessorKey: "city", header: "Ville" },
  { accessorKey: "capacity", header: "Capacité" },
  { accessorKey: "totalRegistrations", header: "Total inscr." },
  { accessorKey: "totalConfirmedRegistrations", header: "Total inscr. confirmées" },
];
