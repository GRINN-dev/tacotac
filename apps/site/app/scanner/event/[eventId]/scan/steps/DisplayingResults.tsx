"use client";

import { Dispatch, FC, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import ReactModal from "react-modal";

import { sdk } from "@/lib/sdk";
import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const DisplayingResults: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [manualEmail, setManualEmail] = useState<string>();
  const [resultModalIsOpen, setIsOpen] = useState<boolean>(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const emailPattern = /^\S+@\S+$/i;

  const closeModal = () => {
    setIsOpen(false);
  };
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
  const scanAttendee = () =>
    sdk().ScanAttendee({
      input: {
        ticketPayload: {
          ...state.ticket,
          panelNumber: state.pannel,
          email: state.email,
        },
      },
    });
  return (
    <>
      {state.step === "displaying_result" ? (
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <DialogTitle className="mb-2 font-semibold">Récapitulatif du scanning</DialogTitle>
              <fieldset className="mb-[15px] flex flex-col items-start justify-start ">
                <span>Nom : {state?.ticket?.lastname}</span>
                <span>Prénom : {state.ticket?.firstname}</span>
                <span className="flex items-center">
                  Email :{" "}
                  {!state?.ticket?.email ? (
                    <div className="flex items-center">
                      <form
                        onSubmit={() =>
                          dispatch({
                            type: "display_result",
                            payload: {
                              email: manualEmail,
                            },
                          })
                        }
                      >
                        {" "}
                        <input
                          type="email"
                          className="p-1 ml-2 border rounded-md"
                          value={manualEmail}
                          onChange={(e) => setManualEmail(e.target.value)}
                        />{" "}
                        {errorEmail === true ? <p className="text-red-600">Mail invalide</p> : ""}
                      </form>

                      <button
                        type="submit"
                        onClick={() => {
                          manualEmail.match(emailPattern)
                            ? dispatch({
                                type: "display_result",
                                payload: {
                                  email: manualEmail,
                                },
                              })
                            : setErrorEmail(true);
                        }}
                      >
                        <PlusCircle className="ml-2" />
                      </button>
                    </div>
                  ) : (
                    state?.ticket?.email
                  )}
                </span>
                <span>Panneau : {state?.pannel_code} </span>
                <DialogClose>
                  <button
                    type="button"
                    className="p-2 text-white bg-green-700 rounded-md"
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
                        .then(() => {
                          localStorage.setItem(
                            "offlineData",
                            JSON.stringify([...JSON.parse(localStorage.getItem("offlineData") || "[]"), state.ticket])
                          ),
                            console.log("synched in storage");
                        })
                        .then(() =>
                          dispatch({
                            type: "start_scanner",
                          })
                        );
                    }}
                  >
                    Valider
                  </button>
                </DialogClose>
              </fieldset>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ) : null}
      {/* <ReactModal isOpen={state.step === "displaying_result"} style={customStyles} onRequestClose={closeModal}>
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
                <form
                  onSubmit={() =>
                    dispatch({
                      type: "display_result",
                      payload: {
                        email: manualEmail,
                      },
                    })
                  }
                >
                  {" "}
                  <input
                    type="email"
                    className="p-1 ml-2 border rounded-md"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                  />{" "}
                  {errorEmail === true ? <p className="text-red-600">Mail invalide</p> : ""}
                </form>

                <button
                  type="submit"
                  onClick={() => {
                    manualEmail.match(emailPattern)
                      ? dispatch({
                          type: "display_result",
                          payload: {
                            email: manualEmail,
                          },
                        })
                      : setErrorEmail(true);
                  }}
                >
                  <PlusCircle className="ml-2" />
                </button>
              </div>
            ) : (
              state?.ticket?.email
            )}
          </span>
          <span>Panneau : {state?.pannel_code} </span>
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
                        error: "L'enregistrement n'a pas fonctionné, les informations vont être stockées localement",
                      },
                    });
                    console.error(error);
                  })
                  .then(() => {
                    localStorage.setItem(
                      "offlineData",
                      JSON.stringify([...JSON.parse(localStorage.getItem("offlineData") || "[]"), state.ticket])
                    ),
                      console.log("synched in storage");
                  })
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
      </ReactModal> */}
    </>
  );
};
