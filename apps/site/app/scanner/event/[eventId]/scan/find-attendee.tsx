"use client";

import { FC, useEffect, useState } from "react";
import { SearchAttendeeQuery, SearchAttendeeQueryVariables } from "@tacotacIO/codegen";
import { ChevronsUpDown } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { GenericForm } from "@/components/form/generic-form";
import { Field, GenericFormProps } from "@/components/form/types";
import { Button, buttonVariants } from "@/components/ui";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const FindAttendee: FC<{
  eventId: string;
  onSelect: (value: SearchAttendeeQuery["attendees"]["nodes"][number]) => void;
}> = ({ eventId, onSelect }) => {
  const debouce = (fn: any, ms: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  };

  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<
    {
      label: string;
      value: SearchAttendeeQuery["attendees"]["nodes"][number];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState<{
    label: string;
    value: SearchAttendeeQuery["attendees"]["nodes"][number];
  } | null>(null);

  const fetchSuggestions = async (value: string) => {
    setLoading(true);
    try {
      const results = await sdk()
        .SearchAttendee({
          eventId,
          search: value,
        })
        .then((res) => res.attendees.nodes)
        .then((nodes) =>
          nodes.map((node) => ({
            label: `${node.firstname} ${node.lastname} - ${node.email}`,
            value: node,
          }))
        )
        .catch((err) => {
          console.error(err);
          return [];
        });

      setSuggestions(results);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const debouncedFetchSuggestions = debouce(fetchSuggestions, 500);

  const handleChange = (value) => {
    debouncedFetchSuggestions(value);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" role="combobox" aria-expanded={open} className="w-full">
            Chercher un participant
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[400px] p-0">
          <Command results={suggestions.length} shouldFilter={false}>
            <CommandInput onValueChange={handleChange} placeholder="Tapez une adresse..." />
            <CommandList>
              <CommandEmpty>Aucune resultat trouvé</CommandEmpty>
              <CommandGroup hidden={suggestions?.length == 0}>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.value?.id}
                    onSelect={async (_currentValue) => {
                      console.log("onSelect", suggestion);
                      setSelected(suggestion);
                      setSuggestions([]);
                      setOpen(false);
                      onSelect(suggestion.value);
                    }}
                    value={suggestion.value.id}
                  >
                    {suggestion.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
