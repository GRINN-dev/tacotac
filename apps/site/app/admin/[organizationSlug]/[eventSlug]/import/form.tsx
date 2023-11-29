"use client";

import { FC, Key, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CompleteAttendeeInput,
  FieldTypes,
  GetEventBySlugQuery,
  RegisterAttendeesCsvInput,
  RegisterCompleteAttendeeCsvInput,
} from "@tacotacIO/codegen";
import { AlertTriangle } from "lucide-react";
import Papa, { parse } from "papaparse";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import SimpleCollection from "@/components/table/SimpleCollection";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

export const ImportAttendeesForm: FC<{
  event: GetEventBySlugQuery["eventBySlug"];
  organizationSlug: string;
  eventSlug: string;
}> = ({ event, eventSlug, organizationSlug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [csvUploadrender, setCsvUploadRender] = useState([]);
  const [isForcingImport, setIsForcingImport] = useState(false);

  const generateCSVData = () => {
    // Your logic to generate the CSV data

    // i want to get all the formfields of the event, and on the second line specify available options for select
    const csvData = [
      [
        ...event.formFields.nodes.map(
          (formField) => formField.label /* + (formField.options ? " " + formField.options?.join(" | ") : "") */
        ),
        "VIP true | false",
      ],
    ];

    return csvData;
  };

  const handleDownloadCSV = () => {
    const csvData = generateCSVData();

    // Convert the data to CSV format using PapaParse
    const csv = Papa.unparse(csvData);

    // Create a Blob object from the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Generate a unique file name
    const fileName = "data.csv";

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Trigger the download
    link.click();

    // Clean up the temporary link
    window.URL.revokeObjectURL(link.href);
  };

  const handleCsvUpload = async (csvUpload: any) => {
    setParsedData([]);
    setCsvUploadRender([]);
    parse(csvUpload[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const isMail = results.data.every((result: any) => result?.Email);
        if (results.errors.length > 0 || !isMail) {
          toast({
            variant: "destructive",
            title: !isMail ? "Un email est au moins manquant dans le csv" : results.errors[0].message,
          });
          throw error;
        }
        setCsvUploadRender(results.data);

        const resultsRewrite = results.data.map((result: any) => {
          return {
            ...event.formFields.nodes.reduce((acc, formField) => {
              if (formField.type === FieldTypes.Checkbox) {
                acc[formField.label] = result[formField.label] === "true" ? true : false;
              } else {
                acc[formField.label] = result[formField.label];
              }
              return acc;
            }, {}),
            isVip: result["VIP true | false"] === "true" ? true : false,
          };
        });

        console.log(resultsRewrite);

        setParsedData(resultsRewrite);
      },
    });
  };

  const onSubmit = ({ isForcing }: { isForcing: boolean }) => {
    let data: RegisterCompleteAttendeeCsvInput = {
      completeAttendees: [],
      isForcing: isForcing,
      eventId: event.id,
    };

    for (let i = 0; i < parsedData.length; i++) {
      data.completeAttendees[i] = {
        attendee: { email: "", firstname: "", lastname: "", civility: "", isInscriptor: false, isVip: false },
        attendeeFormFields: [],
      };

      for (let j = 0; j < event.formFields.nodes.length; j++) {
        data.completeAttendees[i].attendeeFormFields[j] = {
          fieldId: event.formFields.nodes[j].id,
          value: String(parsedData[i][event.formFields.nodes[j].label]),
          attendeeId: "00000000-0000-0000-0000-000000000000", // any uuid, we fake it to make the API happy
        };

        if (event.formFields.nodes[j].name === "email") {
          data.completeAttendees[i].attendee.email = parsedData[i][event.formFields.nodes[j].label];
        }
        if (event.formFields.nodes[j].name === "firstname") {
          data.completeAttendees[i].attendee.firstname = parsedData[i][event.formFields.nodes[j].label];
        }
        if (event.formFields.nodes[j].name === "lastname") {
          data.completeAttendees[i].attendee.lastname = parsedData[i][event.formFields.nodes[j].label];
        }
        if (event.formFields.nodes[j].name === "civility") {
          data.completeAttendees[i].attendee.civility = parsedData[i][event.formFields.nodes[j].label];
        }
      }

      data.completeAttendees[i].attendee.isVip = parsedData[i]["isVip"] || false;
    }

    console.log(data);

    sdk()
      .RegisterCompleteAttendeesCsv({
        input: data,
      })
      .then((response) => {
        if (response.registerCompleteAttendeeCsv.attendeeImports.find((res) => res?.errorCode === "ALEXT")) {
          toast({
            variant: "destructive",
            action: (
              <>
                <div className="flex flex-col">
                  <button
                    className={buttonVariants({ size: "lg" })}
                    onClick={() => {
                      onSubmit({ isForcing: true });
                    }}
                  >
                    Forcer import
                  </button>
                  <p>
                    {
                      response.registerCompleteAttendeeCsv.attendeeImports.find((x) => x?.errorCode === "ALEXT")
                        ?.errorMessage
                    }
                  </p>
                  <p>
                    {response.registerCompleteAttendeeCsv.attendeeImports.reduce((acc, res) => {
                      return acc.concat(res?.errorCode === "ALEXT" ? res?.errorValue + " , " : "  ");
                    }, "")}
                  </p>
                </div>
              </>
            ),
          });
          setIsForcingImport(false);
        } else {
          router.push(`/admin/${organizationSlug}/${eventSlug}`);
          setIsForcingImport(false);
        }
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Oups ! une erreur est survenue",
        });
        throw error;
      });
    setIsLoading(false);
  };

  return (
    <div className={cn("mt-4", isLoading && "animate-pulse")}>
      <div className="mt-4 grid items-center gap-1.5">
        <div className="my-4 rounded-lg border p-4">
          <div className="flex">
            <div className="shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-300" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-300">Attention </h3>
              <div className="my-2 text-sm ">
                <p>
                  {`L'import enregistrera directement les participants présents dans le csv et recevront, donc, automatiquement leur billet par mail.`}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  /* window.open(
                    "https://docs.google.com/spreadsheets/d/131AXHOhQKZKA_OWVTJ6aMC65rV-ugrTbaSNkpCOwTzM/edit?usp=sharing",
                    "_ blank"
                  ); */
                  handleDownloadCSV();
                }}
              >
                Télecharger un template
              </Button>
            </div>
          </div>
        </div>
        <FileDragNDrop
          id={"csvDnD" + event.id}
          title={"CSV"}
          placeholder="Glissez vos CSV ici"
          acceptFormat=".csv"
          onFileUpload={(file) => {
            handleCsvUpload(file);
          }}
        />
        <div className="mt-10 overflow-x-auto">
          {csvUploadrender?.length > 0 && <SimpleCollection arrayList={csvUploadrender} />}
        </div>
      </div>
      <div className={cn("mt-8 flex gap-2", !parsedData.length && "hidden")}>
        <Button
          onClick={() => {
            setIsLoading(true);
            onSubmit({ isForcing: false });
          }}
        >
          Importer
        </Button>
      </div>
    </div>
  );
};
