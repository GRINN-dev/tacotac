"use client";

import { FC } from "react";
import { GetAllEventsQuery } from "@/../../@tacotacIO/codegen/dist";
import dayjs from "dayjs";

interface EventCardProps extends ExtractArrayType<ExtractType<GetAllEventsQuery, "events">, "nodes"> {}

const EventCard: FC<EventCardProps> = ({ startsAt, slug, placeName, name, id }) => {
  return (
    <div className="">
      <div className="border rounded-[10px] text-right h-full w-full bg-white shadow-md p-4 my-4 ">
        <div className="font-semibold text-black font-zenon-bold">{name}</div>
        {dayjs(startsAt).format("DD/MM/YYYY")} <div>{placeName}</div>
      </div>
    </div>
  );
};
export default EventCard;
