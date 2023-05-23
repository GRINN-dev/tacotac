"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableBooleanFilter } from "./data-table-boolean-filter";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export type Filter<TData> = {
  displayName: string;
  columnId: keyof TData;
} & (
  | {
      type: "text";
      onChange?: (value: string) => void;
    }
  | {
      type: "facet";
      options: { label: string; value: any }[];
      onChange?: (value: any) => void;
    }
  | {
      type: "date-range";
      onChange?: (value: { from: string; to: string }) => void;
    }
  | {
      type: "number-range";
      onChange?: (value: { from: number; to: number }) => void;
    }
  | {
      type: "boolean";
      onChange?: (value: boolean) => void;
    }
);
type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  filters?: Filter<TData>[];
};

export function DataTableToolbar<TData>({ table, filters }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />
        )} */}

        {filters?.map((filter) => {
          switch (filter.type) {
            case "text":
              return (
                <Input
                  key={filter.columnId as string}
                  placeholder={`Filter ${filter.displayName}...`}
                  value={(table.getColumn(filter.columnId as string)?.getFilterValue() as string) ?? ""}
                  onChange={(event) => {
                    table.getColumn(filter.columnId as string)?.setFilterValue(event.target.value);
                    filter.onChange?.(event.target.value);
                  }}
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              );
            case "facet":
              return (
                <DataTableFacetedFilter
                  key={filter.columnId as string}
                  column={table.getColumn(filter.columnId as string)}
                  title={filter.displayName}
                  options={filter.options}
                  // onChange={(value) => filter.onChange?.(value)}
                />
              );
            case "boolean":
              return (
                <DataTableBooleanFilter
                  key={filter.columnId as string}
                  column={table.getColumn(filter.columnId as string)}
                  title={filter.displayName}
                  // onChange={(value) => filter.onChange?.(value)}
                />
              );
            default:
              return null;
          }
        })}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
