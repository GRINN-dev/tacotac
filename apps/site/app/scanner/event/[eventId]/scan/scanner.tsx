"use client";

import { FC, memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CreateAttendeeForm2 } from "@/app/inscription/[organizationSlug]/[eventSlug]/iframe/form/create-attendee-form";
import { useStickyState } from "@/hooks/use-sticky-state";
import { GetEventByIdQuery, ScanAttendeesAsyncInput, ScanAttendeesAsyncPayload } from "@tacotacIO/codegen";
import { useMachine } from "@xstate/react";
import { ArrowLeft, QrCode, Ticket } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { useQrReader } from "@/components/qr-reader";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input, Label } from "@/components/ui";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { FindAttendee } from "./find-attendee";
import { scannerMachine } from "./scanner-machine";

export const Scanner: FC<{ event: GetEventByIdQuery["event"] }> = ({ event }) => {
  const { toast } = useToast();
  const [offlineData, setOfflineData] = useStickyState<ScanAttendeesAsyncInput["payloads"]>([], "offline-data");

  const [state, send] = useMachine(scannerMachine, {
    context: {
      ticket: {
        number: "",
        isMissingEmail: false,
        isVIP: false,
        fullName: "",
        event: "",
      },
      panel: null,
      attendee: null,
      email: "",
      error: "null",
      eventId: event.id,
    },

    actions: {
      saveOffline: (context) => {
        console.log("saved offline");
        /* localStorage.setItem(
          "offlineData",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("offlineData") || "[]"),
            {
              email: context.email,
              panelNumber: context.panel,
              ticketNumber: context.ticket.number,
              metadata: context,
            } as ScanAttendeesAsyncInput["payloads"][0],
          ])
        ); */
        setOfflineData([
          ...offlineData,
          {
            email: context.email,
            panelNumber: context.panel,
            ticketNumber: context.ticket.number,
            metadata: context,
          } as ScanAttendeesAsyncInput["payloads"][0],
        ]);
      },
      refresh: () => {
        console.log("refresh");
      },
    },
  });

  const [ticketNumber, setTicketNumber] = useState("");
  const [panelNumber, setPanelNumber] = useState("");

  // get the number of attendees to synchronize
  const numberOfAttendeesToSynchronize = offlineData.length;

  const scanAttendeesOffline = async () => {
    const response = await sdk().ScanAttendeesOffline({
      input: {
        payloads: offlineData,
      },
    });
    localStorage.removeItem("offlineData");
    if (response.scanAttendeesAsync?.boolean) {
      toast({
        title: "✅ Synchronisation réussie",
      });
      setOfflineData([]);
      return response;
    } else {
      toast({
        title: "⛔️ Echec synchronisation, réessayez plus tard",
      });
    }
  };

  const VideoReader = memo(function Video() {
    useQrReader({
      constraints: {
        facingMode: "environment",
      },
      scanDelay: 500,
      onResult: (result, error) => {
        if (state.matches("scanning-ticket")) {
          if (!!result) {
            const rawTicket = JSON.parse(result.getText());
            send({
              type: "SCAN_TICKET",
              payload: {
                fullName: rawTicket.name,
                isMissingEmail: !rawTicket.email,
                isVIP: rawTicket.vip,
                number: rawTicket.t_num,
                event: rawTicket.event,
              },
            });
          }
        } else if (state.matches("scanning-panel")) {
          if (!!result) {
            const rawPanel = result.getText();
            typeof JSON.parse(rawPanel) !== "object" &&
              send({
                type: "SCAN_PANEL",
                payload: rawPanel,
              });
          }
          if (!!error) {
            console.log(error);
          }
        }
      },
      videoId: "qr-reader",
    });
    return (
      <video
        className={cn(
          "relative object-cover object-center transition-all",
          state.matches("scanning-panel") || state.matches("scanning-ticket") ? "aspect-square" : "aspect-video"
        )}
        muted
        id="qr-reader"
      />
    );
  });
  return (
    <div className="bg-muted flex h-full w-full flex-col">
      <div className="bg-muted relative mx-auto flex w-full max-w-2xl justify-center">
        <VideoReader />
        <div
          className={cn(
            state.matches("scanning-panel") || state.matches("scanning-ticket")
              ? "hidden"
              : "absolute inset-0 grid place-content-center backdrop-blur-xl"
          )}
        >
          {state.matches("idle") && (
            <Button className="" onClick={() => send({ type: "START_SCANNING" })}>
              <QrCode className="mr-2 h-4 w-4" /> Scanner
            </Button>
          )}
        </div>
        {
          // si il y a des billets à synchroniser, mettre un bouton

          numberOfAttendeesToSynchronize > 0 && (
            <div
              className={cn(
                "bg-background absolute left-0 top-0 m-4 grid place-content-center rounded-full shadow-xl",
                state.matches("scanning-panel") || state.matches("scanning-ticket") ? "hidden" : "grid"
              )}
            >
              <Button
                variant="secondary"
                className="p-2"
                onClick={() => {
                  scanAttendeesOffline();
                }}
              >
                <Ticket size={24} /> {numberOfAttendeesToSynchronize} billets à synchroniser
              </Button>
            </div>
          )
        }
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
              {event?.totalConfirmedRegistrations} présents / {event?.attendees.totalCount} inscrits
            </p>
            <p className="text-xs">
              <b>capicité :</b> {event?.capacity} places
            </p>
            <div className="mt-4 grid gap-2">
              <FindAttendee
                eventId={event.id}
                onSelect={(attendee) => {
                  console.log("attendee", attendee);
                  send({
                    type: "SELECT_ATTENDEE",
                    payload: attendee,
                  });
                }}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Inscire
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CreateAttendeeForm2 event={event} />
                </DialogContent>
              </Dialog>
              <Link href={"/scanner"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                <ArrowLeft className="mr-2 h-4 w-4 " /> retour aux événements
              </Link>
            </div>
            <div className="fixed right-4 top-4">
              <ThemeToggle />
            </div>
          </>
        ) : state.matches("scanning-ticket") ? (
          <>
            <h1 className="line-clamp-2 text-lg font-bold">Scanner le ticket</h1>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                ticketNumber &&
                  send({
                    type: "ENTER_TICKET_NUMBER",
                    payload: ticketNumber,
                  });
              }}
            >
              <Label htmlFor="ticket">no. ticket</Label>
              <Input id="ticket" required value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} />
              <Button disabled={!ticketNumber} type="submit" className="mt-4">
                Entrée manuelle
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => {
                  send({ type: "CANCEL" });
                }}
              >
                Annuler
              </Button>
            </form>
          </>
        ) : state.matches("scanning-panel") ? (
          <>
            <h1 className="line-clamp-2 text-lg font-bold">Scanner le panneau</h1>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                panelNumber &&
                  send({
                    type: "ENTER_PANEL_NUMBER",
                    payload: panelNumber,
                  });
              }}
            >
              <Label htmlFor="panel">no. panneau</Label>
              <Input id="panel" required value={panelNumber} onChange={(e) => setPanelNumber(e.target.value)} />
              <Button disabled={!panelNumber} type="submit" className="mt-4">
                Entrée manuelle
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  send({ type: "CANCEL" });
                }}
              >
                Annuler
              </Button>
            </form>
          </>
        ) : state.matches("error") ? (
          <>
            <h1 className="line-clamp-2 text-lg font-bold">Erreur</h1>
            <p>{state.context.error || "Une erreur est survenue, veuillez réessayer"}</p>
            <Button
              onClick={() => {
                send({ type: "RESTART" });
              }}
            >
              Redémarrer
            </Button>
          </>
        ) : state.matches("fetching-attendee") ? (
          <h1 className="line-clamp-2 animate-pulse text-lg font-bold">Chargement du billet</h1>
        ) : state.matches("submitting") ? (
          <h1 className="line-clamp-2 animate-pulse text-lg font-bold">enregistrement</h1>
        ) : state.matches("verifying-tiket") ? (
          <h1 className="line-clamp-2 animate-pulse text-lg font-bold">Validation du billet</h1>
        ) : state.matches("display-fetched-attendee-and-panel") ? (
          <>
            <h1 className="line-clamp-2 text-lg font-bold">Votre billet</h1>
            <dl className="grid grid-cols-2 [&>dt]:mr-2 [&>dt]:text-end [&>dt]:font-bold">
              <dt>Panneau no.</dt>
              <dd>{state.context.panel}</dd>
              <dt>Ticket no.</dt>
              <dd>{state.context.ticket.number}</dd>
              <dt>Nom</dt>
              <dd>
                {state.context.attendee.firstname} {state.context.attendee.lastname}
              </dd>
              <dt>VIP</dt>
              <dd>{state.context.attendee.isVip ? "oui" : "non"}</dd>
            </dl>
            {!state.context.attendee.email ? (
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  send({ type: "SUBMIT" });
                }}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={state.context.email}
                  onChange={(e) => {
                    send({ type: "ENTER_EMAIL", payload: e.target.value });
                  }}
                />
                <Button type="submit">
                  <Ticket className="h-6 w-6" /> Composter
                </Button>
              </form>
            ) : (
              <Button className="mt-4" onClick={() => send({ type: "SUBMIT" })}>
                <Ticket className="h-6 w-6" /> Composter
              </Button>
            )}
          </>
        ) : state.matches("display-scanned-ticket-and-panel") ? (
          <>
            {" "}
            <h1 className="line-clamp-2 text-lg font-bold">Synchronisation impossible</h1>
            <p>Nous avons scanné les informations suivantes, nous les synchroniserons ultérieurement</p>{" "}
            <dl className="grid grid-cols-2 [&>dt]:mr-2 [&>dt]:text-end [&>dt]:font-bold">
              <dt>Panneau no.</dt>
              <dd>{state.context.panel}</dd>
              <dt>Ticket no.</dt>
              <dd>{state.context.ticket.number}</dd>
              <dt>Nom</dt>
              <dd>{state.context.ticket.fullName}</dd>
              <dt>VIP</dt>
              <dd>{state.context.ticket.isVIP ? "oui" : "non"}</dd>
            </dl>
            <Button className="mt-4" onClick={() => send({ type: "SAVE_OFFLINE" })}>
              <Ticket className="h-6 w-6" /> Sauvegarder
            </Button>
          </>
        ) : (
          <pre>{JSON.stringify(state.value, null, 2)}</pre>
        )}
      </ScrollArea>
    </div>
  );
};
