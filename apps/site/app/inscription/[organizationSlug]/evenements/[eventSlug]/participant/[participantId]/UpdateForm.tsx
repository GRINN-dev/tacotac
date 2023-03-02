"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EventStatus, GetAttendeeByIdQuery, UpdateAttendeeInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
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

interface iUpdateAttendee extends ExtractType<GetAttendeeByIdQuery, "attendee"> {}

export const UpdateAttendeeForm: FC<iUpdateAttendee> = ({ id, firstname, lastname, email, status, eventId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control } = useForm<UpdateAttendeeInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.id = id;
    await sdk()
      .UpdateAttendee({
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
        title: "Participant mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
    });
  });
  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"patch.status"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select defaultValue={status} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un status" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value={EventStatus.Idle}>En attente</SelectItem>
                    <SelectItem value={EventStatus.Cancelled}>Annulé</SelectItem>
                    <SelectItem value={EventStatus.Confirmed}>Confirmé</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          defaultValue={firstname}
          placeholder="Martin"
          {...register("patch.firstname", {
            required: "Un prénom pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.firstname && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.firstname?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          defaultValue={lastname}
          placeholder="Martin"
          {...register("patch.lastname", {
            required: "Un nom pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.lastname && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.lastname?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          defaultValue={email}
          placeholder="mon@email.com"
          {...register("patch.email", {
            required: "Un email pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.email && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.email?.message}</p>
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