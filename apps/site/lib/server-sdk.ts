import { cookies, headers } from "next/headers";
import { Requester, getSdk } from "@tacotacIO/codegen";

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

const requester: Requester = async <R, V>(doc: any, variables: V, options?: RequestInit): Promise<R> => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT
    ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql"
    : "http://localhost:8000/graphql";

  // refresh the token if needed

  const cookie = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("qid")?.value;

  // if no access_token cookie, try a refresh
  const data =
    !cookie && refreshToken
      ? await fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT
            ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/access_token"
            : "http://localhost:8000/access_token",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Cookie: "qid=" + refreshToken,
            },
          }
        ).then((res) => res.json())
      : null;
  if (data?.ok) {
    console.log("refreshed access token");
    console.log("setting new access token cookie");
  }

  const headers = {
    ...{ "Content-Type": "application/json" },
    ...options?.headers,
    ...(cookies()?.get("access_token")?.value
      ? { Authorization: `Bearer ${cookies()?.get("access_token")?.value}` }
      : data?.accessToken
      ? { Authorization: `Bearer ${data?.accessToken}` }
      : {}),
  };
  const defaultOptions: RequestInit = {
    method: "GET",
    credentials: "include",
    ...options,
    headers,
    cache: "no-store" || options.cache,
  };

  return fetch(url, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify({ query: doc, variables }),
  })
    .then((res) => res.json())
    .then(({ data }) => data);
};

export const serverSdk = (args?: any) => getSdk(requester);
