"use client";

import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";



import { sdk } from "@/lib/sdk";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";


export const SendAllEmail = ({ eventId }) => {
  const sendEmails = (eventId: string) => {
    sdk()
      .SendEmailAllAttendeeEvent({ eventId })
      .then((data) => {
        toast({
          title: "Tous les emails ont bien été envoyé",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title:
            error.response.errors[0].errcode === "RGNST"
              ? error.response.errors[0].message
              : "Oups ! une erreur est survenue",
        });
      });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="border-primary border"><Send className="text-primary mr-2 h-4 w-4" />Rappel email</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{"Êtes-vous sur de vous ? "}</p>
              <p>{"Vous allez envoyer un email à tous les participants de l'événement."}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => sendEmails(eventId)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};