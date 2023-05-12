"use client"

import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui"
import { Field } from "../types"

export const NumberField: FC<{
  field: Field<any>
  id: string
  register: UseFormRegister<any>
}> = ({ field, id, register }) => {
  return (
    <Input
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      disabled={field.disabled}
      type="number"
      id={id}
      {...register(field.name as string, {
        required: field.required,
        maxLength: field.maxLength,
        minLength: field.minLength,
        valueAsNumber: true,
      })}
    />
  )
}
