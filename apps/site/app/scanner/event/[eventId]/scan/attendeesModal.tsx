"use client";

import { FC } from "react";
import { Attendee, MyAttendeeFragment } from "@/../../@tacotacIO/codegen/dist";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

import { sdk } from "@/lib/sdk";

interface AttendeesModalProps {
  eventId: string;
  eventName: string;
  attendees: Attendee[];
}

const AttendeesModal: FC<AttendeesModalProps> = ({ eventId, attendees, eventName }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Liste des inscrits</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <DialogTitle className="mb-2 font-semibold">Participants de {eventName} </DialogTitle>
            <fieldset className="mb-[15px] flex flex-col items-start justify-start">
              <div className="grid w-full">
                {attendees.map((a, i) => {
                  return (
                    <div
                      key={i}
                      className="p-2 mb-2 border rounded-md border-slate-700"
                      onClick={() => {
                        console.log(attendees);
                        a?.email
                          ? sdk()
                              .ScanAttendee({
                                scanAttendeeInput: {
                                  ticketPayload: {
                                    email: a?.email ? a?.email : null,
                                    eventId: eventId,
                                    attendeeId: a?.id,
                                    firstname: a?.firstname,
                                    lastname: a?.lastname,
                                    panelNumber: a?.panelNumber ? a?.panelNumber : null,

                                    registrationId: a?.registrationId,
                                    ticketNumber: a?.ticketNumber,
                                  },
                                },
                              })
                              .catch((error) => {
                                console.log(error);
                                console.log("a", a);
                              })
                          : console.log("no email");
                        // TODO: quid de si pas de mail ? et du coup pas de panneau ? seraient tous en ticket_scan ?
                      }}
                    >
                      <div>
                        {a.firstname} {a.lastname}
                      </div>
                      <div>{a.email}</div>
                      <div>{a.status}</div>
                    </div>
                  );
                })}
              </div>

              <div></div>
            </fieldset>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default AttendeesModal;
