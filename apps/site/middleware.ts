// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("entering the middleware");

  const cookie = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("qid")?.value;

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

  const response = NextResponse.next();

  if (data?.ok) {
    console.log("setting new access token cookie");
    // decrypt the jwt and get its expiration
    const at = data.accessToken.split(".")[1];
    const decodedJwt = JSON.parse(atob(at));
    const atExpires = new Date(decodedJwt.exp);

    const rt = data.refreshToken.split(".")[1];
    const decodedRt = JSON.parse(atob(rt));
    const rtExpires = new Date(decodedRt.exp);

    response.cookies.set({
      name: "access_token",
      value: data.accessToken,
      httpOnly: true,
      expires: atExpires,
      path: "/",
    });
    response.cookies.set({
      name: "qid",
      value: data.refreshToken,
      httpOnly: true,
      expires: rtExpires,
      path: "/",
    });
    response.cookies.set("test", "test", { path: "/" });
  }

  return response;
}
