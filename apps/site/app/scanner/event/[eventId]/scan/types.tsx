import { TicketPayloadInput } from "@/../../@tacotacIO/codegen/dist";

export interface State {
  step:
    | "start"
    | "scanning_ticket"
    | "scanning_ticket_success"
    | "scanning_pannel"
    | "manually_entering_ticket"
    | "manually_entering_pannel"
    | "displaying_error"
    | "displaying_result"
    | "synchronizing";
  //ajouter un état quand tout est ok scanné ?
  ticket?: TicketPayloadInput;
  pannel?: number;
  error?: string;
  email?: string;
}

export interface Event {
  type:
    | "start_scanner"
    | "scan_ticket"
    | "start_scanner_pannel"
    | "scan_ticket_error"
    | "scan_pannel"
    | "scan_pannel_error"
    | "manually_enter_ticket"
    | "manually_enter_pannel"
    | "display_result"
    | "synchronize"
    | "cancel";

  payload?: Omit<State, "step">;
}
