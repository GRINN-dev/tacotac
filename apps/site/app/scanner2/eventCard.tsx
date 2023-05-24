"use client";

import { FC } from "react";
import { GetAllEventsQuery } from "@/../../@tacotacIO/codegen/dist";
import dayjs from "dayjs";

interface EventCardProps extends ExtractArrayType<ExtractType<GetAllEventsQuery, "events">, "nodes"> {}

const EventCard: FC<EventCardProps> = ({ startsAt, placeName, name, city }) => {
  return (
    <div className="">
      <div className="border rounded-[10px]  h-full w-full bg-white shadow-md p-4 my-4 ">
        <div className="text-xl font-semibold text-left text-black font-zenon-bold">{name}</div>
        <div className="text-sm text-right font-zenon-regular">
          <div>Le {dayjs(startsAt).format("DD/MM/YYYY")}</div> <div>à {city}</div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
