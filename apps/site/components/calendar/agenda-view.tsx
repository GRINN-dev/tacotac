"use client"

import { FC } from "react"

import { detailDate } from "@/lib/utils"
import { CalendarElement, CalendarElementProps } from "./calendar-element"

export const AgendaView: FC<
  {
    elementsToDisplay: CalendarElementProps[]
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ elementsToDisplay }) => {
  return (
    <div className="mt-2 flex w-full flex-col gap-6 px-4 md:px-12 lg:px-24">
      {
        // group activities by month and then by day
        elementsToDisplay
          .reduce(
            (acc, activity) => {
              const month = detailDate(activity.startsAt)?.month
              const day = detailDate(activity.startsAt)?.day
              const accMonthIndex = acc.findIndex((x) => x.name === month)
              if (accMonthIndex === -1) {
                acc.push({
                  name: month,
                  days: [
                    {
                      name: day,
                      activities: [activity],
                    },
                  ],
                })
              } else {
                const accMonth = acc[accMonthIndex]
                const accDayIndex = accMonth.days.findIndex(
                  (x) => x.name === day
                )
                if (accDayIndex === -1) {
                  accMonth.days.push({
                    name: day,
                    activities: [activity],
                  })
                } else {
                  const accDay = accMonth.days[accDayIndex]
                  accDay.activities.push(activity)
                }
              }

              return acc
            },
            [] as {
              name: string
              days: {
                name: string
                activities: CalendarElementProps[]
              }[]
            }[]
          )
          .map((month, index) => {
            return (
              <div key={index}>
                <h2 className="mt-2 scroll-m-20 border-b pb-2 font-bold uppercase tracking-wide transition-colors">
                  {month.name}{" "}
                  {detailDate(month.days[0].activities[0].startsAt)?.year}
                </h2>
                {month.days.map((day, jndex) => {
                  return (
                    <div key={index + "-" + jndex}>
                      <h3 className="text-secondary-foreground mt-2 scroll-m-20 font-semibold tracking-tight">
                        {day.name}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {day.activities.map((activity, index) => {
                          return (
                            <div key={index}>
                              <CalendarElement
                                {...activity}
                                viewType="agenda"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
      }
    </div>
  )
}
