import { EventStatus } from "@/../../@tacotacIO/codegen/dist";





export const eventStatusArray = [
  { name: "En attente", enum: EventStatus.Idle },
  { name: "Inscription annulée", enum: EventStatus.Cancelled },
  { name: "Présence confirmée à l''évenement", enum: EventStatus.Confirmed },
  { name: "Ticket scanné", enum: EventStatus.TicketScan },
  { name: "Panneau scanné", enum: EventStatus.PanelScan },
];