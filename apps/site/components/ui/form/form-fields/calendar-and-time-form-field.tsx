"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, ControllerProps, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormFieldContext, FormItem, FormLabel, FormMessage } from "..";
import { Button } from "../../button";
import { Calendar } from "../../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";

interface CalendarFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  descrition: ReactNode;
  label: ReactNode;
  placeholder?: string;
  from?: string; // first hour in the list
  to?: string; // last hour in the list
  increment?: number; // time increment in minutes
}

export const CalendarAndTimeFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  descrition,
  label,
  placeholder, // defaults to the first hour of the day
  from = "00:00",
  // defaults to the last hour of the day, according to the increment
  to = "23:59",
  increment = 15,
  ...props
}: CalendarFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Input field={field} from={from} to={to} increment={increment} />
            {descrition && <FormDescription>{descrition}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
};

const Input: FC<{
  field: ControllerRenderProps<any, any>;
  from: string;
  to: string;
  increment: number;
}> = ({ field, from, to, increment }) => {
  const [dateValue, setDateValue] = useState<Date | undefined>(field.value);
  const [timeValue, setTimeValue] = useState<string | undefined>(
    field.value?.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  /*   useEffect(() => {
    console.log("1");
    if (dateValue && timeValue) {
      const [hour, minute] = timeValue.split(":");
      const date = new Date(dateValue);
      date.setHours(Number(hour));
      date.setMinutes(Number(minute));
      field.onChange(date);
    }
  }, [dateValue, field, timeValue]);
 */
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
            >
              {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={(selected) => {
              setDateValue(selected);
              const date = new Date(selected);
              !timeValue
                ? setTimeValue(date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }))
                : date.setHours(Number(timeValue.split(":")[0]), Number(timeValue.split(":")[1]));
              field.onChange(date);
            }}
            // disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select
        onValueChange={(selected) => {
          setTimeValue(selected);
          const date = dateValue || new Date();
          !dateValue && setDateValue(date);
          const [hour, minute] = selected.split(":");
          date.setHours(Number(hour), Number(minute));
          field.onChange(date);
        }}
        value={
          timeValue ||
          (field.value?.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }) as string)
        }
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="max-h-80 overflow-y-auto">
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
    </div>
  );
};
