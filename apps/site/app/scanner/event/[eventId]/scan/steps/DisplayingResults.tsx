"use client";

import { Dispatch, FC, useState } from "react";
import { toast } from "@/hooks/use-toast";
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
      </ReactModal>
    </>
  );
};
