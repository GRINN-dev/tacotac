"use client";

import { FC } from "react";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { CSVDownload, CSVLink } from "react-csv";

interface ExportCsvProps {
  users: GetEventBySlugQuery["eventBySlug"]["attendees"];
  name?: string;
}

export const ExportCsv: FC<ExportCsvProps> = ({ users, name }) => {
  const csvData = [
    ["ID", "Email", "Prénom", "Nom", "isVip", "N° Ticket", "Status", "QR Code", "Billet", "Créé le", "Mis à jour le"],
    ...users?.nodes.map(
      ({ id, email, firstname, lastname, isVip, ticketNumber, status, qrCodeUrl, pdfUrl, createdAt, updatedAt }) => [
        id,
        email,
        firstname,
        lastname,
        isVip,
        ticketNumber,
        status,
        qrCodeUrl,
        pdfUrl,
        createdAt,
        updatedAt,
      ]
    ),
  ];
  return (
    <CSVLink
      className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md focus-visible:ring-ring ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      filename={"participants_" + name + ".csv"}
      data={csvData}
    >
      Export
    </CSVLink>
    // or
    //<CSVDownload data={csvData} target="_blank" />;
  );
};
