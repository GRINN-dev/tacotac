"use client";

import { FC } from "react";
import { GetAllEventsQuery } from "@tacotacIO/codegen";
import dayjs from "dayjs";

interface EventCardProps extends ExtractArrayType<ExtractType<GetAllEventsQuery, "events">, "nodes"> {}

const EventCard: FC<EventCardProps> = ({ startsAt, placeName, name, city }) => {
  return (
    <div className="">
      <div className="my-4 h-full  w-full rounded-[10px] border bg-white p-4 shadow-md ">
        <div className="font-zenon-bold text-left text-xl font-semibold text-black">{name}</div>
        <div className="font-zenon-regular text-right text-sm">
          <div>Le {dayjs(startsAt).format("DD/MM/YYYY")}</div> <div>à {city}</div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
