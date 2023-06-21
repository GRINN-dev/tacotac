import Link from "next/link";

import { serverSdk } from "@/lib/server-sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { AcceptInvitation } from "./_components/accept-invitation";

export default async function Page({ searchParams: { code, id } }) {
  const { organizationForInvitation } = await serverSdk().OrganizationForInvitation({ id, code });
  const { currentUser } = await serverSdk().GetCurrentUser();
  return (
    <main>
      <h1 className="admin-h1">
        Vous avez été invité à rejoindre <span className="text-primary">{organizationForInvitation?.name}</span>
      </h1>
      {currentUser ? (
        <AcceptInvitation code={code} id={id} slug={organizationForInvitation?.slug} />
      ) : (
        <Link
          href={`/login?redirect=${encodeURIComponent(`/invitation?id=${id}&code=${code}`)}`}
          className={cn(buttonVariants())}
        >
          Se connecter
        </Link>
      )}
    </main>
  );
}
