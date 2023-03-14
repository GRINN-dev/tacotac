"use client";

import { useReducer, useState } from "react";
import { TicketPayloadInput } from "@/../../@tacotacIO/codegen/dist";
import { Camera } from "lucide-react";
import ReactModal from "react-modal";

import { sdk } from "@/lib/sdk";
import { QrReader } from "@/components/qr-reader";
import { buttonVariants } from "@/components/ui/button";
import ModalCode from "../../../modalQRCode";

interface State {
  step:
    | "start"
    | "scanning_ticket"
    | "scanning_ticket_success"
    | "scanning_pannel"
    | "manually_entering_ticket"
    | "manually_entering_pannel"
    | "displaying_error"
    | "displaying_result"
    | "synchronizing";
  //ajouter un état quand tout est ok scanné ?
  ticket?: TicketPayloadInput;
  pannel?: number;
  error?: string;
  email?: string;
}

interface Event {
  type:
    | "start_scanner"
    | "scan_ticket"
    | "start_scanner_pannel"
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

export const Scanner = () => {
  //récup infos ticket et mutation qui renverra vers le back

  const [attendeeData, setAttendeeData] = useState({ ticket: "", pannel: "" });
  console.log("DATA", attendeeData);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

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
              step: "scanning_ticket_success",
              ticket: event.payload.ticket,
            }
          : {
              step: "start",
            };
      case "start_scanner_pannel":
        return state.step === "scanning_ticket_success"
          ? {
              step: "scanning_pannel",
              ticket: state.ticket,
            }
          : { step: "start" };
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
      // case "scan_pannel":
      //   return {
      //     step: "displaying_error",
      //     ticket: state.ticket,
      //     pannel: event.payload.pannel,
      //   };

      case "scan_pannel":
        return state.step === "scanning_pannel"
          ? {
              step: "displaying_result",
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

  const [modalIsOpen, setIsOpen] = useState(true);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-40%",
      transform: "translate(-50%, -50%)",
      borderRadius: "16px",
    },
  };

  console.log("state", state);
  const scanAttendee = () =>
    sdk()
      .ScanAttendee({
        input: {
          ticketPayload: {
            attendeeId: state?.ticket?.attendeeId,
            email: state?.ticket?.email,
            ticketNumber: state?.ticket?.ticketNumber,
            panelNumber: state.pannel,
            eventId: state?.ticket?.eventId,
          },
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        // envoyer dans storage
        console.error(error);
      });
  // plus tard juste passer state.ticket
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
          {/* <button
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
          </button> */}
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
      ) : state.step === "scanning_ticket_success" ? (
        <button
          onClick={() => {
            dispatch({
              type: "start_scanner_pannel",
            });
          }}
        >
          Scanner le panneau
        </button>
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
                type: "scan_pannel",
              });
            }}
          >
            <Camera className="mr-2" /> Scanner le panneau
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
        <>
          {/* <input
            className="border"
            type="number"
            value={state.ticket || ""}
            onChange={(e) => {
              dispatch({
                type: "manually_enter_ticket",
                payload: {
                  ticket: e.target.value,
                },
              });
            }}
          /> */}
          <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_ticket",
                payload: {
                  ticket: state.ticket,
                },
              });
            }}
          >
            Confirmer
          </button>
        </>
      ) : // <ModalCode
      //   titleTrigger={"Entrez le code manuellement"}
      //   titleButton={"Valider"}
      //   onClick={() => {
      //     dispatch({
      //       type: "scan_ticket",
      //       payload: {
      //         ticket: "123456789",
      //       },
      //     });
      //   }}
      // />
      state.step === "manually_entering_pannel" ? (
        <ModalCode
          titleTrigger={"Entrez le panneau manuellement"}
          titleButton={"Valider"}
          onClick={(e) => {
            dispatch({
              type: "manually_enter_pannel",
              payload: {
                pannel: 123456789,
              },
            });
          }}
        />
      ) : state.step === "displaying_result" ? (
        <>
          {/* <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "display_result",
                payload: {
                  pannel: "123456789",
                },
              });
             
              setAttendeeData({ ticket: state.ticket, pannel: state.pannel });
              localStorage.setItem("attendeeData", JSON.stringify(attendeeData));
            }}
          >
            Synchroniser
            {/* mutation ici, pour le moment je remplis le state attendeeData*/}
          {/* </button> */}
          <ReactModal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
            <div className="flex flex-col">
              <h1 className="my-4 font-semibold text-center">Récap du scanning</h1>
              <span> Ticket: {state.ticket.ticketNumber} </span>
              <span>Panneau : {state?.pannel} </span>
              <button
                type="button"
                className={buttonVariants({ size: "sm", className: "my-4 bg-green-700" })}
                onClick={() => {
                  scanAttendee();
                }}
              >
                Valider
              </button>
            </div>
          </ReactModal>
        </>
      ) : null}
      <button
        className={buttonVariants({ size: "sm", className: "bg-red-500 text-white" })}
        onClick={() => {
          dispatch({
            type: "cancel",
          });
        }}
      >
        Annuler
      </button>
      <div>
        <QrReader
          onResult={(result, error) => {
            if (state.step === "scanning_ticket") {
              console.log(result);
              if (!!result) {
                dispatch({
                  type: "scan_ticket",
                  payload: {
                    ticket: JSON.parse(result.getText()),
                  },
                });
                console.log(state.ticket);
                // setAttendeeData({ ticket: result.getText(), pannel: "" });
              }

              if (!!error) {
                console.log(error);
              }
            } else if (state.step === "scanning_pannel") {
              if (!!result) {
                dispatch({
                  type: "scan_pannel",
                  payload: {
                    pannel: parseInt(result.getText()),
                  },
                });
              }
              if (!!error) {
                console.log(error);
              }
            }
          }}
          className="w-full"
          constraints={{}}
        />
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
