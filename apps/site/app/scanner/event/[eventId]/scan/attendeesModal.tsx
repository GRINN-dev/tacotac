"use client";

import { FC, useState } from "react";
import { Attendee } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle, Users } from "lucide-react";

import { sdk } from "@/lib/sdk";

interface AttendeesModalProps {
  eventId: string;
  eventName: string;
  attendees: Attendee[];
}

const AttendeesModal: FC<AttendeesModalProps> = ({ eventId, attendees, eventName }) => {
  const [manualEmail, setManualEmail] = useState<string>();

  return (
    <div>
      <Dialog>
        <DialogTrigger>Liste des inscrits</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="overflow-hidden overflow-y-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[50vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gradient-to-b from-white to-gray-200 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <DialogTitle className="flex items-center justify-start mb-4 text-lg font-semibold font-zenon-bold">
              <Users className="mx-2 text-primary" /> Participants de {eventName}{" "}
            </DialogTitle>
            <fieldset className="mb-[15px] flex flex-col items-start justify-start">
              <div className="grid w-full ">
                {attendees.map((a, i) => {
                  return (
                    <div
                      key={i}
                      className="p-2 mb-4 border rounded-md shadow-lg border-slate-700"
                      onClick={() => {
                        if (!a?.email) {
                          return;
                        }
                        sdk()
                          .ScanAttendee({
                            scanAttendeeInput: {
                              ticketPayload: {
                                email: a?.email ? a?.email : manualEmail,
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
                          .then(() => toast({ title: "✅ Participant scanné !" }))
                          .catch((error) => {
                            console.log(error);
                          });

                        // TODO: quid de si pas de mail ? et du coup pas de panneau ? seraient tous en ticket_scan ?
                      }}
                    >
                      <div>{a.lastname + " " + a.firstname}</div>
                      {a.email ? (
                        a.email
                      ) : (
                        <div className="flex items-center">
                          <form>
                            <input
                              type="email"
                              className="p-1 border rounded-md"
                              value={manualEmail}
                              placeholder="Ajoutez un email"
                              onChange={(e) => setManualEmail(e.target.value)}
                            />
                          </form>
                          <button
                            type="submit"
                            onClick={() =>
                              sdk()
                                .UpdateAttendee({
                                  input: {
                                    patch: { email: manualEmail },
                                    id: a.id,
                                  },
                                })
                                .catch((error) => console.log("error", error))
                                .then(() =>
                                  sdk().ScanAttendee({
                                    scanAttendeeInput: {
                                      ticketPayload: {
                                        email: manualEmail,
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
                                )
                            }
                          >
                            <PlusCircle className="ml-2" />
                          </button>
                        </div>
                      )}
                      <div>{a.status}</div>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default AttendeesModal;
