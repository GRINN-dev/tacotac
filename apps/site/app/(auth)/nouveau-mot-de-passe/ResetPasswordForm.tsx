"use client"

import { useSearchParams } from "next/navigation"

import { GenericForm } from "@/components/form/generic-form"
import { getResetPasswordFormProps } from "./resetPasswordFormProps"

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const { fields, action, onSubmit } = getResetPasswordFormProps({
    token: searchParams.get("token"),
    userId: searchParams.get("user_id"),
  })

  return (
    <GenericForm
      fields={fields}
      action={action}
      onSubmit={onSubmit}
      redirectUrl="/"
    />
  )
}
