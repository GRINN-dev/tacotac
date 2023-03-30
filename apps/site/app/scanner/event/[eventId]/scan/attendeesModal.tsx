"use client";

import { FC } from "react";
import { Attendee, MyAttendeeFragment } from "@/../../@tacotacIO/codegen/dist";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

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
            <fieldset className="mb-[15px] flex flex-col items-start justify-start ">
              <div>
                {attendees.map((a, i) => {
                  return (
                    <div key={i}>
                      <div>
                        {a.firstname} {a.lastname}
                      </div>
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
