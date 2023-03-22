"use client";

import { FC } from "react";
import { GetAllEventsQuery } from "@tacotacIO/codegen/temp";
import dayjs from "dayjs";





interface EventCardProps extends ExtractArrayType<ExtractType<GetAllEventsQuery, "events">, "nodes"> {}

const EventCard: FC<EventCardProps> = ({ startsAt, slug, placeName, name, id }) => {
  return (
    <div className="">
      <div className="border rounded-[10px] text-right h-full w-full bg-[#D9D9D9] p-4 my-2 ">
        <div className="font-semibold text-white">{name}</div>
        {dayjs(startsAt).format("DD/MM/YYYY")} <div>{placeName}</div>
      </div>
    </div>
  );
};
export default EventCard;