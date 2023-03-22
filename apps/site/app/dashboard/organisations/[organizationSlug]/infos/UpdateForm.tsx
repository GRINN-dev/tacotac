"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { GetOrganizationBySlugQuery, UpdateOrganizationInput } from "@tacotacIO/codegen/temp";
import { useForm } from "react-hook-form";



import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


interface iUpdateOrganization extends ExtractType<GetOrganizationBySlugQuery, "organizationBySlug"> {}
export const UpdateOrganizationForm: FC<iUpdateOrganization> = ({ id, name, description, logoUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState } = useForm<UpdateOrganizationInput>();
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
      router.push(pathname + "?reload=true");

      toast({
        title: "Organisations mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
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

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="logoUrl">Logo</Label>
        <Input type="text" id="logoUrl" placeholder="Logo" defaultValue={logoUrl} {...register("patch.logoUrl", {})} />
        {formState.errors?.patch?.logoUrl && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors.patch?.logoUrl?.message}</p>
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