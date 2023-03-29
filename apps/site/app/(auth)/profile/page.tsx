import { cookies } from "next/headers";

import { serverSdk } from "@/lib/server-sdk";

export default async function ProfilePage() {
  const { currentUser } = await serverSdk().GetCurrentUser();
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <pre>{JSON.stringify(cookies().getAll(), null, 2)}</pre>
    </div>
  );
}
