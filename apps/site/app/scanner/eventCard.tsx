"use client";

import { FC } from "react";

interface EventCardProps {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventPicture?: string;
  eventSlug: string;
}

const EventCard: FC<EventCardProps> = ({ eventDate, eventSlug, eventLocation, eventName, eventPicture }) => {
  const date = new Date(eventDate);
  const formattedDate = date?.toLocaleDateString("fr-FR");
  return (
    <div className="">
      <div className="border rounded-[10px] text-right h-full w-full bg-[#D9D9D9] p-4 my-2 ">
        <div className="font-semibold text-white">{eventName}</div>
        {formattedDate} <div>{eventLocation}</div>
      </div>
    </div>
  );
};
export default EventCard;
