"use client";

import { FC, useReducer, useState } from "react";
import { Camera } from "lucide-react";
import { QrReader } from "react-qr-reader";

import { buttonVariants } from "@/components/ui/button";
import ModalCode from "../../modalQRCode";

interface State {
  step:
    | "start"
    | "scanning_ticket"
    | "scanning_pannel"
    | "manually_entering_ticket"
    | "manually_entering_pannel"
    | "displaying_error"
    | "displaying_result"
    | "synchronizing";
  //ajouter un état quand tout est ok scanné ?
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
    | "scan_pannel_error"
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
              step: "scanning_pannel",
              ticket: event.payload.ticket,
            }
          : {
              step: "start",
            };
      case "scan_ticket_error":
        return state.step === "scanning_ticket"
          ? {
              step: "manually_entering_ticket",
              error: event.payload.error,
            }
          : {
              step: "start",
            };
      case "manually_enter_ticket":
        return state.step === "manually_entering_ticket"
          ? {
              step: "scanning_pannel",
              ticket: event.payload.ticket,
            }
          : {
              step: "start",
            };
      // return {
      //   step: "manually_entering_ticket",
      //   ticket: event.payload?.ticket,
      // };
      // case "scan_pannel":
      //   return {
      //     step: "displaying_error",
      //     ticket: state.ticket,
      //     pannel: event.payload.pannel,
      //   };
      case "scan_pannel":
        return state.step === "scanning_pannel"
          ? {
              ...state,
              pannel: event.payload.pannel,
              step: state.ticket ? "displaying_result" : "scanning_ticket",
            }
          : {
              step: "start",
            };
      case "scan_pannel":
        return state.step === "scanning_pannel"
          ? {
              step: "scanning_pannel",
              ticket: state.ticket,
              pannel: event.payload.pannel,
            }
          : {
              step: "start",
            };
      case "scan_pannel_error":
        return state.step === "scanning_pannel"
          ? {
              step: "manually_entering_pannel",
              error: event.payload.error,
            }
          : {
              step: "start",
            };
      case "manually_enter_pannel":
        return {
          step: "manually_entering_pannel",
          ticket: state.ticket,
          pannel: event.payload?.pannel,
        };

      case "display_result":
        return {
          step: "displaying_result",
          ticket: state.ticket,
          pannel: state.pannel,
          email: event.payload?.email,
        };
      case "synchronize":
        return {
          step: "synchronizing",
          ticket: state.ticket,
          pannel: state.pannel,
          email: event.payload?.email,
        };
      case "cancel":
        return {
          step: "start",
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
            Assign ticket number
          </button>
          <div>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  dispatch({
                    type: "scan_ticket",
                    payload: {
                      ticket: Math.floor(Math.random() * 1000000000).toString(),
                    },
                  });
                }

                if (!!error) {
                  console.log(error);
                }
              }}
              className="w-full"
              constraints={undefined}
            />
          </div>
          {/* si ticket marche pas */}
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_ticket_error",
                payload: {
                  error: "le ticket n'est pas détecté",
                },
              });
            }}
          >
            trigger error ticket
          </button>
        </>
      ) : state.step === "scanning_pannel" ? (
        <>
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
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_pannel_error",
                payload: {
                  error: "le panneau n'est pas détecté",
                },
              });
            }}
          >
            trigger error pannel
          </button>
        </>
      ) : state.step === "manually_entering_ticket" ? (
        <ModalCode
          titleTrigger={"Entrez le code manuellement"}
          titleButton={"Valider"}
          onClick={() => {
            dispatch({
              type: "scan_ticket",
              payload: {
                ticket: "123456789",
              },
            });
          }}
        />
      ) : state.step === "manually_entering_pannel" ? (
        <ModalCode
          titleTrigger={"Entrez le panneau manuellement"}
          titleButton={"Valider"}
          onClick={() => {
            dispatch({
              type: "scan_pannel",
              payload: {
                pannel: "123456789",
              },
            });
          }}
        />
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
          Synchroniser
          {/* mutation ici */}
        </button>
      ) : null}
      <button
        className={buttonVariants({ size: "sm", className: "bg-red-600 text-white" })}
        onClick={() => {
          dispatch({
            type: "cancel",
          });
        }}
      >
        Annuler
      </button>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
