import { cookies } from "next/headers";
import { getSdk } from "@tacotacIO/codegen/dist";
import { GraphQLClient } from "graphql-request";

export const fetchWrapper = (args) => {
  return (url, options: RequestInit) => {
    const headers = {
      ...{ "Content-Type": "application/json" },
      ...options.headers,
      ...args?.headers,
      ...(cookies()?.get("access_token")?.value
        ? { Authorization: `Bearer ${cookies()?.get("access_token")?.value}` }
        : {}),
    };
    const defaultOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      ...options,
      headers,
      cache: "no-store" || options.cache,
    };
    return fetch(url, defaultOptions);
  };
};

export const serverSdk = (args?: any) =>
  getSdk(
    new GraphQLClient(
      process.env.NEXT_PUBLIC_API_ENDPOINT
        ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql"
        : "http://localhost:8000/graphql",
      {
        fetch: fetchWrapper(args),
      }
    )
  );
