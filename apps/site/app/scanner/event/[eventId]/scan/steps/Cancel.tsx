"use client";

import { Dispatch, FC } from "react";

import { Event, State } from "../types";

export const Cancel: FC<{ dispatch: Dispatch<Event>; state: State }> = ({ dispatch, state }) => {
  return (
    <div>
      {state.step !== "start" ? (
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
      ) : null}
    </div>
  );
};
