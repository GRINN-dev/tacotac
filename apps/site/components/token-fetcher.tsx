"use client";

import { useEffect } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function TokenFetcher() {
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT
        ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/access_token"
        : "http://localhost:8000/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let interval = setInterval(() => {
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT
          ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/access_token"
          : "http://localhost:8000/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <></>;
}
