import { FC, useId } from "react"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

import { cn, getErrorFromFieldname, intToHourString } from "@/lib/utils"
import { AutocompleteField } from "./field-types/autocomplete-field"
import { BooleanField } from "./field-types/boolean-field"
import { DateTimeField } from "./field-types/datetime-field"
import { EmailField } from "./field-types/email-field"
import { FileField } from "./field-types/file-field"
import { GroupedListField } from "./field-types/grouped-list-fields"
import { HourField } from "./field-types/hour-field"
import { NumberField } from "./field-types/number-field"
import { PasswordField } from "./field-types/password-field"
import { SelectField } from "./field-types/select-field"
import { TextField } from "./field-types/text-field"
import { TextAreaField } from "./field-types/textarea-field"
import { Field } from "./types"

export const FormField: FC<{
  register: UseFormRegister<any>
  field: Field<any>
  errors: FieldErrors<any>
  control?: Control<any, any>
}> = ({ register, field, errors, control }) => {
  const id = useId()

  const error = getErrorFromFieldname({
    fieldName: field.name,
    errorObject: errors,
  })

  return (
    <label
      key={field.name}
      htmlFor={id}
      className={cn("flex flex-col", field.hidden && "hidden")}
    >
      {field.label}
      {field.required && "*"}
      {field.hidden && (
        <input
          disabled
          defaultValue={
            (field.initialValue || field.defaultValue || null) as any
          }
          type="hidden"
          id={id}
          {...register(field.name as string, {
            required: field.required,
            maxLength: field.maxLength,
            minLength: field.minLength,
            pattern: field.pattern,
          })}
        />
      )}
      {field.type === "text" && (
        <TextField field={field} id={id} register={register} />
      )}
      {field.type === "textarea" && (
        <TextAreaField field={field} id={id} register={register} />
      )}
      {field.type === "select" && (
        <SelectField field={field} id={id} control={control} />
      )}
      {field.type === "boolean" && (
        <BooleanField field={field} id={id} control={control} />
      )}
      {field.type === "number" && (
        <NumberField field={field} id={id} register={register} />
      )}
      {field.type === "datetime" && (
        <DateTimeField field={field} id={id} control={control} />
      )}
      {field.type === "hour" && (
        <HourField field={field} id={id} register={register} />
      )}
      {field.type === "email" && (
        <EmailField field={field} id={id} register={register} />
      )}
      {field.type === "password" && (
        <PasswordField field={field} id={id} register={register} />
      )}
      {field.type === "file" && (
        <FileField field={field} id={id} control={control} />
      )}
      {field.type === "autocomplete" && (
        <AutocompleteField field={field} id={id} control={control} />
      )}
      {field.type === "grouped-list" && (
        <GroupedListField field={field} id={id} control={control} />
      )}
      {error ? (
        <span className="text-xs text-red-500">
          {error.type === "required" && "This field is required"}
          {error.type === "maxLength" &&
            `This field must be less than ${field.maxLength} characters`}
          {error.type === "minLength" &&
            `This field must be more than ${field.minLength} characters`}
          {error.type === "pattern" && "This field is invalid"}
        </span>
      ) : null}
    </label>
  )
}
