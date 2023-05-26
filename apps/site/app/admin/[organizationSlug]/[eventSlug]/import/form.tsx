"use client";

import { FC, Key, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetEventBySlugQuery, RegisterAttendeesCsvInput } from "@/../../@tacotacIO/codegen/dist";
import { AlertTriangle } from "lucide-react";
import { parse } from "papaparse";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import SimpleCollection from "@/components/table/SimpleCollection";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

interface iImportAttendeesProps extends ExtractType<GetEventBySlugQuery, "eventBySlug"> {}

interface ICsv {
  civility: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  status: string;
  isInscriptor: string;
  isVip: string;
}

export const ImportAttendeesForm: FC<iImportAttendeesProps> = ({ id, name, description }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const [parsedData, setParsedData] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [csvUploadrender, setCsvUploadRender] = useState([]);
  let isForcingImport: boolean = false;
  const handleCsvUpload = async (csvUpload: any) => {
    setParsedData([]);
    setCsvUploadRender([]);
    parse(csvUpload[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const isMail = results.data.every((result: ICsv) => result?.email);
        if (results.errors.length > 0 || !isMail) {
          toast({
            variant: "destructive",
            title: !isMail ? "Un email est au moins manquant dans le csv" : results.errors[0].message,
          });
          throw error;
        }
        setCsvUploadRender(results.data);

        const resultsRewrite = results.data.map((result: ICsv) => {
          return {
            ...result,
            isVip: result.isVip === "false" ? false : true,
            isInscriptor: result.isInscriptor === "false" ? false : true,
          };
        });
        setParsedData(resultsRewrite);
      },
    });
  };

  const onSubmit = () => {
    sdk()
      .RegisterAttendeesCsv({
        input: { eventId: id, attendeesCsv: parsedData, isForcing: isForcingImport },
      })
      .then((response) => {
        if (response.registerAttendeesCsv.attendeeImports.find(({ errorCode }) => errorCode === "RGNST")) {
          toast({
            variant: "destructive",
            action: (
              <>
                <div className="flex flex-col">
                  <button
                    className={buttonVariants({ size: "lg" })}
                    onClick={() => {
                      isForcingImport = true;
                      onSubmit();
                    }}
                  >
                    Forcer import
                  </button>
                  <p>
                    {
                      response.registerAttendeesCsv.attendeeImports.find(({ errorCode }) => errorCode === "RGNST")
                        .errorMessage
                    }
                  </p>
                  <p>
                    {response.registerAttendeesCsv.attendeeImports.reduce((acc, { errorValue, errorCode }) => {
                      return acc.concat(errorCode === "RGNST" ? errorValue + " , " : "  ");
                    }, "")}
                  </p>
                </div>
              </>
            ),
          });
          isForcingImport = false;
        } else {
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
          isForcingImport = false;
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
    <div className={cn("mt-4", isSubmitting && "animate-pulse")}>
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
                  window.open(
                    "https://docs.google.com/spreadsheets/d/131AXHOhQKZKA_OWVTJ6aMC65rV-ugrTbaSNkpCOwTzM/edit?usp=sharing",
                    "_ blank"
                  );
                }}
              >
                Voir un exemple
              </Button>
            </div>
          </div>
        </div>
        <FileDragNDrop
          id={"csvDnD" + id}
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
