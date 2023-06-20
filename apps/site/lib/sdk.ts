import { getSdk } from "@tacotacIO/codegen";

export const fetchWrapper = (args) => {
  return (url, options: RequestInit) => {
    const headers = {
      ...{ "Content-Type": "application/json" },
      ...options.headers,
      ...args?.headers,
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

export const sdk = (args?: any) =>
  getSdk((doc, vars, options: RequestInit) => {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql"
      : "http://localhost:8000/graphql";
    return fetchWrapper(args)(url, {
      ...options,
      method: "POST",
      body: JSON.stringify({ query: doc, variables: vars }),
    })
      .then((res) => res.json())
      .then(({ data }) => data);
  });
