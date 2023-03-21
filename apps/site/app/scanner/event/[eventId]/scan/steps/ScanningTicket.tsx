"use client";

import { Dispatch, FC } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const ScanningTicket: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  return (
    <div>
      <button
        className={buttonVariants({ size: "sm" })}
        onClick={() => {
          dispatch({
            type: "scan_ticket_error",
            payload: {
              error: "Le ticket n'est pas détecté",
            },
          });
        }}
      >
        trigger error ticket
      </button>
    </div>
  );
};
