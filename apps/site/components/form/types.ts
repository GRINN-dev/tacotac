import { ComponentType, ReactNode } from "react"
import { FieldPath } from "react-hook-form"

export interface GenericFormProps<InputType> {
  // onCanceled: () => void
  onSuccess?: () => void
  action: "create" | "update"
  fields: Field<InputType>[]
  onSubmit: (data: InputType) => Promise<void>
  redirectUrl?: string
  onDelete?: () => void
  // entityName?: string
}

export interface Field<T> {
  name: FieldPath<T>
  label: string
  initialValue?: string | number | boolean | null
  type:
    | "text"
    | "textarea"
    | "select"
    | "boolean"
    | "number"
    | "email"
    | "datetime"
    | "password"
    | "file"
    | "hour"
    | "autocomplete"
    | "grouped-list"
  options?: { label: string; value: string }[]
  required?: boolean
  maxLength?: number
  minLength?: number
  pattern?: RegExp
  placeholder?: string
  defaultValue?: string | number | boolean | null
  hidden?: boolean
  disabled?: boolean
  getSuggestions?: (
    value: string
  ) => Promise<{ label: string; value: string }[]>
  getSuggestionValue?: (suggestion: {
    label?: string
    value: string
  }) => Promise<{
    label: string
    value: string
  }>
  groupedLists?: {
    Icon?: ComponentType<any>
    name: string
    options: { label: string; value: string }[]
  }[]
}
