"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateOrganizationForm } from "@/forms/organization/create-organization/form";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export const AddNewTeamCard: FC = () => {
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      <p className="">Vous n&apos;appartenez à aucune équipe pour le moment</p>
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-auto">
            Créer une nouvelle équipe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle équipe</DialogTitle>
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
                toast({
                  title: "Équipe créée",
                  description: "L'équipe a été créée avec succès.",
                  variant: "default",
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
