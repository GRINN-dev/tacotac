"use client"

import { FC } from "react"
import { useCalendar } from "@h6s/calendar"
import { Plus } from "lucide-react"

import { isSameDate } from "@/lib/calendar"
import { cn, detailDate } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { CalendarElement, CalendarElementProps } from "./calendar-element"

export const CalendarWeekView: FC<{
  elementsToDisplay: CalendarElementProps[]
  onDateSelected: (date: Date) => void
  headers: ReturnType<typeof useCalendar>["headers"]
  body: ReturnType<typeof useCalendar>["body"]
}> = ({ elementsToDisplay, body, headers, onDateSelected }) => {
  return (
    <ScrollArea>
      <div className="min-w-[800px]  px-4 md:px-12 lg:px-24">
        {/* body calendar */}
        <>
          <div className={cn("mt-6 grid grid-cols-7")}>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <p className="text-sm font-bold  capitalize" key={key}>
                  {detailDate(value)?.weekday}
                </p>
              )
            })}
          </div>
          <div className="flex flex-col">
            {body.value.map(({ key, value: days }) => (
              <div className={cn("grid w-full grow grid-cols-7")} key={key}>
                {days.map(({ key, value, isCurrentMonth }, index) => (
                  <div
                    className={cn(
                      isSameDate(new Date(), value)
                        ? "bg-primary"
                        : isCurrentMonth
                        ? " bg-accent"
                        : "bg-muted text-muted-foreground",
                      new Date() > value && !isSameDate(new Date(), value)
                        ? "opacity-50"
                        : "",
                      "relative h-[800px] w-full  border-r border-b",
                      // add border-l on first day of week, add border-t on first week of month
                      index % 7 === 0 && "border-l",
                      index < 8 && "border-t"
                    )}
                    key={key}
                  >
                    <div
                      className={cn(
                        isSameDate(new Date(), value)
                          ? "text-primary-foreground"
                          : isCurrentMonth
                          ? "text-foreground"
                          : "text-muted-foreground cursor-default",
                        "w-full",
                        "flex items-center justify-between px-1"
                      )}
                    >
                      <div> {detailDate(value)?.day}</div>
                    </div>
                    {new Date() > value &&
                    !isSameDate(new Date(), value) ? null : (
                      <button
                        className={cn(
                          "absolute bottom-2 right-2 grid place-content-center rounded-full p-1",
                          isSameDate(new Date(), value)
                            ? "text-accent-foreground bg-accent hover:bg-accent/90 "
                            : "text-primary-foreground bg-primary  hover:bg-primary/90"
                        )}
                        type="button"
                        onClick={() => onDateSelected && onDateSelected(value)}
                      >
                        <Plus size={16} />
                      </button>
                    )}

                    {elementsToDisplay
                      .filter((element) =>
                        isSameDate(new Date(element.startsAt), value)
                      )
                      .map((element, index) => (
                        <div
                          key={index}
                          className="absolute w-full"
                          style={{
                            top: `${
                              ((element.startsAt.getHours() * 60 +
                                element.startsAt.getMinutes()) /
                                1440) *
                              100
                            }%`,

                            height: `max(${
                              ((element.endsAt.getHours() * 60 +
                                element.endsAt.getMinutes() -
                                element.startsAt.getHours() * 60 -
                                element.startsAt.getMinutes()) /
                                1440) *
                              100
                            }%, ${150 / 24}%)`,

                            minHeight: "max-content",
                          }}
                        >
                          <CalendarElement {...element} viewType="week" />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
