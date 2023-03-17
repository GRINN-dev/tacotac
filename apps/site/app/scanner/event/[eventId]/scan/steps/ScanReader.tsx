"use client";

import { Dispatch, FC } from "react";

import { QrReader } from "@/components/qr-reader";
import { Event, State } from "../types";

export const ScanReader: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (state.step === "scanning_ticket") {
            console.log(result);
            if (!!result) {
              dispatch({
                type: "scan_ticket",
                payload: {
                  ticket: JSON.parse(result.getText()),
                },
              });
              console.log(state.ticket);
            }

            if (!!error) {
              console.log(error);
            }
          } else if (state.step === "scanning_pannel") {
            if (!!result) {
              dispatch({
                type: "scan_pannel",
                payload: {
                  pannel: parseInt(result.getText()),
                },
              });
            }
            if (!!error) {
              console.log(error);
            }
          }
        }}
        className="flex flex-col w-6/12 mx-auto"
        constraints={{}}
      />
    </div>
  );
};
