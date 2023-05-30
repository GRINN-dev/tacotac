"use client";

import { FC, Key, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FieldTypes, GetEventBySlugQuery, RegisterAttendeesCsvInput } from "@/../../@tacotacIO/codegen/dist";
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
  const [parsedData, setParsedData] = useState([]);
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
          /* return {
            civility: result.civility,
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            isVip: result.isVip === "false" ? false : true,
            isInscriptor: result.isInscriptor === "false" ? false : true,
          }; */
        });
        setParsedData(resultsRewrite);
      },
    });
  };

  const onSubmit = () => {
    for (let i = 0; i < data.completeAttendees.length; i++) {
      data.completeAttendees[i].attendee = {
        email: "",
        firstname: "",
        lastname: "",
        civility: "",
        isInscriptor: false,
      };
      if (i === 0) {
        data.completeAttendees[i].attendee.isInscriptor = true;
      }

      for (let j = 0; j < data.completeAttendees[i].attendeeFormFields.length; j++) {
        if (data.completeAttendees[i].attendeeFormFields[j].fieldId === emailFormFieldId) {
          data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value;
        }
        if (data.completeAttendees[i].attendeeFormFields[j].fieldId === firstnameFormFieldId) {
          data.completeAttendees[i].attendee.firstname = data.completeAttendees[i].attendeeFormFields[j].value;
        }
        if (data.completeAttendees[i].attendeeFormFields[j].fieldId === lastnameFormFieldId) {
          data.completeAttendees[i].attendee.lastname = data.completeAttendees[i].attendeeFormFields[j].value;
        }
        if (data.completeAttendees[i].attendeeFormFields[j].fieldId === civilityFormFieldId) {
          data.completeAttendees[i].attendee.civility = data.completeAttendees[i].attendeeFormFields[j].value;
        }

        data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value = String(
          (data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value)
        );
      }
    }

    /*     const res = await sdk().RegisterCompleteAttendees({ input: data });

            res.registerCompleteAttendees?.registration?.id ? setSuccess(true) : setError("Une erreur est survenue");
            setLoading(false); */

    sdk()
      .RegisterCompleteAttendeesCsv({
        input: { eventId: event.id, completeAttendees: parsedData, isForcing: isForcingImport },
      })
      .then((response) => {
        if (response.registerCompleteAttendeeCsv.attendeeImports.find(({ errorCode }) => errorCode === "RGNST")) {
          toast({
            variant: "destructive",
            action: (
              <>
                <div className="flex flex-col">
                  <button
                    className={buttonVariants({ size: "lg" })}
                    onClick={() => {
                      setIsForcingImport(true);
                      onSubmit();
                    }}
                  >
                    Forcer import
                  </button>
                  <p>
                    {
                      response.registerCompleteAttendeeCsv.attendeeImports.find(
                        ({ errorCode }) => errorCode === "RGNST"
                      ).errorMessage
                    }
                  </p>
                  <p>
                    {response.registerCompleteAttendeeCsv.attendeeImports.reduce((acc, { errorValue, errorCode }) => {
                      return acc.concat(errorCode === "RGNST" ? errorValue + " , " : "  ");
                    }, "")}
                  </p>
                </div>
              </>
            ),
          });
          setIsForcingImport(false);
        } else {
          router.push(`/admin/${organizationSlug}/${eventSlug}`);
          toast({
            title: "Import terminé",
            action: (
              <ToastAction
                onClick={() => router.push(pathname.substring(0, pathname.lastIndexOf("/import") + 1) + "?reload=true")}
                altText="Retour"
              >
                Retour
              </ToastAction>
            ),
          });
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
        <div className="mt-10">{csvUploadrender?.length > 0 && <SimpleCollection arrayList={csvUploadrender} />}</div>
      </div>
      <div className={cn("mt-8 flex gap-2", !parsedData.length && "hidden")}>
        <Button
          onClick={() => {
            setIsLoading(true);
            onSubmit();
          }}
        >
          Importer
        </Button>
      </div>
    </div>
  );
};
