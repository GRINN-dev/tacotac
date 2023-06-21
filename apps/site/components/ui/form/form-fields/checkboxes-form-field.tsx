/*
<FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

*/

import { ReactNode } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormFieldContext, FormItem, FormLabel, FormMessage } from "..";

interface CheckboxFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition: ReactNode;
  label: ReactNode;
  placeholder?: string;
  id: string;
}

export const CheckboxFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  placeholder,
  id,
  ...props
}: CheckboxFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => {
          return (
            <FormItem key={id} className="flex flex-col">
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </FormFieldContext.Provider>
  );
};

interface CheckboxesFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition: ReactNode;
  label: ReactNode;
  placeholder?: string;
  options: CheckboxFormFieldProps<TFieldValues, TName>[];
}

/* export const CheckboxesFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  options,
  placeholder,
  ...props
}: CheckboxesFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="mb-4">
              <FormLabel className="text-base">{label}</FormLabel>
              {descrition && <FormDescription>{descrition}</FormDescription>}
            </div>
            {options.map((option) => (
              <CheckboxFormField key={option.id} {...option} />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  )
}
 */
