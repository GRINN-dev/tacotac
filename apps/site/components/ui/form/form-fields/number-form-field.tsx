"use client";

import { ReactNode } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormDescription, FormFieldContext, FormItem, FormLabel, FormMessage } from "..";
import { Input } from "../../input";

interface NumberFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition: ReactNode;
  label: ReactNode;
  placeholder?: string;
}

export const NumberFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  placeholder,
  ...props
}: NumberFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} type="number" {...field} />
            </FormControl>
            {descrition && <FormDescription>{descrition}</FormDescription>}

            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
};
