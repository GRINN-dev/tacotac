"use client"

import { GenericForm } from "@/components/generic/generic-form"
import { getLoginFormProps } from "./getLoginFormProps"

export const LoginForm = () => {
  const { fields, action, onSubmit } = getLoginFormProps()

  return (
    <GenericForm
      fields={fields}
      action={action}
      onSubmit={onSubmit}
      redirectUrl="/"
    />
  )
}
