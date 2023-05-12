"use client"

import { FC } from "react"
import { Control, Controller } from "react-hook-form"

import { Checkbox } from "@/components/ui"
import { Field } from "../types"

export const BooleanField: FC<{
  field: Field<any>
  id: string
  control: Control<any, any>
}> = ({ field, id, control }) => {
  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: { onChange, onBlur, value, ref, name } }) => (
        <Checkbox
          disabled={field.disabled}
          required={field.required}
          checked={value}
          id={id}
          onCheckedChange={(e) => onChange(e)}
          defaultChecked={
            (field.initialValue || field.defaultValue || false) as any
          }
        />
      )}
    />
  )
}
