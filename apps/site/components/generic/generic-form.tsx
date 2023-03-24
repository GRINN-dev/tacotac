"use client";

import { FC, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Control, Controller, FieldErrors, FieldPath, UseFormRegister, useForm } from "react-hook-form";

import { cn, getErrorFromFieldname, replaceEmptyStringWithNull } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

export interface GenericFormProps<InputType> {
  // onCanceled: () => void
  onSuccess?: () => void;
  action: "create" | "update";
  fields: Field<InputType>[];
  onSubmit: (data: InputType) => Promise<void>;
  redirectUrl?: string;
  onDelete?: () => void;
  // entityName?: string
}

export interface Field<T> {
  name: FieldPath<T>;
  label: string;
  initialValue?: string | number | boolean | null;
  type: "text" | "textarea" | "select" | "boolean" | "number" | "email" | "datetime";
  options?: { label: string; value: string }[];
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  placeholder?: string;
  defaultValue?: string | number | boolean | null;
  hidden?: boolean;
  disabled?: boolean;
}

export const GenericForm: FC<GenericFormProps<any>> = ({
  // onCanceled,
  onSuccess,
  action,
  fields,
  onSubmit,
  redirectUrl,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({});

  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);

    const data2 = replaceEmptyStringWithNull(data);
    await onSubmit(data2);

    setIsLoading(false);

    startTransition(() => {
      onSuccess && onSuccess();
      redirectUrl && router.push(redirectUrl);
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={cn((isLoading || isPending) && "opacity-40", "space-y-2")}
    >
      {fields.map((field) => (
        <FormField field={field} register={register} errors={errors} control={control} />
      ))}
      <div className="flex items-center justify-end gap-2">
        {/* <Button
          type="button"
          onClick={onCanceled}
        >
          Cancel
        </Button> */}
        <Button type="submit" className="capitalize">
          {action}
        </Button>
        {onDelete && (
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
      <p className="text-xs">*Ce champ est obligatoire</p>
    </form>
  );
};

const FormField: FC<{
  register: UseFormRegister<any>;
  field: Field<any>;
  errors: FieldErrors<any>;
  control?: Control<any, any>;
}> = ({ register, field, errors, control }) => {
  const id = useId();

  const error = getErrorFromFieldname({
    fieldName: field.name,
    errorObject: errors,
  });

  return (
    <label key={field.name} htmlFor={id} className={cn("flex flex-col", field.hidden && "hidden")}>
      {field.label}
      {field.required && "*"}
      {field.hidden && (
        <input
          disabled
          defaultValue={(field.initialValue || field.defaultValue || null) as any}
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
      )}
      {field.type === "textarea" && (
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
      )}
      {field.type === "select" && (
        <Controller
          defaultValue={(field.initialValue || field.defaultValue || null) as any}
          control={control}
          name={field.name}
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Select
              disabled={field.disabled}
              value={value}
              onValueChange={(e) => onChange(e)}
              defaultValue={(field.initialValue || field.defaultValue || null) as any}
            >
              <SelectTrigger>
                <SelectValue>
                  {field?.options?.find((option) => option.value === value)?.label ||
                    field?.options?.find((option) => option.value === field.defaultValue)?.label ||
                    field.placeholder ||
                    null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!field.required ? <SelectItem value={null}>Aucun</SelectItem> : null}
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
      {field.type === "boolean" && (
        <Controller
          control={control}
          name={field.name}
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Checkbox
              disabled={field.disabled}
              required={field.required}
              checked={value}
              id={id}
              onCheckedChange={(e) => onChange(e)}
              defaultChecked={(field.initialValue || field.defaultValue || false) as any}
            />
          )}
        />
      )}
      {field.type === "number" && (
        <Input
          defaultValue={(field.initialValue || field.defaultValue || null) as any}
          disabled={field.disabled}
          type="number"
          id={id}
          {...register(field.name as string, {
            required: field.required,
            maxLength: field.maxLength,
            minLength: field.minLength,
            valueAsNumber: true,
          })}
        />
      )}
      {field.type === "datetime" && (
        <Input
          defaultValue={(field.initialValue || field.defaultValue || null) as any}
          disabled={field.disabled}
          type="datetime-local"
          id={id}
          {...register(field.name as string, {
            required: field.required,
            maxLength: field.maxLength,
            minLength: field.minLength,
          })}
        />
      )}
      {field.type === "email" && (
        <Input
          defaultValue={(field.initialValue || field.defaultValue || null) as any}
          disabled={field.disabled}
          type="email"
          id={id}
          {...register(field.name as string, {
            required: field.required,
            maxLength: field.maxLength,
            minLength: field.minLength,
            pattern: field.pattern,
          })}
        />
      )}
      {error ? (
        <span className="text-xs text-red-500">
          {error.type === "required" && "This field is required"}
          {error.type === "maxLength" && `This field must be less than ${field.maxLength} characters`}
          {error.type === "minLength" && `This field must be more than ${field.minLength} characters`}
          {error.type === "pattern" && "This field is invalid"}
        </span>
      ) : null}
    </label>
  );
};
