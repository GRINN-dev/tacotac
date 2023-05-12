"use client"

import { FC, useEffect, useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Control, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field } from "../types"

export const Autocomplete: FC<{
  field: Field<any>
  id: string
  onChange: (value: any) => void
}> = ({ field, id, onChange }) => {
  const debouce = (fn: any, ms: number) => {
    let timeoutId: any
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), ms)
    }
  }

  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<
    {
      label: string
      value: string
    }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState<{
    label: string
    value: string
  } | null>(null)

  const fetchSuggestions = async (value: string) => {
    setLoading(true)
    try {
      const results = await field.getSuggestions(value)
      setSuggestions(results)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  const debouncedFetchSuggestions = debouce(fetchSuggestions, 500)

  const handleChange = (value) => {
    debouncedFetchSuggestions(value)
  }

  useEffect(() => {
    ;(async () => {
      const result =
        (field.initialValue || field.defaultValue) &&
        (await field.getSuggestionValue({
          value: (field.initialValue || field.defaultValue) as string,
        }))
      result && setSelected(result)
    })()
  }, [field])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex w-full items-center justify-between"
            )}
          >
            {selected?.label || field.placeholder || "selectionner"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[400px] p-0">
          <Command results={suggestions.length} shouldFilter={false}>
            <CommandInput
              onValueChange={handleChange}
              placeholder="Tapez une adresse..."
            />
            <CommandList>
              <CommandEmpty>Aucune resultat trouvé</CommandEmpty>
              <CommandGroup hidden={suggestions?.length == 0}>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.value}
                    onSelect={async (_currentValue) => {
                      setSelected(suggestion)
                      setSuggestions([])
                      const result = await field.getSuggestionValue(suggestion)
                      onChange(result.value)
                      setOpen(false)
                    }}
                    value={suggestion.value}
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
  )
}

export const AutocompleteField: FC<{
  field: Field<any>
  id: string
  control: Control<any, any>
}> = ({ field, id, control }) => {
  return (
    <Controller
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      control={control}
      name={field.name}
      render={({ field: { onChange, onBlur, value, ref, name } }) => (
        <Autocomplete
          field={field}
          id={id}
          onChange={(value) => onChange(value)}
        />
      )}
    />
  )
}
