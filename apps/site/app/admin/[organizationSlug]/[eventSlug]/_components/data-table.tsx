"use client";

import React from "react";
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
  const sendEmail = (registrationId: string) => {
    sdk()
      .SendEmailAttendeeEvent({ registrationId })
      .then((data) => {
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
  return (
    <>
     
      <DataTable
        columns={columns({
          organizationSlug,
          eventSlug,
          sendEmail,
        })}
        data={data}
        filters={filters}
      />
    </>
  );
};