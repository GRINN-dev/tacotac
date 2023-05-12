"use client";

import { useReducer } from "react";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

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
    <div className="container">
      <div className="flex items-end w-6/12 ">
        {offlineData && offlineData.length > 0 ? (
          <button
            type="submit"
            className="absolute p-2 text-white bg-red-600 rounded-md top-4 right-4"
            onClick={() => {
              console.log("synchronise");
              scanAttendeesOffline();
            }}
          >
            Synchroniser
          </button>
        ) : null}
      </div>
      {state.step === "start" ? (
        <Start state={state} dispatch={dispatch} />
      ) : state.step === "scanning_ticket" ? (
        <ScanningTicket state={state} dispatch={dispatch} />
      ) : state.step === "scanning_ticket_success" ? (
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="flex items-center mb-2">
            <p className="font-semibold text-green-700 font-zenon-bold">Scanning 1/2</p>{" "}
          </div>
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "start_scanner_pannel",
              });
            }}
          >
            <Camera className="mr-2" /> Scanner le panneau
          </button>
        </div>
      ) : state.step === "scanning_pannel" ? (
        <div className="flex flex-col items-center justify-center">
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
            Entrée manuelle du panneau
          </button>
          {/* <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_pannel",
                payload: {
                  pannel_code: 123456789,
                },
              });
            }}
          >
            Assigner num de panneau
          </button> */}
        </div>
      ) : state.step === "manually_entering_ticket" ? (
        <ManuallyEnteringTicket state={state} dispatch={dispatch} />
      ) : state.step === "manually_entering_pannel" ? (
        <ManuallyEnteringPannel state={state} dispatch={dispatch} />
      ) : state.step === "displaying_result" ? (
        <DisplayingResults state={state} dispatch={dispatch} />
      ) : null}
      <div className="flex flex-col items-center justify-center">
        <Cancel dispatch={dispatch} state={state} />
      </div>
      <div>
        <ScanReader state={state} dispatch={dispatch} />
      </div>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};
