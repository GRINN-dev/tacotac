"use client";

import { ReactNode } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormDescription, FormFieldContext, FormItem, FormLabel, FormMessage } from "..";
import { Input } from "../../input";

interface InputFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition: ReactNode;
  label: ReactNode;
  placeholder?: string;
}

export const InputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  placeholder,
  ...props
}: InputFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} className="w-full" />
            </FormControl>
            {descrition && <FormDescription>{descrition}</FormDescription>}

            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
};
