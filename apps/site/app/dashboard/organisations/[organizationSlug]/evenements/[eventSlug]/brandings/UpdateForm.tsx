"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Fonts, GetEventByIdQuery, UpdateEventBrandingInput } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, uploadToS3 } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface IUpdateBrandingEvent extends ExtractType<ExtractType<GetEventByIdQuery, "event">, "eventBranding"> {}

export const UpdateEventBrandingForm: FC<IUpdateBrandingEvent> = ({
  id,
  color1,
  color2,
  font,
  logo,
  placeholder,
  richText,
  shortText,
  awardWinningAssoList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [awardWinning, setAwardWinning] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [awardWinningList, setAwardWinningList] = useState<string[]>(awardWinningAssoList || []);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control } = useForm<UpdateEventBrandingInput>();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (files.length > 0) {
      const url = await uploadToS3(files[0]);

      data.patch.logo = url;
    } else {
      data.patch.logo = logo;
    }
    data.id = id;
    data.patch.awardWinningAssoList = awardWinningList;
    await sdk()
      .UpdateEventBranding({
        input: data,
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      router.push(pathname + "?reload=true");

      toast({
        title: "Formulaire mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
    });
  });

  const removeItemClick = (index: number) => {
    const newList = [...awardWinningList];
    newList.splice(index, 1);
    setAwardWinningList(newList);
  };

  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="color1">Couleur 1</Label>
        <Input
          type="text"
          id="color1"
          defaultValue={color1}
          placeholder="color1"
          {...register("patch.color1", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.color1 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.color1?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="color2">Couleur 2</Label>
        <Input
          type="text"
          id="color2"
          defaultValue={color2}
          placeholder="color2"
          {...register("patch.color2", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.color2 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.color2?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Controller
          name={"patch.font"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select defaultValue={font} onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Police" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={Fonts.Roboto}>Roboto</SelectItem>
                    <SelectItem value={Fonts.Montserrat}>Montserrat</SelectItem>
                    <SelectItem value={Fonts.Opensans}>Open Sans</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="logo">Logo</Label>
        <div className="flex flex-row space-x-4">
          <FileDragNDrop
            id={"fileDnD" + id}
            title={"Logo"}
            placeholder="Glissez vos images ici"
            acceptFormat="image/*"
            onFileUpload={(file) => {
              setFiles(file);
            }}
          />
          {files.length > 0 ? (
            <img
              className="w-1/2 aspect-[3/2] rounded-2xl object-cover"
              src={URL.createObjectURL(files[0])}
              alt="preview logo"
            />
          ) : logo ? (
            <img className="w-1/2 aspect-[3/2] rounded-2xl object-cover" src={logo} alt="logo" />
          ) : (
            <div className="w-1/2 aspect-[3/2] rounded-2xl object-cover border border-dashed"></div>
          )}
        </div>

        {formState.errors?.patch?.logo && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.logo?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label htmlFor="richText">Contenu rich text</Label>
        <Textarea
          id="richText"
          defaultValue={richText}
          placeholder="type url here"
          {...register("patch.richText", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.richText && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.richText?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label htmlFor="shortText">Court texte</Label>
        <Input
          type="text"
          id="shortText"
          defaultValue={shortText}
          placeholder="type url here"
          {...register("patch.shortText", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.shortText && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.shortText?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label>Liste des lauréats</Label>

        <ul className="list-disc pl-4">
          {awardWinningList.length>0?awardWinningList?.map((awardWinning,index) => (
            <li key={awardWinning+index}> 
            <div
              className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm  focus:outline-none"
              onClick={() => removeItemClick(index)}
            >
              {awardWinning} <MinusCircle className="ml-2" />
            </div></li>
          )):"Aucun lauréat pour le moment"}

        </ul>

        <Label className="mt-2" htmlFor="awardWinningAssoList">
          Modifier la liste des lauréats
        </Label>
        <div className="flex space-x-4">
          <Input
            type="text"
            id="awardWinningAssoList"
            value={awardWinning}
            placeholder="Saissir un lauréat"
            onChange={(evt) => setAwardWinning(evt?.currentTarget?.value)}
          />
          <div
            className="inline-flex items-center p-1 text-white border border-transparent rounded-full shadow-sm focus:outline-none"
            onClick={() => {
            if (awardWinning) {
              setAwardWinningList([...awardWinningList, awardWinning]);
              setAwardWinning("");
            }
            }}
          >
            Ajouter <PlusCircle className="ml-2" />
          </div>
        </div>


      </div>
      <div className="flex gap-2 mt-8">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Mettre à jour
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-800 line-clamp-3 dark:text-red-300">
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
