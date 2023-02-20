"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  GetEventByIdQuery,
  GetOrganizationBySlugQuery,
  UpdateEventInput,
  UpdateOrganizationInput,
} from "@/../../@tacotacIO/codegen/dist";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface iUpdateEvent extends ExtractType<GetEventByIdQuery, "event"> {}
export const UpdateEventForm: FC<iUpdateEvent> = ({ id, name, description }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<UpdateEventInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.id = id;
    await sdk()
      .UpdateOrganization({
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
        <Label htmlFor="name">Nom</Label>
        <Input
          type="text"
          id="name"
          defaultValue={name}
          placeholder="Obole"
          {...register("patch.name", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.name && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.name?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          defaultValue={description}
          {...register("patch.description", {
            required: "Une description pour l'organisation est requise",
          })}
        />
        {formState.errors?.patch?.description && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.description?.message}</p>
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
