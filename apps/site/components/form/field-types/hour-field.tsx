"use client"

import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { intToHourString } from "@/lib/utils"
import { Input } from "@/components/ui"
import { Field } from "../types"

export const HourField: FC<{
  field: Field<any>
  id: string
  register: UseFormRegister<any>
}> = ({ field, id, register }) => {
  return (
    <Input
      defaultValue={
        (intToHourString(field.initialValue as number | null | undefined) ||
          intToHourString(field.defaultValue as number | null | undefined) ||
          null) as any
      }
      disabled={field.disabled}
      type="time"
      id={id}
      {...register(field.name as string, {
        required: field.required,
        maxLength: field.maxLength,
        minLength: field.minLength,
        setValueAs(value) {
          return parseInt(value.split(":").join(""))
        },
      })}
    />
  )
}
