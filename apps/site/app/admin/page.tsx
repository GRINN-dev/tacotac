import { serverSdk } from "@/lib/server-sdk";

export default async function AdminHomePage({ searchParams: { org = "all" } }) {
  const { organization } = org !== "all" ? await serverSdk().GetOrganizationById({ id: org }) : { organization: null };

  return (
    <div className="rounded-3xl border-4 border-dashed">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {org === "all" ? "Dashboard Chez Daddy" : organization.name}
      </h1>
      <p>{org}</p>
    </div>
  );
}
