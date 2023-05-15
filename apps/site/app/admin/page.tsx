import { redirect } from "next/navigation";

import { serverSdk } from "@/lib/server-sdk";

export default async function AdminHomePage({ searchParams: { org = "all" } }) {
  redirect(`/admin/${org}`);
}
