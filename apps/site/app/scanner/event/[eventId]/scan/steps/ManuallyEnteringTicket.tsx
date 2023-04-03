"use client";

import { Dispatch, FC, useState } from "react";
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { Event, State } from "../types";

export const ManuallyEnteringTicket: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [manualTicket, setManualTicket] = useState<string>();

  return (
    <>
      {" "}
      {state.step === "manually_entering_ticket" ? (
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <DialogTitle className="m-0 mb-2 text-[17px] font-semibold text-red-600">{state.error}</DialogTitle>
              <DialogDescription className="mb-2">Veuillez saisir le numéro associé au QR code :</DialogDescription>
              <fieldset className="mb-[15px] flex items-center ">
                <input
                  className="rounded-md border "
                  type="text"
                  value={state.sign_code}
                  onChange={(e) => {
                    dispatch({
                      type: "type_ticket_number",
                      payload: { sign_code: e.target.value },
                    });
                  }}
                />
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <DialogClose asChild>
                  <button
                  disabled={!state?.sign_code}
                    className={buttonVariants({ size: "sm", className: "mx-6" })}
                    onClick={() => {
                      dispatch({
                        type: "manually_enter_ticket",
                        payload: {
                          sign_code: manualTicket,
                        },
                      });
                      setIsTicketModalOpen(false);
                    }}
                  >
                    Valider
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ) : null}
    </>
  );
};
