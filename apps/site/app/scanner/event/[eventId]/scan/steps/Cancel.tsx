"use client";

import { Dispatch, FC } from "react";

import { Event } from "../types";

export const Cancel: FC<{ dispatch: Dispatch<Event> }> = ({ dispatch }) => {
  return (
    <button
      className="p-2 m-2 text-sm text-white bg-red-700 border-none rounded-md"
      onClick={() => {
        dispatch({
          type: "cancel",
        });
      }}
    >
      Annuler
    </button>
  );
};
