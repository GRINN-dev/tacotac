"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CivilityStatus, EventStatus, GetEventBySlugQuery, RegisterAttendeesInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Controller, useForm } from "react-hook-form";



import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface iCreateAttendeeForm extends ExtractType<GetEventBySlugQuery, "eventBySlug"> {}

export const CreateAttendeeForm: FC<iCreateAttendeeForm> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control } = useForm<RegisterAttendeesInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.eventId = id;

    await sdk()
      .RegisterAttendees({
        input: data,
      })
      .catch((error: any) => {
        setError(error);
        setIsLoading(false);

        toast({
          title:
            error.response.errors[0].errcode === "RGNST"
              ? "Date d'inscription pas encore ouverte 😋"
              : "Oups ! une erreur est survenue",
        });
        throw error;
      });

    setIsLoading(false);
    startTransition(() => {
      router.push(pathname.substring(0, pathname.lastIndexOf("/participant/create") + 1) + "?reload=true");
    });
  });
  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"attendees.0.status"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={EventStatus.Idle}>En attente</SelectItem>
                    <SelectItem value={EventStatus.Confirmed}>Confirmé</SelectItem>
                    <SelectItem value={EventStatus.Cancelled}>Annulé</SelectItem>
                    <SelectItem value={EventStatus.TicketScan}>Billet scanné</SelectItem>
                    <SelectItem value={EventStatus.PanelScan}>Panneau scanné</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"attendees.0.civility"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Civilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={CivilityStatus.Mr}>Monsieur</SelectItem>
                    <SelectItem value={CivilityStatus.Mme}>Madame</SelectItem>
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
          placeholder="Obole"
          {...register("attendees.0.firstname", {
            required: "Un prénom pour le participant est requis",
          })}
        />
        {formState.errors?.attendees?.at(0)?.firstname && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendees?.at(0)?.firstname?.message}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          placeholder="Obole"
          {...register("attendees.0.lastname", {
            required: "Un nom pour le participant est requis",
          })}
        />
        {formState.errors?.attendees?.at(0)?.lastname && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendees?.at(0)?.lastname?.message}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          placeholder="Obole"
          {...register("attendees.0.email", {
            required: "Un email pour le participant est requis",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Merci d'entrer un email valide",
            },
          })}
        />
        {formState.errors?.attendees?.at(0)?.email && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.attendees?.at(0)?.email?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="phoneNumber">Téléphone</Label>
        <Input
          type="number"
          id="phoneNumber"
          placeholder="Obole"
          {...register("attendees.0.phoneNumber", {
            required: "Un téléphone pour le participant est requis",
          })}
        />
        {formState.errors?.attendees?.at(0)?.phoneNumber && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendees?.at(0)?.phoneNumber?.message}
          </p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="zipCode">Code postale</Label>
        <Input
          type="number"
          id="zipCode"
          placeholder="Obole"
          {...register("attendees.0.zipCode", {
            required: "Un code postal pour le participant est requis",
          })}
        />
        {formState.errors?.attendees?.at(0)?.zipCode && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendees?.at(0)?.zipCode?.message}
          </p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"attendees.0.hearAbout"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Comment avez-vous entendu parler de Lille pour le Bien Commun ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"par un mécéne"}>Par un mécéne</SelectItem>
                    <SelectItem value={"autre"}>Autre</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="isFundraisingGenerosityOk">
          {
            "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
          }
        </Label>
        <Input
          type="checkbox"
          id="isFundraisingGenerosityOk"
          className="h-4 w-4 "
          {...register("attendees.0.isFundraisingGenerosityOk", {
            required: "Cette info pour le participant est requise",
          })}
        />
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="isVip">{"Vip"}</Label>
        <Input type="checkbox" id="isVip" className="h-4 w-4 " {...register("attendees.0.isVip", {})} />
        {formState.errors?.attendees?.at(0)?.isVip && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.attendees?.at(0)?.isVip?.message}</p>
        )}
      </div>
      <div className="mt-8 flex gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Créer
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