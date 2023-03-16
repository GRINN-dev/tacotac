"use client";

import { useReducer, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Camera, Plus, PlusCircle, SaveIcon } from "lucide-react";
import ReactModal from "react-modal";

import { sdk } from "@/lib/sdk";
import { QrReader } from "@/components/qr-reader";
import { buttonVariants } from "@/components/ui/button";
import { reducer } from "../../../../../lib/utils_reducer";
import { Ticket } from "./types";

export const Scanner = () => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const closePannelModal = () => {
    setIsPannelModalOpen(false);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  const [state, dispatch] = useReducer(reducer, {
    step: "start",
  });
  const { toast } = useToast();

  const [resultModalIsOpen, setIsOpen] = useState(true);
  const [isPannelModalOpen, setIsPannelModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [manualPannel, setManualPannel] = useState<number>();
  const [manualTicket, setManualTicket] = useState<string>();
  const [manualEmail, setManualEmail] = useState<string>();
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
  const scanAttendeesOffline = () => {
    sdk()
      .ScanAttendeesOffline({
        input: {
          ticketPayloads: [
            {
              attendeeId: state?.ticket?.attendeeId,
              email: !state?.ticket?.email ? manualEmail : state?.ticket?.email,
              ticketNumber: state?.ticket?.ticketNumber,
              panelNumber: state?.pannel,
              eventId: state?.ticket?.eventId,
              payload: null,
            },
          ],
        },
      })
      .then((result) => console.log(result));
  };
  const scanAttendee = () =>
    sdk().ScanAttendee({
      input: {
        ticketPayload: {
          attendeeId: state?.ticket?.attendeeId,
          email: state?.ticket?.email,
          ticketNumber: state?.ticket?.ticketNumber,
          panelNumber: state?.pannel,
          eventId: state?.ticket?.eventId,
          payload: null,
        },
      },
    });

  // const updateLocalStorageData = (data) => {
  //   localStorage.setItem(
  //     "offlineData",
  //     JSON.stringify([...JSON.parse(localStorage.getItem("offlineData") || "[]"), data])
  //   );
  // };
  // const offlineData = JSON.parse(localStorage.getItem("offlineData"));

  return (
    <div className="container">
      <div className="flex items-end w-6/12 ">
        {/* {offlineData && offlineData.length > 0 ? ( */}
        <button
          type="button"
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            dispatch({ type: "synchronize" });
            scanAttendeesOffline();
          }}
        >
          <SaveIcon /> Synchroniser
        </button>
        {/* ) : null} */}
      </div>
      {state.step === "start" ? (
        <div className="flex flex-col items-center justify-center">
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
        </div>
      ) : state.step === "scanning_ticket" ? (
        <>
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
          {/* <button
            className={buttonVariants({ size: "sm" })}
            onClick={() => {
              dispatch({
                type: "scan_pannel",
              });
            }}
          >
            <Camera className="mr-2" /> Scanner le panneau
          </button> */}
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
        <>
          <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setIsTicketModalOpen(true)}>
            Entrée manuelle
          </button>
          <ReactModal style={customStyles} isOpen={isTicketModalOpen}>
            <div className="flex flex-col gap-1">
              {" "}
              Entrez un numéro de ticket :
              <input
                className="border rounded-md"
                type="text"
                value={manualTicket}
                onChange={(e) => {
                  setManualTicket(e.target.value);
                }}
              />
              <button
                className={buttonVariants({ size: "sm", className: "mx-6" })}
                onClick={() => {
                  dispatch({
                    type: "manually_enter_ticket",
                    payload: {
                      ticket: { signCode: manualTicket },
                    },
                  });
                  closeTicketModal();
                }}
              >
                Valider
              </button>
            </div>
          </ReactModal>
        </>
      ) : state.step === "manually_entering_pannel" ? (
        <>
          <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setIsPannelModalOpen(true)}>
            Entrée manuelle
          </button>
          <ReactModal style={customStyles} isOpen={isPannelModalOpen}>
            <div className="flex flex-col gap-1">
              {" "}
              Entrez un numéro de panneau :
              <input
                className="border rounded-md"
                type="number"
                value={manualPannel}
                onChange={(e) => {
                  setManualPannel(parseInt(e.target.value));
                }}
              />
              <button
                className={buttonVariants({ size: "sm", className: "mx-6" })}
                onClick={() => {
                  dispatch({
                    type: "manually_enter_pannel",
                    payload: {
                      pannel: manualPannel,
                    },
                  });
                  closePannelModal();
                }}
              >
                Valider
              </button>
            </div>
          </ReactModal>
        </>
      ) : state.step === "displaying_result" ? (
        <>
          <ReactModal isOpen={resultModalIsOpen} style={customStyles} onRequestClose={closeModal}>
            <div className="flex flex-col p-2">
              <h1 className="font-semibold text-center">Récapitulatif du scanning</h1>
              {!state?.ticket?.email ? (
                <p className="mb-4 text-xs text-red-600">Aucun email renseigné, souhaitez-vous en ajouter un ?</p>
              ) : (
                ""
              )}
              <span>Nom : {state?.ticket?.lastname}</span>
              <span>Prénom : {state.ticket?.firstname}</span>
              <span className="flex items-center">
                Email :{" "}
                {!state?.ticket?.email ? (
                  <div className="flex items-center">
                    <input
                      className="ml-2 border rounded-md"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                    />{" "}
                    <button
                      type="button"
                      onClick={() => {
                        console.log("+++++", state?.ticket?.attendeeId);
                        sdk()
                          .UpdateAttendee({
                            input: { patch: { email: manualEmail }, id: state?.ticket?.attendeeId },
                          })
                          .then(() => toast({ title: "✅ Email ajouté" }))
                          .catch((error) => console.log(error));
                      }}
                    >
                      <PlusCircle className="ml-2" />
                    </button>
                  </div>
                ) : (
                  state?.ticket?.email
                )}
                {/* update attendee ici du coup ? */}
              </span>
              <span>Panneau : {state?.pannel} </span>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={buttonVariants({ size: "sm", className: "mt-12 bg-green-700 w-6/12 " })}
                  onClick={() => {
                    scanAttendee()
                      .then(() => closeModal())
                      .then((result) => {
                        console.log("result", result);
                        toast({
                          title: "✅ Scan ok",
                          description: "Participation scannée avec succès",
                        });
                      })

                      .catch((error) => {
                        console.log("error", error);
                        toast({
                          title: "⛔️ L'enregistrement a échoué",
                          description: "Vous pourrez synchroniser plus tard",
                        });
                        dispatch({
                          type: "synchronize",
                          payload: {
                            error:
                              "L'enregistrement n'a pas fonctionné, les informations vont être stockées localement",
                          },
                        });
                        console.error(error);
                      })
                      .then(() => localStorage.setItem("offlineData", JSON.stringify(state.ticket)))
                      // .then(() => updateLocalStorageData(state.ticket))
                      .then(() =>
                        dispatch({
                          type: "start_scanner",
                        })
                      );
                  }}
                >
                  Valider
                </button>
              </div>
            </div>
          </ReactModal>
        </>
      ) : state.step === "synchronizing" ? (
        <button type="button">Synchroniser</button>
      ) : null}
      <div className="flex flex-col items-center justify-center">
        <button
          className="p-2 m-2 text-sm text-white bg-red-700 border-none rounded-md"
          onClick={() => {
            dispatch({
              type: "cancel",
            });
          }}
        >
          Annuler
        </button>
      </div>

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
          className="flex flex-col w-6/12 mx-auto"
          constraints={{}}
        />
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
