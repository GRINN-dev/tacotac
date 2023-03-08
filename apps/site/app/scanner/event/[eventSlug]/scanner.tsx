"use client";

import { FC, useReducer } from "react";
import { Camera } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface State {
  step:
    | "start"
    | "scan_ticket"
    | "scan_pannel"
    | "manually_enter_ticket"
    | "manually_enter_pannel"
    | "display_error"
    | "display_result";
  ticket?: string;
  pannel?: string;
  error?: string;
  email?: string;
}

interface Event {
  type:
    | "start_scanner"
    | "scan_ticket"
    | "scan_pannel"
    | "manually_enter_ticket"
    | "manually_enter_pannel"
    | "display_result"
    | "synchronize"
    | "cancel";
  payload?: Omit<State, "step">;
}

export const Scanner: FC = () => {
  const [state, dispatch] = useReducer(
    (state: State, event: Event) => {
      switch (event.type) {
        case "start_scanner":
          return state.step === "start"
            ? {
                step: "scan_ticket",
              }
            : { step: "start" };

        case "scan_ticket":
          return state.step === "scan_ticket"
            ? {
                step: "scan_pannel",
                ticket: event.payload.ticket,
              }
            : {
                step: "start",
              };
        case "scan_pannel":
          return {
            step: "display_result",
            ticket: state.ticket,
            pannel: event.payload.pannel,
          };
        default:
          return state;
      }
    },
    {
      step: "start",
    }
  );

  return (
    <div>
      {state.step === "start" ? (
        <button
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            dispatch({
              type: "start_scanner",
            });
          }}
        >
          <Camera className="mr-2" /> Commencer à scanner
        </button>
      ) : state.step === "scan_ticket" ? (
        <button
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            dispatch({
              type: "scan_ticket",
              payload: {
                ticket: "123456789",
              },
            });
          }}
        >
          Assign tiket number
        </button>
      ) : state.step === "scan_pannel" ? (
        <button
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            dispatch({
              type: "scan_pannel",
              payload: {
                pannel: "123456789",
              },
            });
          }}
        >
          Assign pannel number
        </button>
      ) : state.step === "display_result" ? (
        <button
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            dispatch({
              type: "display_result",
              payload: {
                pannel: "123456789",
              },
            });
          }}
        >
          Display result
        </button>
      ) : null}

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
