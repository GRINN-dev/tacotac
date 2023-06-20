"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CreateOrganizationForm } from "@/forms/organization/create-organization/form";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  teams: {
    label: string;
    value: string;
    pictureUrl?: string;
    isCurrent?: boolean;
  }[];
  organizationSlug?: string;
}

export const TeamSwitcher = ({ className, teams, organizationSlug }: TeamSwitcherProps) => {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const groups = [
    {
      label: "Vue d'ensemble",
      teams: [
        {
          label: "Tout",
          value: "all",
        },
      ],
    },
    {
      label: "Organisations",
      teams: [...teams],
    },
  ];

  type Team = (typeof groups)[number]["teams"][number];

  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups.flatMap(({ teams }) => teams).find(({ isCurrent }) => isCurrent) || groups[0].teams[0]
  );
  const router = useRouter();
  const toaster = useToast();
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={
                  selectedTeam.pictureUrl ||
                  `https://avatar.vercel.sh/${selectedTeam.value}.svg?text=${selectedTeam.label
                    .split(" ")
                    .filter((word) => word.length > 1)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}`
                }
                alt={selectedTeam.label}
              />
              <AvatarFallback>
                {selectedTeam.label
                  .split(" ")
                  .filter((word) => word.length > 1)
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      value={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                        if (team.value === "all") {
                          router.push("/admin/all");
                        } else {
                          router.push(`/admin/${team.value}`);
                        }
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={
                            team.pictureUrl ||
                            `https://avatar.vercel.sh/${team.value}.svg?text=${team.label
                              .split(" ")
                              .filter((word) => word.length > 1)
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")}`
                          }
                          alt={team.label}
                        />
                        <AvatarFallback>
                          {team.label
                            .split(" ")
                            .filter((word) => word.length > 1)
                            .slice(0, 2)
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {team.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Créer une équipe
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une équipe</DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle équipe afin qu&apos;elle prenne en charge la gestion de ses propres évènements.
          </DialogDescription>
        </DialogHeader>
        <div>
          <CreateOrganizationForm
            onSuccess={({
              createOrganization: {
                organization: { slug },
              },
            }) => {
              setShowNewTeamDialog(false);
              router.push(`/admin/${slug}/infos`);
              toaster.toast({
                title: "Équipe créée",
                description: "L'équipe a été créée avec succès.",
                variant: "default",
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
