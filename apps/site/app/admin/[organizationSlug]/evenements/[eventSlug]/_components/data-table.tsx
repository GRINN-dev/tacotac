"use client";

import React from "react";
import {
  GetEventByEventSlugQuery,
  GetEventBySlugQuery,
  GetOrganizationBySlugQuery,
} from "@/../../@tacotacIO/codegen/dist";

import { DataTable } from "@/components/data-table/data-table";
import { columns, filters } from "../../columns";

export function MyDataTable({ data }: { data: GetEventBySlugQuery["eventBySlug"]["attendees"]["nodes"] }) {
  return <DataTable columns={columns} data={data} filters={filters} />;
}
