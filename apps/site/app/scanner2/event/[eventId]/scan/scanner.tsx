"use client";

import { FC, useReducer } from "react";
import Link from "next/link";
import { GetEventByIdQuery } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { useMachine } from "@xstate/react";
import { ArrowLeft, Camera } from "lucide-react";
import { assign } from "xstate";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { useQrReader } from "@/components/qr-reader";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { reducer } from "../../../../../lib/utils_reducer";
import { scannerMachine } from "./scanner-machine";

export const Scanner: FC<{ event: GetEventByIdQuery["event"] }> = ({ event }) => {
  const { toast } = useToast();

  const [state, send] = useMachine(scannerMachine({ eventId: event.id }), {
    actions: {
      saveOffline: () => {
        console.log("saved offline");
      },
      refresh: () => {
        console.log("refresh");
      },
    },
  });

  useQrReader({
    constraints: {
      facingMode: "environment",
    },
    scanDelay: 500,
    onResult: (result, error) => {
      if (state.matches("scanning-ticket")) {
        if (!!result) {
          /*   dispatch({
            type: "scan_ticket",
            payload: {
              ticket: JSON.parse(result.getText()),
            },
          }); */
        }
        if (!!error) {
          console.log(error);
        }
      } else if (state.matches("scanning-panel")) {
        if (!!result) {
          /*   dispatch({
            type: "scan_pannel",
            payload: {
              pannel: parseInt(result.getText()),
            },
          }); */
        }
        if (!!error) {
          console.log(error);
        }
      }
    },
    videoId: "qr-reader",
  });

  let offlineData = [];

  if (typeof localStorage !== "undefined") {
    offlineData = JSON.parse(localStorage.getItem("offlineData")) || [];
  }

  const scanAttendeesOffline = async () => {
    const offlineData = JSON.parse(localStorage.getItem("offlineData") || "[]");
    console.log("offline", offlineData);
    try {
      const response = await sdk().ScanAttendeesOffline({
        input: {
          ticketPayloads: offlineData,
        },
      });
      localStorage.removeItem("offlineData");
      toast({
        title: "✅ Synchronisation réussie",
      });
      return response;
    } catch (error) {
      console.log(error);
      toast({
        title: "⛔️ Echec synchronisation, réessayez plus tard",
      });
      return error;
    }
  };

  return (
    <div className="bg-muted flex h-full w-full flex-col">
      <div className="bg-muted relative mx-auto flex w-full max-w-2xl justify-center">
        <video className="relative aspect-square object-cover object-center" muted id="qr-reader" />
        <div
          className={cn(
            state.matches("scanning-panel") || state.matches("scanning-ticket")
              ? "hidden"
              : "absolute inset-0 grid place-content-center backdrop-blur-xl"
          )}
        >
          {state.matches("idle") && (
            <Button className="" onClick={() => send({ type: "START_SCANNING" })}>
              start scanning
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="bg-background container -mt-6 max-w-2xl grow rounded-t-xl pt-4">
        {state.matches("idle") ? (
          <>
            <h1 className="line-clamp-2 text-lg font-bold">{event.name}</h1>
            <div className="text-muted-foreground flex items-center text-xs">
              <p>
                {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <Separator orientation="vertical" className=" mx-2 h-4" />
              <p>{event.city}</p>
            </div>
            <p className="mt-4">
              {event?.totalConfirmedRegistrations} présents / {event?.totalRegistrations} inscrits
            </p>
            <p className="text-xs">
              <b>capicité :</b> {event?.capacity} places
            </p>
            <div className="mt-4 grid gap-2">
              <Button size="sm" variant="secondary">
                Trouver un inscrit
              </Button>
              <Button size="sm" variant="outline">
                Inscire
              </Button>
              <Link href={"/scanner2"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                <ArrowLeft className="mr-2 h-4 w-4 " /> retour aux événements
              </Link>
            </div>
            <div className="fixed top-4 right-4">
              <ThemeToggle />
            </div>
          </>
        ) : state.matches("scanning-ticket") ? (
          <h1 className="line-clamp-2 text-lg font-bold">scanning ticket</h1>
        ) : state.matches("scanning-panel") ? (
          <h1 className="line-clamp-2 text-lg font-bold">scanning panel</h1>
        ) : state.matches("error") ? (
          <h1 className="line-clamp-2 text-lg font-bold">error</h1>
        ) : state.matches("fetching-attendee") ? (
          <h1 className="line-clamp-2 text-lg font-bold">fetching attendee</h1>
        ) : state.matches("submitting") ? (
          <h1 className="line-clamp-2 text-lg font-bold">submitting</h1>
        ) : state.matches("verifying-tiket") ? (
          <h1 className="line-clamp-2 text-lg font-bold">verifying ticket</h1>
        ) : state.matches("display-fetched-attendee-and-panel") ? (
          <h1 className="line-clamp-2 text-lg font-bold">display fetched</h1>
        ) : state.matches("display-scanned-ticket-and-panel") ? (
          <h1 className="line-clamp-2 text-lg font-bold">display scanned</h1>
        ) : (
          <h1 className="line-clamp-2 text-lg font-bold">{state.value}</h1>
        )}
      </ScrollArea>
    </div>
  );
};
