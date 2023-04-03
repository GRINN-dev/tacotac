"use client";

import { useCallback, useEffect, useState } from "react";
import { GetEventByIdQuery } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";

interface IDataEvent extends ExtractType<GetEventByIdQuery, "event"> {}

export const ShowCurrentRegistrationAttendee = ({ eventId }) => {
  const [data, setData] = useState<IDataEvent>(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { event } = await sdk().GetEventById({ eventId });
      setData(event);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error);
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
      {error && <div className="text-red-300">Une erreur est survenue</div>}
    </div>
  );
};
