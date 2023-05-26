import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UpdateAttendeeForm } from "./UpdateForm";

// import { UpdateOrganizationForm } from "./UpdateForm";

const InfosAttendeePage = async ({ params: { organizationSlug, eventSlug, participantId } }) => {
  const { attendee } = await serverSdk().GetAttendeeById({ attendeeId: participantId });

  return (
    <>
      {" "}
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mx-auto flex max-w-3xl items-baseline gap-2">
          <Link href={`/admin/${organizationSlug}/${eventSlug}`}>
            <ArrowBigLeft className="h-6 w-6" />
          </Link>
          <h1 className="admin-h1">Participant - Modifier les informations</h1>
        </div>
        <div className="mx-auto flex max-w-3xl items-baseline gap-2">
          <UpdateAttendeeForm {...attendee} />
        </div>
        <h2 className="admin-h2">
          Informations renseignées à l&apos;inscription
          <Table>
            <TableHeader>
              <TableHead>Champ</TableHead>
              <TableHead>Valeur</TableHead>
            </TableHeader>
            <TableBody>
              {attendee.attendeeFormFields?.nodes?.map((field) => (
                <TableRow key={field.value}>
                  <td>{field.field.name}</td>
                  <td>{field.value}</td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </h2>
      </section>
    </>
  );
};

export default InfosAttendeePage;
