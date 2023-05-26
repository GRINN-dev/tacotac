import { redirect } from "next/navigation";
import UpdateUserForm from "@/forms/user/update-user-form";

import { serverSdk } from "@/lib/server-sdk";

export default async function Page() {
  const { currentUser } = await serverSdk().GetCurrentUser();

  if (!currentUser?.id) redirect("/login");

  return (
    <main className="container mt-12 max-w-prose">
      <h1 className="admin-h1">Mon compte</h1>

      <h2 className="admin-h2">Mettre à jour mon profil</h2>
      <UpdateUserForm user={currentUser} />
    </main>
  );
}
