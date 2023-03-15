"use client";

import { useReducer, useState } from "react";
import { TicketPayloadInput } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import ReactModal from "react-modal";

import { sdk } from "@/lib/sdk";
import { QrReader } from "@/components/qr-reader";
import { buttonVariants } from "@/components/ui/button";
import { reducer } from "../../../../../lib/utils_reducer";
import ModalCode from "../../../modalQRCode";

export const Scanner = () => {
  //récup infos ticket et mutation qui renverra vers le back

  // const [attendeeData, setAttendeeData] = useState({ ticket: "", pannel: "" });

  function closeModal() {
    setIsOpen(false);
  }

  const [state, dispatch] = useReducer(reducer, {
    step: "start",
  });
  const { toast } = useToast();

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
  const scanAttendeesOffline = () => {
    sdk().ScanAttendeesOffline({
      input: {
        ticketPayloads: [{ ...state, panelNumber: state.pannel }],
      },
    });
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
          <ReactModal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
            <div className="flex flex-col">
              <h1 className="my-4 font-semibold text-center">Récap du scanning</h1>
              <span className="font-medium">
                {state.ticket?.firstname} {state?.ticket?.lastname}
              </span>
              <span>Email : {state?.ticket?.email}</span>
              <span>Panneau : {state?.pannel} </span>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={buttonVariants({ size: "sm", className: "my-4 bg-green-700 w-6/12 " })}
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
                        //set local storage
                        //btn synchro pour récup localstorage et passer le tableau dans la mutation
                        // envoyer dans storage avec mutation scanAttendeesOffline
                        console.error(error);
                      })
                      .then(() => localStorage.setItem("offlineData", JSON.stringify(state.ticket)))
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
