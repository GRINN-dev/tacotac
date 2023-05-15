import { ElementType, FC, PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export const Typography: FC<
  PropsWithChildren<{
    as?: ElementType
    className?: string
    soften?: boolean
    style?:
      | "small"
      | "strong"
      | "em"
      | "code"
      | "big-xxx"
      | "big-xx"
      | "big-x"
      | "big"
      | "base"
      | "upper-detail"
      | "super-small"
    variant?: "main-title" | "page-title"
  }>
> = ({
  as = "span",
  style = "base",
  variant,
  children,
  soften = false,
  className,
  ...props
}) => {
  const Tag = as
  return (
    <Tag
      className={cn(
        "text-slate-900 dark:text-slate-100 ",
        style === "small"
          ? "text-sm"
          : style === "strong"
          ? "font-bold"
          : style === "em"
          ? "italic"
          : style === "code"
          ? "rounded bg-slate-900 p-1 font-mono text-slate-300 dark:bg-slate-400 dark:text-black"
          : style === "big-xxx"
          ? "text-5xl"
          : style === "big-xx"
          ? "text-4xl"
          : style === "big-x"
          ? "text-3xl"
          : style === "big"
          ? "text-2xl"
          : style === "upper-detail"
          ? "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-600"
          : style === "super-small"
          ? "text-xs"
          : "",
        soften ? "text-slate-600 dark:text-slate-400" : "",
        variant === "page-title" ? "text-3xl font-semibold" : "",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
