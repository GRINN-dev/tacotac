"use client"

import { GenericForm } from "@/components/generic/generic-form"
import { getForgotPasswordFormProps } from "./getForgotPasswordFormProps"

export const ForgotPasswordForm = () => {
  const { fields, action, onSubmit } = getForgotPasswordFormProps()

  return (
    <GenericForm
      fields={fields}
      action={action}
      onSubmit={onSubmit}
      redirectUrl="/"
    />
  )
}
