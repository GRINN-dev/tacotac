"use client";

import { Dispatch, FC, useState } from "react";
import ReactModal from "react-modal";

import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const ManuallyEnteringPannel: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [isPannelModalOpen, setIsPannelModalOpen] = useState<boolean>(false);
  const [manualPannel, setManualPannel] = useState<string>();
  const closePannelModal = () => {
    setIsPannelModalOpen(false);
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
  return (
    <>
      <ReactModal style={customStyles} isOpen={state.step === "manually_entering_pannel"}>
        <div className="flex flex-col gap-1">
          {" "}
          Entrez un numéro de panneau :
          <input
            className="border rounded-md"
            type="text"
            value={state.pannel_code}
            onChange={(e) => {
              dispatch({
                type: "type_pannel_number",
                payload: { pannel_code: e.target.value },
              });
            }}
          />
          <button
            className={buttonVariants({ size: "sm", className: "mx-6" })}
            onClick={() => {
              dispatch({
                type: "manually_enter_pannel",
                payload: {
                  pannel_code: manualPannel,
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
  );
};
