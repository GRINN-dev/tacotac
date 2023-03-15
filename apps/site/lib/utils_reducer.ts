import { Event, State } from "../../site/app/scanner/event/[eventId]/scan/types";

export const reducer: (state: State, event: Event) => State = (state, event) => {
  switch (event.type) {
    case "start_scanner":
      return state.step === "start"
        ? {
            step: "scanning_ticket",
          }
        : { step: "start" };

    case "scan_ticket":
      return state.step === "scanning_ticket"
        ? {
            step: "scanning_ticket_success",
            ticket: event.payload.ticket,
          }
        : {
            step: "start",
          };
    case "start_scanner_pannel":
      return state.step === "scanning_ticket_success"
        ? {
            step: "scanning_pannel",
            ticket: state.ticket,
          }
        : { step: "start" };
    case "scan_ticket_error":
      return state.step === "scanning_ticket"
        ? {
            step: "manually_entering_ticket",
            error: event.payload.error,
          }
        : {
            step: "start",
          };
    case "manually_enter_ticket":
      return state.step === "manually_entering_ticket"
        ? {
            step: "scanning_pannel",
            ticket: event.payload.ticket,
          }
        : {
            step: "start",
          };
    // case "scan_pannel":
    //   return {
    //     step: "displaying_error",
    //     ticket: state.ticket,
    //     pannel: event.payload.pannel,
    //   };

    case "scan_pannel":
      return state.step === "scanning_pannel"
        ? {
            step: "displaying_result",
            ticket: state.ticket,
            pannel: event.payload.pannel,
          }
        : {
            step: "start",
          };
    case "scan_pannel_error":
      return state.step === "scanning_pannel"
        ? {
            step: "manually_entering_pannel",
            error: event.payload.error,
            ticket: state.ticket,
          }
        : {
            step: "start",
          };
    case "manually_enter_pannel":
      return state.step === "manually_entering_pannel"
        ? {
            step: "displaying_result",
            ticket: state?.ticket,
            pannel: event.payload?.pannel,
          }
        : null;

    case "display_result":
      return {
        step: "displaying_result",
        ticket: state.ticket,
        pannel: state.pannel,
        email: event.payload?.email,
      };
    case "synchronize":
      return {
        step: "synchronizing",
        ticket: state.ticket,
        pannel: state.pannel,
        email: event.payload?.email,
      };
    case "cancel":
      return {
        step: "start",
      };
    default:
      return state;
  }
};
