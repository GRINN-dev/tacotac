"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import { sdk } from "@/lib/sdk";
import { Button } from "@/components/ui";

export const AcceptInvitation: FC<{ code: string; id: string; slug: string }> = ({ code, id, slug }) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await sdk().AcceptOrganizationInvitation({
          input: {
            invitationId: id,
            code,
          },
        });
        router.push(`/admin/${slug}`);
      }}
    >
      Accepter l&apos;invitation
    </Button>
  );
};
