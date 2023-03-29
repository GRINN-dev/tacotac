"use client";

import { Dispatch, FC } from "react";
import { Camera } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Event, State } from "../types";

export const Start: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
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
  );
};
