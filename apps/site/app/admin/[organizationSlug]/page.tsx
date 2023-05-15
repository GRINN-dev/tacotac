import { serverSdk } from "@/lib/server-sdk";
import { Card } from "@/components/ui/card";

export default async function Page({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  if (organizationSlug === "all") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Card className="px-4 py-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard Administrateur</h1>
        </Card>
      </div>
    );
  }

  const { organizationBySlug } = await serverSdk().GetOrganizationBySlug({ slug: organizationSlug });
  const { currentUser } = await serverSdk().GetCurrentUser();

  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Dashboard Administrateur
      {organizationBySlug.name}
    </h1>
  );
}
