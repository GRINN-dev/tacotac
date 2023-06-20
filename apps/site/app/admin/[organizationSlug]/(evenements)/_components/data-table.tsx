"use client";

import React from "react";
import { GetOrganizationBySlugQuery } from "@tacotacIO/codegen";

import { DataTable } from "@/components/data-table/data-table";
import { columns, filters } from "../columns";

export function MyDataTable({ data }: { data: GetOrganizationBySlugQuery["organizationBySlug"]["events"]["nodes"] }) {
  return <DataTable columns={columns} data={data} filters={filters} />;
}
