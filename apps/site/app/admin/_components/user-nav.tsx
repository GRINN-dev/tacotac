"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { GetCurrentUserQuery } from "@/../../@tacotacIO/codegen/dist";
import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserNav: FC<{ currentUser: GetCurrentUserQuery["currentUser"] }> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatarUrl} alt="@shadcn" />
            <AvatarFallback>
              {currentUser.firstname[0].toUpperCase() + currentUser.lastname[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.firstname}</p>
            <p className="text-muted-foreground text-xs leading-none">{currentUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push("/compte")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            sdk()
              .Logout()
              .then(({ logout: { success } }) => {
                if (success) {
                  router.push("/login");
                }
              });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
