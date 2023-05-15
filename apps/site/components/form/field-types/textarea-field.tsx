"use client"

import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { Textarea } from "@/components/ui"
import { Field } from "../types"

export const TextAreaField: FC<{
  field: Field<any>
  id: string
  register: UseFormRegister<any>
}> = ({ field, id, register }) => {
  return (
    <Textarea
      rows={3}
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      disabled={field.disabled}
      id={id}
      {...register(field.name as string, {
        required: field.required,
        maxLength: field.maxLength,
        minLength: field.minLength,
        pattern: field.pattern,
      })}
    />
  )
}
