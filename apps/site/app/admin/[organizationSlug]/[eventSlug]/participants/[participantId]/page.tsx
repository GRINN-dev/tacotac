import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { UpdateAttendeeForm } from "./UpdateForm";

// import { UpdateOrganizationForm } from "./UpdateForm";

const InfosAttendeePage = async ({ params: { organizationSlug, eventSlug, participantId } }) => {
  const { attendee } = await sdk().GetAttendeeById({ attendeeId: participantId });

  return (
    <>
      {" "}
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="mx-auto flex max-w-3xl items-baseline gap-2">
          <Link href={`/admin/${organizationSlug}/${eventSlug}`}>
            <ArrowBigLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Participant - Modifier les informations
          </h1>
        </div>
        <div className="mx-auto flex max-w-3xl items-baseline gap-2">
          <UpdateAttendeeForm {...attendee} />
        </div>
      </section>
    </>
  );
};

export default InfosAttendeePage;
