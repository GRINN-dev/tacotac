"use client"

import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui"
import { Field } from "../types"

export const TextField: FC<{
  field: Field<any>
  id: string
  register: UseFormRegister<any>
}> = ({ field, id, register }) => {
  return (
    <Input
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      disabled={field.disabled}
      type="text"
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
