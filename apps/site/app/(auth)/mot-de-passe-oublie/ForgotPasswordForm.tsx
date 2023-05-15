"use client"

import { GenericForm } from "@/components/form/generic-form"
import { getForgotPasswordFormProps } from "./forgotPasswordFormProps"

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
