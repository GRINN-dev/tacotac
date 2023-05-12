"use client"

import { FC } from "react"
import { Control, Controller } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { Field } from "../types"

export const SelectField: FC<{
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
        <Select
          disabled={field.disabled}
          value={value}
          onValueChange={(e) => onChange(e)}
          defaultValue={
            (field.initialValue || field.defaultValue || null) as any
          }
        >
          <SelectTrigger>
            <SelectValue>
              {field?.options?.find((option) => option.value === value)
                ?.label ||
                field?.options?.find(
                  (option) => option.value === field.defaultValue
                )?.label ||
                field.placeholder ||
                null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {!field.required ? (
              <SelectItem value={null}>Aucun</SelectItem>
            ) : null}
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}
