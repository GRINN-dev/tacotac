"use client";

import { ReactNode } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormDescription, FormFieldContext, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSelectFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition?: ReactNode;
  label: ReactNode;
  placeholder?: string;
  from?: string; // first hour in the list
  to?: string; // last hour in the list
  increment?: number; // time increment in minutes
}
export const TimeSelectFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  placeholder,
  // defaults to the first hour of the day
  from = "00:00",
  // defaults to the last hour of the day, according to the increment
  to = "23:59",
  increment = 15,
  ...props
}: TimeSelectFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-80 overflow-y-auto">
                {/*   {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))} */}
                {/* I want to display hh:mm every `increment` minutes between from and to*/}
                {(() => {
                  const [fromHour, fromMinute] = from.split(":");
                  const [toHour, toMinute] = to.split(":");
                  const fromTime = new Date();
                  fromTime.setHours(Number(fromHour));
                  fromTime.setMinutes(Number(fromMinute));
                  const toTime = new Date();
                  toTime.setHours(Number(toHour));
                  toTime.setMinutes(Number(toMinute));
                  const options = [];
                  for (let time = fromTime; time <= toTime; time.setMinutes(time.getMinutes() + increment)) {
                    options.push(
                      <SelectItem
                        key={time.toISOString()}
                        value={time.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      >
                        {time.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </SelectItem>
                    );
                  }
                  return options;
                })()}
              </SelectContent>
            </Select>
            {descrition && <FormDescription>{descrition}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
};
