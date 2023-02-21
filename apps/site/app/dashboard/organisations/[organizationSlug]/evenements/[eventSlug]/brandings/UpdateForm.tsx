"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { GetEventByIdQuery, UpdateEventBrandingInput } from "@/../../@tacotacIO/codegen/dist";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  longText,
  awardWinningAssoList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<UpdateEventBrandingInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.id = id;
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
      router.push("/organizations");
    });
  });
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
        <Label htmlFor="font">Police</Label>
        <Input
          type="text"
          id="font"
          defaultValue={font}
          placeholder="font"
          {...register("patch.font", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.font && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.font?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label htmlFor="logo">Logo</Label>
        <Input
          type="text"
          id="logo"
          defaultValue={logo}
          placeholder="type url here"
          {...register("patch.logo", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
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
        <Label htmlFor="longText">Long text</Label>
        <Textarea
          id="longText"
          defaultValue={longText}
          placeholder="type url here"
          {...register("patch.longText", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.longText && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.longText?.message}</p>
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
