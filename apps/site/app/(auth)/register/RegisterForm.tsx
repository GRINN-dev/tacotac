"use client"

import { GenericForm } from "@/components/generic/generic-form"
import { getRegisterFormProps } from "./getRegisterFormProps"

export const RegisterForm = () => {
  const { fields, action, onSubmit } = getRegisterFormProps()

  return (
    <GenericForm
      fields={fields}
      action={action}
      onSubmit={onSubmit}
      redirectUrl="/"
    />
  )
}
