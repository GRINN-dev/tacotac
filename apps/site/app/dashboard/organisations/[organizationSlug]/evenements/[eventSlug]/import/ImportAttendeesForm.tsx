"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetEventByIdQuery, RegisterAttendeesInput, UpdateEventInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";

interface iImportAttendeesProps extends ExtractType<GetEventByIdQuery, "event"> {}
export const ImportAttendeesForm: FC<iImportAttendeesProps> = ({ id, name, description }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [files, setFiles] = useState<File[]>([]);

  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState } = useForm<RegisterAttendeesInput>();
  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: ImportAttendeesForm.tsx:27 ~ onSubmit ~ files:", files.at(0), "data: ", data);
    setIsLoading(true);
    // await sdk()
    //   .UpdateEvent({
    //     input: data,
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setIsLoading(false);
    //     throw error;
    //   });
    // setIsLoading(false);
    // startTransition(() => {
    //   router.push(pathname + "?reload=true");

    //   toast({
    //     title: "Événement mis à jour",
    //     action: (
    //       <ToastAction
    //         onClick={() => router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1) + "?reload=true")}
    //         altText="Retour"
    //       >
    //         Retour
    //       </ToastAction>
    //     ),
    //   });
    // });
  });
  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="name">CSV</Label>
        <FileDragNDrop
          id={"fileDnD" + id}
          title={"Logo"}
          acceptFormat=".csv"
          onFileUpload={(file) => {
            setFiles(file);
          }}
        />
      </div>

      <div className="mt-8 flex gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Importer
        </button>
      </div>
      {error && (
        <p className="line-clamp-3 mt-2 text-sm text-red-800 dark:text-red-300">
          {JSON.stringify(
            error,
            (key, value) => {
              if (key === "response") {
                return undefined;
              }
              return value;
            },
            2
          )}
        </p>
      )}
    </form>
  );
};