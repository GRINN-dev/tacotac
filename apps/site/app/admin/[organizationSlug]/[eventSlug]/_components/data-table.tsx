"use client";

import React from "react";
import { toast } from "@/hooks/use-toast";
import { GetEventByEventSlugQuery, GetEventBySlugQuery, GetOrganizationBySlugQuery } from "@tacotacIO/codegen";

import { sdk } from "@/lib/sdk";
import { DataTable } from "@/components/data-table/data-table";
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
    sdk().SendEmailAttendeeEvent({ registrationId });
  };
  return (
    <DataTable
      columns={columns({
        organizationSlug,
        eventSlug,
        sendEmail,
      })}
      data={data}
      filters={filters}
    />
  );
};