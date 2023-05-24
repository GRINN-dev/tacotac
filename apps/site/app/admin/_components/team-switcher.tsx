"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  teams: {
    label: string;
    value: string;
    pictureUrl?: string;
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

  const [selectedTeam, setSelectedTeam] = React.useState<Team> /* groups[0].teams[0] */(
    // find the team that corresponds to the current organizationSlug
    groups.flatMap((group) => group.teams).find((team) => team.value === organizationSlug) || groups[0].teams[0]
  );
  const router = useRouter();
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
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={selectedTeam.pictureUrl || `https://avatar.vercel.sh/${selectedTeam.value}.png`}
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
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                          src={team.pictureUrl || `https://avatar.vercel.sh/${team.value}.png`}
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
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">Trial for two weeks</span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">$9/month per user</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Annuler
          </Button>
          <Button type="submit">Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
