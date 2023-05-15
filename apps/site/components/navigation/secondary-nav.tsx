"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const examples = [
  {
    name: "Types d'activités",
    href: "/admin/activites",
  },
  {
    name: "Agenda",
    href: "/admin/activites/agenda",
  },
  {
    name: "toutes les activités",
    href: "/admin/activites/table",
  },
]

interface ActivitiesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ActivitiesNav({ className, ...props }: ActivitiesNavProps) {
  const pathname = usePathname()

  return (
    <ScrollArea>
      <div
        className={cn(
          "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
          className
        )}
        {...props}
      >
        {examples.map((example) => (
          <Link
            href={example.href}
            key={example.href}
            className={cn(
              "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
              pathname === example.href &&
                "text-foreground bg-background shadow-sm"
            )}
          >
            {example.name}
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
