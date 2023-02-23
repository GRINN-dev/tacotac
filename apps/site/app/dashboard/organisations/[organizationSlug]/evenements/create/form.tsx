"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CreateEventInput } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";

export const CreateEventForm: FC<{ organizationId: string }> = ({ organizationId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState } = useForm<CreateEventInput>();
  const { toast } = useToast();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await sdk()
      .CreateEvent({
        input: { ...data, event: { ...data.event, organizationId } },
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1) + "?reload=true");
      // toast({
      //   title: "Événement crée !",
      //   description: "Vous pouvez vérifier vos informations ou retourner a la page précedente",
      //   action: (
      //     <ToastAction
      //       onClick={() => router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1))}
      //       altText="Retour"
      //     >
      //       Retour
      //     </ToastAction>
      //   ),
      // });
      //router.push(pathname);
    });
  });
  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 border-b-slate-200 first:mt-0 dark:border-b-slate-700">
        Informations générales
      </h2>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="name">Nom</Label>
        <Input
          type="text"
          id="name"
          placeholder="Obole"
          {...register("event.name", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.event?.name && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.name?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("event.description", {
            required: "Une description pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.description && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.description?.message}</p>
        )}
      </div>
      <Separator className="my-8" />

      <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 border-b-slate-200 first:mt-0 dark:border-b-slate-700">
        Date et ouverture de la billeterie
      </h2>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="startsAt">Date</Label>
        <Input
          type="datetime-local"
          id="startsAt"
          placeholder="Date"
          {...register("event.startsAt", {
            required: "Une date pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.startsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.startsAt?.message as string}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="bookingStartsAt">Date de début des réservations</Label>
        <Input
          type="datetime-local"
          id="bookingStartsAt"
          placeholder="Date de début des réservations"
          {...register("event.bookingStartsAt", {
            required: "Une date de début des réservations pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.bookingStartsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.bookingStartsAt?.message as string}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="bookingEndsAt">Date de fin des réservations</Label>
        <Input
          type="datetime-local"
          id="bookingEndsAt"
          placeholder="Date de fin des réservations"
          {...register("event.bookingEndsAt", {
            required: "Une date de fin des réservations pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.bookingEndsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.bookingEndsAt?.message as string}
          </p>
        )}
      </div>
      <Separator className="my-8" />

      <h2 className="pb-2 mt-10 text-3xl font-semibold tracking-tight transition-colors border-b scroll-m-20 border-b-slate-200 first:mt-0 dark:border-b-slate-700">
        Lieu
      </h2>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="placeName">Nom du lieu</Label>
        <Input
          type="text"
          id="placeName"
          placeholder="Nom du lieu"
          {...register("event.placeName", {
            required: "Un nom de lieu pour l'organisation est requis",
          })}
        />
        {formState.errors?.event?.placeName && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.placeName?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="addressLine1">Adresse</Label>
        <Input
          type="text"
          id="addressLine1"
          placeholder="Adresse"
          {...register("event.addressLine1", {
            required: "Une adresse pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.addressLine1 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.addressLine1?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="addressLine2">Complément d&apos;adresse</Label>
        <Input type="text" id="addressLine2" placeholder="Complément d'adresse" {...register("event.addressLine2")} />
        {formState.errors?.event?.addressLine2 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.addressLine2?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="postalCode">Code postal</Label>
        <Input
          type="text"
          id="postalCode"
          placeholder="Code postal"
          {...register("event.zipCode", {
            required: "Un code postal pour l'organisation est requis",
          })}
        />
        {formState.errors?.event?.zipCode && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.zipCode?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="city">Ville</Label>
        <Input
          type="text"
          id="city"
          placeholder="Ville"
          {...register("event.city", {
            required: "Une ville pour l'organisation est requise",
          })}
        />
        {formState.errors?.event?.city && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.city?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="country">Pays</Label>
        <Input
          type="text"
          id="country"
          placeholder="Pays"
          {...register("event.country", {
            required: "Un pays pour l'organisation est requis",
          })}
        />
        {formState.errors?.event?.country && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.country?.message}</p>
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