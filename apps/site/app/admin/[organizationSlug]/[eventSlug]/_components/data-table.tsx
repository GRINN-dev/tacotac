"use client";

import React from "react";
import { GetEventByEventSlugQuery, GetEventBySlugQuery, GetOrganizationBySlugQuery } from "@tacotacIO/codegen";

import { DataTable } from "@/components/data-table/data-table";
import { columns, filters } from "../columns";

export function MyDataTable({
  data,
  organizationSlug,
  eventSlug,
}: {
  data: GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"];
  organizationSlug: string;
  eventSlug: string;
}) {
  return (
    <DataTable
      columns={columns({
        organizationSlug,
        eventSlug,
      })}
      data={data}
      filters={filters}
    />
  );
}
