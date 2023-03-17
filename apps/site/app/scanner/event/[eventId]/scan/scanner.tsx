"use client";

import { useReducer } from "react";
import { useToast } from "@/hooks/use-toast";
import { SaveIcon } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { reducer } from "../../../../../lib/utils_reducer";
import { Cancel } from "./steps/Cancel";
import { DisplayingResults } from "./steps/DisplayingResults";
import { ManuallyEnteringPannel } from "./steps/ManuallyEnteringPannel";
import { ManuallyEnteringTicket } from "./steps/ManuallyEnteringTicket";
import { ScanReader } from "./steps/ScanReader";
import { ScanningTicket } from "./steps/ScanningTicket";
import { Start } from "./steps/Start";

export const Scanner = () => {
  const [state, dispatch] = useReducer(reducer, {
    step: "start",
  });
  const { toast } = useToast();
  console.log("state", state);

  let offlineData = [];

  if (typeof localStorage !== "undefined") {
    offlineData = JSON.parse(localStorage.getItem("offlineData")) || [];
  }

  const scanAttendeesOffline = async () => {
    const offlineData = JSON.parse(localStorage.getItem("offlineData") || "[]");
    console.log("offline", offlineData);
    return sdk()
      .ScanAttendeesOffline({
        input: {
          ticketPayloads: offlineData.map((ticket) => ({
            attendeeId: ticket?.attendeeId,
            email: ticket?.email,
            ticketNumber: ticket?.ticketNumber,
            panelNumber: ticket?.pannel,
            eventId: ticket?.eventId,
            payload: null,
          })),
        },
      })
      .finally(() => {
        localStorage.removeItem("offlineData");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="flex items-end w-6/12 ">
        {offlineData && offlineData.length > 0 ? (
          <button
            type="submit"
            className="absolute top-4 right-4"
            onClick={() => {
              console.log("synchronise");
              scanAttendeesOffline()
                .then((result) => {
                  console.log("result", result);
                  toast({
                    title: "✅ Synchronisation ok",
                  });
                })
                .catch((error) => {
                  console.log("error", error);
                  toast({
                    title: "⛔️ Echec synchronisation",
                  });
                });
            }}
          >
            <SaveIcon /> Synchroniser
          </button>
        ) : null}
      </div>
      {state.step === "start" ? (
        <Start state={state} dispatch={dispatch} />
      ) : state.step === "scanning_ticket" ? (
        <ScanningTicket state={state} dispatch={dispatch} />
      ) : state.step === "scanning_ticket_success" ? (
        <div className="flex flex-col items-center justify-center mx-auto">
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "start_scanner_pannel",
              });
            }}
          >
            Scanner le panneau
          </button>
        </div>
      ) : state.step === "scanning_pannel" ? (
        <>
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_pannel",
                payload: {
                  pannel: 123456789,
                },
              });
            }}
          >
            Assign pannel number
          </button>
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_pannel_error",
                payload: {
                  error: "le panneau n'est pas détecté",
                  ticket: state.ticket,
                },
              });
            }}
          >
            trigger error pannel
          </button>
        </>
      ) : state.step === "manually_entering_ticket" ? (
        <ManuallyEnteringTicket state={state} dispatch={dispatch} />
      ) : state.step === "manually_entering_pannel" ? (
        <ManuallyEnteringPannel state={state} dispatch={dispatch} />
      ) : state.step === "displaying_result" ? (
        <DisplayingResults state={state} dispatch={dispatch} />
      ) : state.step === "synchronizing" ? (
        <button type="button">Synchroniser</button>
      ) : null}
      <div className="flex flex-col items-center justify-center">
        <Cancel dispatch={dispatch} />
      </div>
      <div>
        <ScanReader state={state} dispatch={dispatch} />
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
