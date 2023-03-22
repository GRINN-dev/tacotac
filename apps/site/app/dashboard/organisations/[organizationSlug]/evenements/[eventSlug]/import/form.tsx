"use client";

import { FC, Key, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetEventBySlugQuery, RegisterAttendeesCsvInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { parse } from "papaparse";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

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
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm<RegisterAttendeesCsvInput>();

  const handleCsvUpload = async (csvUpload: any) => {
    setParsedData([]);
    setTableRows([]);
    setValues([]);
    parse(csvUpload[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const isMail = results.data.every((result: ICsv) => result?.email);
        if (results.errors.length > 0 || !isMail) {
          toast({
            title: !isMail ? "Un email est manquant" : results.errors[0].message,
          });
          throw error;
        }
        results.data.map((d: ICsv) => {
          setTableRows([...Object.keys(d)]);
          setValues((prevValues) => [...prevValues, Object.values(d)]);
        });

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

  const onSubmit = handleSubmit(async () => {
    await sdk()
      .RegisterAttendeesCsv({
        input: { eventId: id, attendeesCsv: parsedData },
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        toast({
          title:
            error.response.errors[0].errcode === "RGNST"
              ? error.response.errors[0].message
              : "Oups ! une erreur est survenue",
        });
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      toast({
        title: "Import terminé",
        action: (
          <ToastAction
            onClick={() => router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1) + "?reload=true")}
            altText="Retour"
          >
            Retour
          </ToastAction>
        ),
      });
    });
  });

  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <div className="my-4 rounded-lg border p-4">
          <div className="flex">
            <div className="shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-200" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">Attention </h3>
              <div className="mt-2 text-sm ">
                <p>
                  {`L'import enregistrera directement les participants présents dans le csv et recevront, donc, automatiquement leur billet par mail.`}
                </p>
              </div>
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
        <div className="-mx-4 mt-10 rounded-lg bg-black ring-1 ring-gray-300 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-300 ">
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return (
                    <th key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6">
                      {rows}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index: Key) => {
                return (
                  <tr key={index}>
                    {value.map((_val, i: Key) => {
                      return (
                        <td key={i} className="relative border-t py-4 pl-4 pr-3 text-sm sm:pl-6">
                          {value[i]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Importer
        </button>
      </div>
    </form>
  );
};