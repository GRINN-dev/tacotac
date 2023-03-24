import { cookies } from "next/headers"

import { sdk } from "@/lib/sdk"

export default async function ProfilePage() {
  const accessToken = cookies().get("access_token")?.value
  const { currentUser } = await sdk({
    ...(accessToken
      ? {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }
      : {}),
  }).GetCurrentUser()
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <pre>{JSON.stringify(cookies().getAll(), null, 2)}</pre>
    </div>
  )
}
