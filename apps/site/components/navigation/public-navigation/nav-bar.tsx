"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { SidebarOpen, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { entries } from "./public-navigation-entries";

export const Navbar: FC<{ user?: GetCurrentUserQuery["currentUser"] }> = ({ user }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className="bg-primary text-primary-foreground border-px border-accent-foreground border-b">
      <div className="container flex h-16 items-center ">
        <nav id="primary-nav" className="hidden grow md:flex">
          {entries(user).map((x, i) => (
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                pathname === x.href && "font-bold underline"
              )}
              key={i}
              href={x.href}
            >
              {x.icon && <x.icon className="mr-2 hidden h-5 w-5 lg:inline" />}
              {x.label}
            </Link>
          ))}
        </nav>
        <div className="flex grow md:hidden">
          <Sheet
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
            }}
          >
            <SheetTrigger className="text-primary-foreground">
              <SidebarOpen />
            </SheetTrigger>
            <SheetContent position="left">
              <nav id="primary-nav" className="flex flex-col items-start">
                {entries(user).map((x, i) => (
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      pathname === x.href && "text-primary font-bold underline"
                    )}
                    key={i + 100}
                    href={x.href}
                  >
                    {x.icon && <x.icon className="mr-2  h-5 w-5" />}
                    {x.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {user ? (
          <Link href="/compte">
            <User />
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "text-primary-foreground border-primary-foreground"
            )}
          >
            connexion
          </Link>
        )}
      </div>
    </div>
  );
};
