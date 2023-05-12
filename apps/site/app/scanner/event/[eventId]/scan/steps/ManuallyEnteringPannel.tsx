"use client";

import { Dispatch, FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";

import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const ManuallyEnteringPannel: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [manualPannel, setManualPannel] = useState<string>();

  return (
    <>
      {state.step === "manually_entering_pannel" ? (
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <DialogTitle className="text-red-600 m-0 text-[17px] font-semibold mb-2">
                Pas de panneau scanné
              </DialogTitle>
              <DialogDescription className="mb-4 text-sm">
                Veuillez entrer un numéro de panneau manuellement puis validez :
              </DialogDescription>
              <fieldset className="mb-[15px] flex items-center ">
                <input
                  className="border rounded-md"
                  type="number"
                  value={state.pannel_code}
                  onChange={(e) => {
                    dispatch({
                      type: "type_pannel_number",
                      payload: { pannel_code: parseInt(e.target.value) },
                    });
                  }}
                />
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <DialogClose asChild>
                  <button
                    className={buttonVariants({ size: "sm", className: "mx-6" })}
                    onClick={() => {
                      dispatch({
                        type: "manually_enter_pannel",
                        payload: {
                          pannel_code: parseInt(manualPannel),
                        },
                      });
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
