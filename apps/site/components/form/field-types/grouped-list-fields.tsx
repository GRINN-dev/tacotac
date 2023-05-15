"use client"

import { ComponentType, FC, ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Control, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  buttonVariants,
} from "@/components/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field } from "../types"

export const GroupedListField: FC<{
  field: Field<any>
  id: string
  control: Control<any, any>
}> = ({ field, id, control }) => {
  const flattenItems = field.groupedLists.reduce((acc, list) => {
    return [
      ...acc,
      ...list.options.map((option) => ({
        list: list.name,
        Icon: list.Icon,
        value: option.value,
        label: option.label,
      })),
    ]
  }, [] as { list: string; Icon?: ComponentType<any>; value: string; label: string }[])

  return (
    <Controller
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      control={control}
      name={field.name}
      render={({ field: { onChange, onBlur, value, ref, name } }) => {
        const Icon = flattenItems.find(
          (item) =>
            item.value === (value || field.initialValue || field.defaultValue)
        )?.Icon

        return (
          <Popover>
            <PopoverTrigger>
              <div
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex w-full items-center justify-between"
                )}
              >
                <div className="flex items-center gap-2">
                  {Icon ? <Icon /> : false}

                  <span>
                    {flattenItems.find(
                      (item) =>
                        item.value ===
                        (value || field.initialValue || field.defaultValue)
                    )?.label || field.placeholder}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent className={"w-full max-w-xl"}>
              <Tabs defaultValue={field.groupedLists[0].name}>
                <ScrollArea>
                  <TabsList>
                    {field.groupedLists.map((list) => (
                      <TabsTrigger
                        value={list.name}
                        className="flex items-center gap-2"
                      >
                        {list.Icon ? <list.Icon /> : false}
                        <span>{list.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {field.groupedLists.map((list) => (
                  <TabsContent value={list.name}>
                    <RadioGroup
                      defaultValue={
                        (field.defaultValue || field.initialValue) as string
                      }
                      value={value}
                      onValueChange={(value) => onChange(value)}
                    >
                      {list.options.map((item) => (
                        <div
                          className="flex items-center space-x-2"
                          key={item.value}
                        >
                          <RadioGroupItem value={item.value} id={item.value} />
                          <Label htmlFor={item.value}>{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </TabsContent>
                ))}
              </Tabs>
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}
