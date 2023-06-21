"use client";

import { FC, useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Label, Switch } from "../ui";
import { AgendaView } from "./agenda-view";
import { CalendarElementProps } from "./calendar-element";
import { CalendarView } from "./calendar-view";

interface GenericCalendarProps {
  onDateSelected?: (date: Date) => void;
  elementsToDisplay?: CalendarElementProps[];
  defaultView: "calendar" | "agenda";
}

export const GenericCalendar: FC<GenericCalendarProps> = ({
  elementsToDisplay = [],
  onDateSelected,
  defaultView = "calendar",
}) => {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const router = useRouter();
  const pathname = usePathname();
  const viewType =
    searchParams.get("view") === "agenda"
      ? "agenda"
      : searchParams.get("view") === "calendar"
      ? "calendar"
      : defaultView;
  return (
    <>
      <div className="flex items-center space-x-2   px-4 md:px-12 lg:px-24">
        <Switch
          id="switch-view"
          checked={viewType === "agenda"}
          onCheckedChange={(checked) => {
            router.replace(`${pathname}?${createQueryString("view", checked ? "agenda" : "calendar")}`);
          }}
        />
        <Label htmlFor="switch-view">Vue agenda</Label>
      </div>
      {viewType === "calendar" ? (
        <CalendarView elementsToDisplay={elementsToDisplay} onDateSelected={onDateSelected} />
      ) : (
        <AgendaView elementsToDisplay={elementsToDisplay} />
      )}
    </>
  );
};
