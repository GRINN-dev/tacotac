"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreateOrganizationInput } from "@/../../@tacotacIO/codegen/dist";
import { useForm } from "react-hook-form";



import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export const CreateOrganizationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState } =
    useForm<CreateOrganizationInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await sdk()
      .CreateOrganization({
        input: data,
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      router.back();
    });
  });
  return (
    <form
      onSubmit={onSubmit}
      className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}
    >
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="name">Nom</Label>
        <Input
          type="text"
          id="name"
          placeholder="Obole"
          {...register("organization.name", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.organization?.name && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.organization?.name?.message}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("organization.description", {
            required: "Une description pour l'organisation est requise",
          })}
        />
        {formState.errors?.organization?.description && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.organization?.description?.message}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="logoUrl">Logo</Label>
        <Input
          type="text"
          id="logoUrl"
          placeholder="Logo"
          {...register("organization.logoUrl", {})}
        />
        {formState.errors?.organization?.logoUrl && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors.organization?.logoUrl?.message}
          </p>
        )}
      </div>
      <div className="flex gap-2 mt-8">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Créer
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