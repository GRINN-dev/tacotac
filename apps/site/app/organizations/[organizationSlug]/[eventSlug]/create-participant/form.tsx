"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CreateAttendeeInput,
  CreateEventInput,
  EventStatus,
} from "@/../../@tacotacIO/codegen/dist";
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

export const CreateAttendeeForm: FC<{ eventId: string }> = ({ eventId }) => {
  console.log("🚀 ~ file: form.tsx:159 ~ eventId", eventId);

  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState, control } =
    useForm<CreateAttendeeInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await sdk()
      .CreateAttendee({
        input: { ...data, attendee: { ...data.attendee, eventId } },
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
      <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 border-b-slate-200 first:mt-0 dark:border-b-slate-700">
        Informations générales
      </h2>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"attendee.status"}
          control={control}
          render={({
            field: { onChange, onBlur, value, ref, name },
            fieldState: { error },
          }) => (
            <>
              <Select onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un status" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value={EventStatus.Idle}>En attente</SelectItem>
                    <SelectItem value={EventStatus.Cancelled}>
                      Annulé
                    </SelectItem>
                    <SelectItem value={EventStatus.Confirmed}>
                      Confirmé
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && (
                <p className="text-sm text-red-800 dark:text-red-300">
                  {error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          placeholder="Romain"
          {...register("attendee.firstname", {
            required: "Un prénom pour l'utilisateur est requis",
          })}
        />
        {formState.errors?.attendee?.firstname && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendee?.firstname?.message}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          id="lastname"
          placeholder="lastname"
          {...register("attendee.lastname", {
            required: "Un nom pour l'utilisateur est requise",
          })}
        />
        {formState.errors?.attendee?.lastname && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendee?.lastname?.message}
          </p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email"
          {...register("attendee.email", {
            required: "Un email pour l'utilisateur est requise",
          })}
        />
        {formState.errors?.attendee?.email && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendee?.email?.message}
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
