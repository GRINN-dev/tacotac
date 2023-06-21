"use client";

import { FC, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { CalendarViewType, getCalendar } from "@/lib/calendar";
import { cn, detailDate } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import { CalendarElementProps } from "./calendar-element";
import { CalendarMonthView } from "./calendar-month-view";
import { CalendarWeekView } from "./calendar-week-view";

export const CalendarView: FC<{
  onDateSelected: (date: Date) => void;
  elementsToDisplay: CalendarElementProps[];
}> = ({ onDateSelected, elementsToDisplay }) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const calendarCursor = searchParams.get("calendarCursor");
  const viewType = (searchParams.get("calendarView") as CalendarViewType) || CalendarViewType.Month;
  const { headers, body, navigation, cursorDate } = getCalendar({
    weekStartsOn: 1,
    cursorDate: calendarCursor ? new Date(calendarCursor) : new Date(),
    viewType,
  });

  const handleViewChange = (view: CalendarViewType, newCursorDate?: Date) => {
    const newSearchParams = new URLSearchParams(searchParams as any);

    newCursorDate
      ? newSearchParams.set("calendarCursor", format(newCursorDate, "yyyy-MM-dd"))
      : newSearchParams.delete("calendarCursor");
    newSearchParams.set("calendarView", view);
    startTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  return (
    <>
      <div
        className={cn(
          "mt-2 flex flex-row items-center justify-between px-4 md:px-12 lg:px-24",
          isPending && "animate-pulse"
        )}
      >
        <div className="flex items-center gap-2">
          <p className="font-bold uppercase tracking-wide">
            {detailDate(cursorDate)?.month + " " + detailDate(cursorDate)?.year}
          </p>
          <Select
            value={searchParams.get("calendarView") || "month"}
            onValueChange={(value) => {
              handleViewChange(value as CalendarViewType);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Vue" defaultValue={CalendarViewType.Month} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CalendarViewType.Month}>Mois</SelectItem>
              <SelectItem value={CalendarViewType.Week}>Semaine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row space-x-1">
          <button
            type="button"
            className="rounded-full border p-2"
            onClick={() => handleViewChange(viewType, navigation.prev(cursorDate))}
          >
            <ChevronLeft />
          </button>
          <button type="button" className="rounded-full border p-2" onClick={() => handleViewChange(viewType)}>
            <Calendar />
          </button>
          <button
            type="button"
            className="rounded-full border p-2"
            onClick={() => handleViewChange(viewType, navigation.next(cursorDate))}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {viewType === CalendarViewType.Month ? (
        <CalendarMonthView
          elementsToDisplay={elementsToDisplay}
          onDateSelected={onDateSelected}
          headers={headers}
          body={body}
        />
      ) : (
        <CalendarWeekView
          elementsToDisplay={elementsToDisplay}
          onDateSelected={onDateSelected}
          headers={headers}
          body={body}
        />
      )}
    </>
  );
};
