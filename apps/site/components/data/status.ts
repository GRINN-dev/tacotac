import { AttendeeStatus } from "@/../../@tacotacIO/codegen/dist";

export const attendeeStatusArray = [
  { name: "En attente", enum: AttendeeStatus.Idle },
  { name: "Inscription annulée", enum: AttendeeStatus.Cancelled },
  { name: "Présence confirmée à l''évenement", enum: AttendeeStatus.Confirmed },
  { name: "Ticket scanné", enum: AttendeeStatus.TicketScan },
  { name: "Panneau scanné", enum: AttendeeStatus.PanelScan },
];
