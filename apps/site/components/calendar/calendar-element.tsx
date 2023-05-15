"use client"

import { ComponentType, FC } from "react"
import { useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

export interface CalendarElementProps {
  color?:
    | "yellow"
    | "red"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "lime"
    | "teal"
    | "amber"
  title: string
  Icon?: ComponentType<any>
  onClick?: () => void
  startsAt: Date
  endsAt: Date
  description?: string
  userName?: string
  createdAt?: Date
  coffeeShopName?: string
}

interface FullCalendarElementProps extends CalendarElementProps {
  viewType: "month" | "agenda" | "week"
}

export const getTime = (date: string | Date) => {
  const sanitizedDate = new Date(date)
  let timeString = sanitizedDate.toLocaleString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  })
  let time = timeString.split(" ")[0]
  return time
}

const indempotentColorFromString = (string: string) => {
  // returns always the same hex code for a random string
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}

const getComplementaryColor = (color: string) => {
  // if the color is dark, returns white, else returns black
  const r = parseInt(color.substr(1, 2), 16)
  const g = parseInt(color.substr(3, 2), 16)
  const b = parseInt(color.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#ffffff"
}

export const CalendarElement: FC<FullCalendarElementProps> = ({
  color,
  title,
  Icon,
  onClick,
  startsAt,
  endsAt,
  viewType,
  description,
  userName,
  createdAt,
  coffeeShopName,
}) => {
  const searchParams = useSearchParams()
  const cafe = searchParams.get("cafe") || "all"
  return (
    <button
      disabled={!onClick}
      onClick={onClick}
      className={cn(
        " text-primary-foreground bg-primary flex h-full w-full flex-col gap-1 p-0.5 text-start text-xs disabled:opacity-60",

        color === "yellow"
          ? "border border-yellow-600 bg-yellow-50 text-yellow-900"
          : color === "red"
          ? "border border-red-600 bg-red-50 text-red-900"
          : color === "green"
          ? "border border-green-600 bg-green-50 text-green-900"
          : color === "blue"
          ? "border border-blue-600 bg-blue-50 text-blue-900"
          : color === "indigo"
          ? "border border-indigo-600 bg-indigo-50 text-indigo-900"
          : color === "purple"
          ? "border border-purple-600 bg-purple-50 text-purple-900"
          : color === "pink"
          ? "border border-pink-600 bg-pink-50 text-pink-900"
          : color === "lime"
          ? "border border-lime-600 bg-lime-50 text-lime-900"
          : color === "teal"
          ? "border border-teal-600 bg-teal-50 text-teal-900"
          : color === "amber"
          ? "border border-amber-600 bg-amber-50 text-amber-900"
          : "",
        viewType === "agenda" && "w-full rounded-xl px-4 py-2 md:text-base"
      )}
    >
      <div
        className={cn(
          "flex w-full flex-wrap items-center justify-between",
          viewType === "agenda" && " justify-start gap-2 "
        )}
      >
        <Icon className={cn("h-4 w-4", viewType === "agenda" && "h-6 w-6")} />
        <div>
          {getTime(startsAt)} - {getTime(endsAt)}
        </div>
        {viewType === "agenda" && coffeeShopName && cafe === "all" ? (
          <div
            className=" rounded-lg py-0.5 px-1 text-xs font-bold  opacity-80"
            style={{
              backgroundColor: indempotentColorFromString(coffeeShopName),
              color: getComplementaryColor(
                indempotentColorFromString(coffeeShopName)
              ),
            }}
          >
            {coffeeShopName}
          </div>
        ) : (
          false
        )}
      </div>
      <div
        className={cn(
          "line-clamp-2 break-all",
          viewType === "agenda" && "line-clamp-none text-lg font-semibold"
        )}
      >
        {title}
      </div>
      {viewType === "agenda" ? (
        <>
          {description ? (
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {description}
            </p>
          ) : (
            false
          )}

          <p className="text-muted-foreground  rounded py-px px-1 text-xs ">
            {createdAt ? (
              <>
                créé le:{" "}
                {new Date(createdAt).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </>
            ) : (
              false
            )}{" "}
            {userName ? <> par: {userName}</> : false}
          </p>
        </>
      ) : (
        false
      )}
    </button>
  )
}
