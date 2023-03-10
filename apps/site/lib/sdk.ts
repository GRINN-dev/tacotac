import { getSdk } from "@tacotacIO/codegen";
import { GraphQLClient } from "graphql-request";





const fetchWrapper = (args) => {
  return (url, options = {} as any) => {
    const headers = { "Content-Type": "application/json" };
    const defaultOptions = {
      method: "GET",
      credentials: "include",
      headers: { ...headers, ...options.headers, ...args?.headers },
      cache: "no-store" || options.cache,
      ...options,
    };
    console.log();
    console.log();
    console.log();
    console.log("fetchWrapper", { url, options, defaultOptions });
    console.log();
    console.log();
    console.log();
    return fetch(url, defaultOptions);
  };
};

export const sdk = (args?: any) =>
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