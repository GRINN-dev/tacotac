"use client";

import { useCallback, useEffect, useState } from "react";
import { GetEventByIdQuery } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";

interface IDataEvent extends ExtractType<GetEventByIdQuery, "event"> {}

export const ShowCurrentRegistrationAttendee = ({ eventId }) => {
  const [data, setData] = useState<IDataEvent>(null);

  const fetchData = useCallback(async () => {
    try {
      const { event } = await sdk().GetEventById({ eventId });
      setData(event);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div>
      {" "}
      {data?.totalConfirmedRegistrations} présents / {data?.totalRegistrations} inscrits{" "}
    </div>
  );
};