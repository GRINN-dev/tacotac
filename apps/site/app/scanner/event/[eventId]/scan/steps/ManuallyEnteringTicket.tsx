"use client";

import { Dispatch, FC, useState } from "react";
import ReactModal from "react-modal";

import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const ManuallyEnteringTicket: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [manualTicket, setManualTicket] = useState<string>();

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
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
      <ReactModal style={customStyles} isOpen={state.step === "manually_entering_ticket"}>
        <div className="flex flex-col gap-1">
          {" "}
          Entrez un numéro de ticket :
          <input
            className="border rounded-md"
            type="text"
            value={state.ticket_code}
            onChange={(e) => {
              dispatch({
                type: "type_ticket_number",
                payload: { ticket_code: e.target.value },
              });
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
  );
};
