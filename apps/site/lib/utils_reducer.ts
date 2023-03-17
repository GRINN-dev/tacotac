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
            pannel_code: state.pannel_code,
            pannel: state.pannel,
          }
        : { step: "start" };
    case "scan_ticket_error":
      return state.step === "scanning_ticket"
        ? {
            step: "manually_entering_ticket",
            error: event.payload.error,
            ticket_code: event.payload.ticket_code,
          }
        : {
            step: "start",
          };
    case "manually_enter_ticket":
      return state.step === "manually_entering_ticket"
        ? {
            step: "scanning_pannel",
            ticket: event.payload.ticket,
            ticket_code: event.payload.ticket_code,
          }
        : {
            step: "start",
          };
    case "type_ticket_number":
      return state.step === "manually_entering_ticket"
        ? {
            step: "manually_entering_ticket",
            ticket_code: event.payload.ticket_code,
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
            pannel_code: event.payload.pannel_code,
          }
        : {
            step: "start",
          };
    case "type_pannel_number":
      return state.step === "manually_entering_pannel"
        ? {
            step: "manually_entering_pannel",
            ticket: state.ticket,
            pannel_code: event.payload.pannel_code,
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
            ticket_code: state.ticket_code,
            pannel_code: event.payload.pannel_code,
            pannel: state.pannel,
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
            ticket_code: state.ticket_code,
            pannel_code: event.payload.pannel_code,
          }
        : null;

    case "display_result":
      return {
        step: "displaying_result",
        ticket: state.ticket,
        pannel: state.pannel,
        email: event.payload?.email,
        ticket_code: state.ticket_code,
        pannel_code: state.pannel_code,
      };
    case "synchronize":
      return {
        step: "synchronizing",
        ticket: state.ticket,
        pannel: state.pannel,
        pannel_code: state.pannel_code,
        ticket_code: state.ticket_code,
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
