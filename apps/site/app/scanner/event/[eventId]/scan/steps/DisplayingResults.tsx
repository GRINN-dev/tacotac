"use client";

import { Dispatch, FC, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircle, Check, PlusCircle } from "lucide-react";



import { sdk } from "@/lib/sdk";
import { Event, State } from "../types";


export const DisplayingResults: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [manualEmail, setManualEmail] = useState<string>();
  const [resultModalIsOpen, setIsOpen] = useState<boolean>(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const emailPattern = /^\S+@\S+$/i;

  const scanAttendee = () =>
    sdk().ScanAttendee({
      scanAttendeeInput: {
        ticketPayload: {
          ...(state.ticket ? { ...state.ticket } : { signCode: state.sign_code }),
          panelNumber: state.pannel ? state.pannel : state.pannel_code,
          email: state.ticket?.email ? state?.ticket?.email : state.email,
        },
      },
    });
  return (
    <>
      {state.step === "displaying_result" && state.ticket ? (
        <>
          <div className="mb-8 flex items-center justify-center">
            <p className="font-semibold text-green-700">Scanning 2/2</p>{" "}
            <Check className="duration-800 ml-1 animate-bounce" />{" "}
          </div>
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
                  <DialogClose className="mx-auto mt-4 flex flex-col">
                    <button
                      type="button"
                      className="rounded-md bg-green-700 p-2 text-white"
                      onClick={() => {
                        scanAttendee()
                          .then(() => {
                            setIsOpen(false);
                            toast({
                              title: "✅ Scan ok",
                              description: "Participation scannée avec succès",
                            });
                          })
                          .catch((error) => {
                            console.log("error: ", error);
                            toast({
                              title: "⛔️ L'enregistrement a échoué",
                              description:
                                error?.response?.errors[0].extensions.exception.code === "RGNST"
                                  ? error?.response?.errors[0].message
                                  : "Vous pourrez synchroniser plus tard",
                            });
                            if (error?.response?.errors[0].extensions.exception.code !== "RGNST") {
                              dispatch({
                                type: "synchronize",
                                payload: {
                                  error:
                                    "L'enregistrement n'a pas fonctionné, les informations vont être stockées localement",
                                },
                              });
                              localStorage.setItem(
                                "offlineData",
                                JSON.stringify([
                                  ...JSON.parse(localStorage.getItem("offlineData") || "[]"),
                                  { ...state.ticket, panelNumber: state.pannel ? state.pannel : state.pannel_code },
                                ])
                              );
                            }
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
        </>
      ) : (
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <DialogTitle className="mb-2 font-semibold">Récapitulatif du scan</DialogTitle>
              <fieldset className="mb-[15px] flex flex-col items-start justify-start ">
                <div className="mx-auto flex flex-col items-center justify-center">
                  <AlertCircle className="mb-2 text-red-600" />
                </div>
                L&apos;enregistrement du participant ayant été réalisé à l&apos;aide du code invitation, le détail de
                ses informations n&apos;est pas disponible.
                <DialogClose className="mx-auto mt-4 flex flex-col">
                  <button
                    type="button"
                    className="rounded-md bg-green-700 p-2 text-white"
                    onClick={() => {
                      scanAttendee()
                        .then(() => {
                          setIsOpen(false);
                          toast({
                            title: "✅ Scan ok",
                            description: "Participation scannée avec succès",
                          });
                        })
                        .catch((error) => {
                          console.log("error: ", error);
                          toast({
                            title: "⛔️ L'enregistrement a échoué",
                            description:
                              error?.response?.errors[0].extensions.exception.code === "RGNST"
                                ? error?.response?.errors[0].message
                                : "Vous pourrez synchroniser plus tard",
                          });
                          if (error?.response?.errors[0].extensions.exception.code !== "RGNST") {
                            dispatch({
                              type: "synchronize",
                              payload: {
                                error:
                                  "L'enregistrement n'a pas fonctionné, les informations vont être stockées localement",
                              },
                            });
                            localStorage.setItem(
                              "offlineData",
                              JSON.stringify([
                                ...JSON.parse(localStorage.getItem("offlineData") || "[]"),
                                { ...state.ticket, panelNumber: state.pannel ? state.pannel : state.pannel_code },
                              ])
                            );
                          }
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
      )}
    </>
  );
};