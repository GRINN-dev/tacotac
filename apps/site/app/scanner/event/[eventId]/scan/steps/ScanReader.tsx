"use client";

import { Dispatch, FC } from "react";

import { QrReader } from "@/components/qr-reader";
import { Event, State } from "../types";

export const ScanReader: FC<{ state: State; dispatch: Dispatch<Event> }> = ({ state, dispatch }) => {
  return (
    <div>
      <QrReader
        containerStyle={{
          maxWidth: "500px",
          maxHeight: "500px",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          borderColor: "white",
          borderWidth: "2px",
          borderStyle: "solid",
          shadow: "0 0 20px 0 rgba(0, 0, 0, 0.5)",
        }}
        scanDelay={1000}
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
        className="mx-auto flex flex-col"
        constraints={{
          facingMode: "environment",
        }}
      />
    </div>
  );
};
