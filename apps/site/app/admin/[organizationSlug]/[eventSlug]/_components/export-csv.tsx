"use client";

import { FC } from "react";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { format } from "date-fns";
import { CSVDownload, CSVLink } from "react-csv";

import { transformStatus } from "@/lib/utils";

interface ExportCsvProps {
  users: GetEventBySlugQuery["eventBySlug"]["attendees"];
  name?: string;
}

export const ExportCsv: FC<ExportCsvProps> = ({ users, name }) => {
  console.log("🚀 ~ file: export-csv.tsx:19 ~ users:", users);
  const defaultAdditionalData = users?.nodes[74]?.additionalData
    ?.filter((formFieldDetail) => !["Civilité", "Email", "Nom", "Prénom"].includes(formFieldDetail.label))
    ?.reduce((acc, formFieldDetail) => ({ ...acc, [formFieldDetail.label]: "  " }), {});
  const csvData =
    users?.nodes.length > 0
      ? [
          [
            "ID",
            "Email",
            "Prénom",
            "Nom",
            "Vip",
            "N° Ticket",
            "Status",
            "QR Code",
            "Billet",
            "Panneau",
            "Créé le",
            "Mis à jour le",
            ...Object.keys(defaultAdditionalData || {}),
          ],
          ...users?.nodes.map(
            ({
              id,
              email,
              firstname,
              lastname,
              isVip,
              ticketNumber,
              status,
              qrCodeUrl,
              pdfUrl,
              panelNumber,
              createdAt,
              updatedAt,
              additionalData,
            }) => {
              const additionalDataMap = additionalData
                ?.filter((formFieldDetail) => !["Civilité", "Email", "Nom", "Prénom"].includes(formFieldDetail.label))
                .reduce(
                  (acc, formFieldDetail) => ({
                    ...acc,
                    [formFieldDetail.label]: ![null, undefined, "", "undefined"].includes(formFieldDetail.values)
                      ? formFieldDetail.values
                      : "  ",
                  }),
                  { ...defaultAdditionalData }
                );
              return [
                id,
                email,
                firstname,
                lastname,
                isVip ? "Oui" : "Non vip",
                ticketNumber,
                transformStatus(status),
                qrCodeUrl,
                pdfUrl,
                panelNumber,
                format(new Date(createdAt), "dd-MM-yyyy à HH:mm"),
                format(new Date(updatedAt), "dd-MM-yyyy à HH:mm"),
                ...Object.values(additionalDataMap),
              ];
            }
          ),
        ]
      : [];
  return (
    <CSVLink
      className="focus-visible:ring-ring ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      filename={"participants_" + name + ".csv"}
      data={csvData}
    >
      Export
    </CSVLink>
  );
};
