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
      <section className="container  pb-8 pt-6 md:py-10">
        <h1 className="admin-h1">Participant - Modifier les informations</h1>

        <div className="mx-auto flex max-w-3xl items-baseline gap-2">
          <UpdateAttendeeForm {...attendee} />
        </div>
        <h2 className="admin-h2 mt-8">Informations renseignées à l&apos;inscription </h2>
        {attendee.isInscriptor ? (
          <p className="text-sm text-red-800 dark:text-red-300">Cet utilisateur s&apos;est inscrit lui-même</p>
        ) : (
          <p className="text-sm text-red-800 dark:text-red-300">
            Cet utilisateur a été inscrit par{" "}
            {attendee.registration?.attendeesList.find((attendee) => attendee.isInscriptor)?.email}
          </p>
        )}
        <Table>
          <TableHeader>
            <TableHead>Champ</TableHead>
            <TableHead>Valeur</TableHead>
          </TableHeader>
          <TableBody>
            {attendee.attendeeFormFields?.nodes?.map((field) => (
              <TableRow key={field.value}>
                <td>{field.field.label}</td>
                <td>{field.value}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default InfosAttendeePage;
