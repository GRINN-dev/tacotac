import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Check, LucideIcon, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox, Label, RadioGroup, RadioGroupItem } from "../ui";

interface DataTableBooleanFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableBooleanFilter<TData, TValue>({ column, title }: DataTableBooleanFilter<TData, TValue>) {
  const selectedValue = column?.getFilterValue() as boolean;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValue !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              {selectedValue === true ? "oui" : "non"}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4" align="start">
        {/*   <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValue.delete(option.value);
                      } else {
                        selectedValue.add(option.value);
                      }
                      const filterValues = Array.from(selectedValue);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command> */}
        <RadioGroup
          value={selectedValue === true ? "true" : selectedValue === false ? "false" : undefined}
          onValueChange={(value) => {
            if (value === "true") {
              column?.setFilterValue(true);
            } else if (value === "false") {
              column?.setFilterValue(false);
            } else {
              column?.setFilterValue(undefined);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="r1" />
            <Label htmlFor="r1">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="r2" />
            <Label htmlFor="r2">Non</Label>
          </div>
        </RadioGroup>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            column?.setFilterValue(undefined);
          }}
        >
          Clear filters
        </Button>
      </PopoverContent>
    </Popover>
  );
}
