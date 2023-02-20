import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { UpdateAttendeeForm } from "./UpdateForm";

// import { UpdateOrganizationForm } from "./UpdateForm";

const InfosAttendeePage = async ({ params: { organizationSlug, eventSlug, participantId } }) => {
  console.log("🚀 ~ file: page.tsx:9 ~ InfosAttendeePage ~ params", participantId);
  const data = await sdk().GetAttendeeById({ attendeeId: participantId });
  const { attendee } = data;

  return (
    <>
      {" "}
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
          <Link href="/participants">
            <ArrowBigLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Participant - Modifier les informations
          </h1>
        </div>
        <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
          <UpdateAttendeeForm {...attendee} />
        </div>
      </section>
    </>
  );
};

export default InfosAttendeePage;
