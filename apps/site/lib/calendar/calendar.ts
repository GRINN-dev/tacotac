import {
  addDays,
  addMonths,
  addWeeks,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns"

import { createCalendarInfo } from "./core"
import { CalendarViewType, WeekDayType } from "./models"
import { withDateProps } from "./plugins"
import withKeyProps from "./plugins/withKeyProps"
import { arrayOf, generateID, pipeWith, withKey } from "./utils"

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
}

export function getCalendar({
  weekStartsOn = 0,
  cursorDate = new Date(),
  viewType = CalendarViewType.Month,
}: {
  weekStartsOn: WeekDayType

  cursorDate: Date

  viewType: CalendarViewType
}) {
  const calendar = createCalendarInfo(cursorDate, { weekStartsOn })
  const { weekendDays, weeksInMonth, today, getDateCellByIndex } = calendar

  const headers = {
    weekDays: withKey(weekendDays, "weekdays"),
  }

  const createMatrix = (weeksInMonth: number) => ({
    value: arrayOf(weeksInMonth).map((weekIndex) => {
      return {
        key: generateID("weeks"),
        value: arrayOf(7).map((dayIndex) => {
          return pipeWith(
            getDateCellByIndex(weekIndex, dayIndex),
            withDateProps(cursorDate, cursorDate),
            withKeyProps("days")
          )
        }),
      }
    }),
  })

  const matrix = createMatrix(weeksInMonth)
  const { weekIndex, dateIndex } = today
  const body = {
    [CalendarViewType.Month]: matrix,
    [CalendarViewType.Week]: {
      value: [matrix.value[weekIndex]],
    },
    [CalendarViewType.Day]: {
      value: [
        {
          key: "week-day-type",
          value: [matrix.value[weekIndex]?.value[dateIndex]],
        },
      ],
    },
  }[viewType]

  return {
    ...calendar,
    headers: headers,
    body: body,
    navigation: {
      next: (date: Date) => nextPeriodStart(date, viewType, weekStartsOn, 1),
      prev: (date: Date) => prevPeriodStart(date, viewType, weekStartsOn, 1),
    },
  }
}

export const nextPeriodStart = (
  date: Date,
  viewType: CalendarViewType,
  weekStartsOn: WeekDayType,
  steps = 1
) => {
  switch (viewType) {
    case CalendarViewType.Month:
      return addMonths(startOfMonth(date), steps)
    case CalendarViewType.Week:
      return addWeeks(startOfWeek(date, { weekStartsOn }), steps)
    case CalendarViewType.Day:
      return addDays(date, steps)
  }
}

export const prevPeriodStart = (
  date: Date,
  viewType: CalendarViewType,
  weekStartsOn: WeekDayType,
  steps = 1
) => {
  switch (viewType) {
    case CalendarViewType.Month:
      return subMonths(startOfMonth(date), steps)
    case CalendarViewType.Week:
      return subWeeks(startOfWeek(date, { weekStartsOn }), steps)
    case CalendarViewType.Day:
      return subDays(date, steps)
  }
}
