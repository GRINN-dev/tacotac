"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GetEventByEventSlugQuery, GetEventBySlugQuery, GetOrganizationBySlugQuery } from "@tacotacIO/codegen";



import { sdk } from "@/lib/sdk";
import { DataTable } from "@/components/data-table/data-table";
import { toast } from "@/components/ui/use-toast";
import { columns, filters } from "../columns";


export const MyDataTable = ({
  data,
  organizationSlug,
  eventSlug,
}: {
  data: GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"];
  organizationSlug: string;
  eventSlug: string;
}) => {
  const router = useRouter();
  const sendEmail = (ticketNumber: string) => {
    sdk()
      .SendEmailAttendeeEvent({ ticketNumber })
      .then((data) => {
        router.refresh();
        toast({
          title: "Email bien envoyé 🏉",
        });
      })
      .catch((error) => {
        toast({
          title: "Erreur lors de l'envoi de l'email ",
        });
      });
  };
  const updateIsVIp = (attendeeId: string, isVip: boolean) => {
    sdk()
      .UpdateAttendee({ input: { id: attendeeId, patch: { isVip: !isVip } } })
      .then((data) => {
        router.refresh();
        toast({
          title: "participant mis à jour ✅",
        });
      })
      .catch((error) => {
        toast({
          title: "Erreur lors de la mise à jour du participant",
        });
      });
  };
  return (
    <>
      <DataTable
        columns={columns({
          organizationSlug,
          eventSlug,
          sendEmail,
          updateIsVIp,
        })}
        data={data}
        filters={filters}
      />
    </>
  );
};