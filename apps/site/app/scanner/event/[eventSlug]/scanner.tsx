"use client";

import { FC, useReducer } from "react";
import { Camera } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface State {
  step:
    | "start"
    | "scanning_ticket"
    | "scanning_pannel"
    | "manually_entering_ticket"
    | "manually_entering_pannel"
    | "displaying_error"
    | "displaying_result";
  ticket?: string;
  pannel?: string;
  error?: string;
  email?: string;
}

interface Event {
  type:
    | "start_scanner"
    | "scan_ticket"
    | "scan_ticket_error"
    | "scan_pannel"
    | "manually_enter_ticket"
    | "manually_enter_pannel"
    | "display_result"
    | "synchronize"
    | "cancel";
  payload?: Omit<State, "step">;
}

export const Scanner: FC = () => {
  const reducer: (state: State, event: Event) => State = (state, event) => {
    switch (event.type) {
      case "start_scanner":
        return state.step === "start"
          ? {
              step: "scanning_ticket",
            }
          : { step: "start" };

      case "scan_ticket":
        return state.step === "scanning_ticket"
          ? {
              step: "scanning_ticket",
              ticket: event.payload.ticket,
            }
          : {
              step: "start",
            };
      case "scan_ticket_error":
        return state.step === "scanning_ticket"
          ? {
              step: "manually_entering_pannel",
              error: event.payload.error,
            }
          : {
              step: "start",
            };
      case "scan_pannel":
        return {
          step: "displaying_error",
          ticket: state.ticket,
          pannel: event.payload.pannel,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    step: "start",
  });

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
      ) : state.step === "scanning_ticket" ? (
        <>
          {" "}
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
          {/* si ca marche pas */}
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_ticket_error",
                payload: {
                  error: "le ticket n;est pas detecte",
                },
              });
            }}
          >
            trigger error
          </button>
        </>
      ) : state.step === "scanning_pannel" ? (
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
      ) : state.step === "displaying_result" ? (
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
