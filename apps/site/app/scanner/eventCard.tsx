"use client";

import { FC } from "react";

interface EventCardProps {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventPicture: string;
}

const EventCard: FC<EventCardProps> = ({ eventDate, eventLocation, eventName, eventPicture }) => {
  const date = new Date(eventDate);
  const formattedDate = date?.toLocaleDateString("fr-FR");
  return (
    <div>
      <div className="border rounded-[10px] text-right h-full w-full bg-gradient-to-b from-gray-300 to-gray-500 p-4">
        <div className="font-semibold text-white">{eventName}</div>
        {formattedDate} <div>{eventLocation}</div>
      </div>
    </div>
  );
};
export default EventCard;
