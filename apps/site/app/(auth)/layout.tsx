import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"

export default async function AuthLayout({ children }) {
  return (
    <div className="h-full w-full grid-cols-2 lg:grid">
      <div className="relative hidden lg:block">
        <Image
          src="/coffee-maker.png"
          alt={""}
          aria-hidden
          fill
          className="object-cover"
        />
      </div>
      <ScrollArea className="grid place-content-center">{children}</ScrollArea>
    </div>
  )
}
