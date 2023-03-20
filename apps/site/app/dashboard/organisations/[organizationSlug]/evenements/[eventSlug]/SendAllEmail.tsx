"use client";

import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Button, buttonVariants } from "@/components/ui/button";

export const SendAllEmail = ({ eventId }) => {
  const sendEmails = (eventId: string) => {
    sdk()
      .SendEmailAllAttendeeEvent({ eventId })
      .then((data) => {
        return toast({
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
      <Button
        onClick={() => sendEmails(eventId)}
        variant="ghost"
        size="sm"
        className={buttonVariants({ variant: "outline", size: "lg" })}
      >
        <Send className="mr-2 h-4 w-4" />
        <span className="sr-only">Toggle</span>
        Rappel email
      </Button>
    </>
  );
};
