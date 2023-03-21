import { TicketPayloadInput } from "@/../../@tacotacIO/codegen/dist";

export interface Ticket extends TicketPayloadInput {
  lastname?: string;
  firstname?: string;
}
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
  ticket?: Partial<Ticket>;
  sign_code?: string;
  pannel_code?: number;
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
    | "type_ticket_number"
    | "type_pannel_number"
    | "manually_enter_ticket"
    | "manually_enter_pannel"
    | "display_result"
    | "synchronize"
    | "cancel";

  payload?: Omit<State, "step">;
}
