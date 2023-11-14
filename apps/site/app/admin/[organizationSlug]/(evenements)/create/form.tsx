"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CreateEventInput } from "@tacotacIO/codegen";
import { AlertTriangle, MinusCircle, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const CreateEventForm: FC<{ organizationId: string }> = ({ organizationId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const [webhookList, setWebhookList] = useState<string[]>([]);
  const [webhook, setWebhook] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState } = useForm<CreateEventInput>();
  const onSubmit = handleSubmit(async (data: any) => {
    setIsLoading(true);
    data.event.webhooks = webhookList;
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
      router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1));
    });
  });

  const removeItemClick = (index: number) => {
    const newList = [...webhookList];
    newList.splice(index, 1);
    setWebhookList(newList);
  };

  return (
    <form onSubmit={onSubmit} className={cn("mt-4", isSubmitting && "animate-pulse")}>
      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        Informations générales
      </h2>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="name">Nom</Label>
        <Input
          type="text"
          id="name"
          placeholder="Obole"
          {...register("event.name", {
            required: "Un nom pour équipe est requis",
          })}
        />
        {formState.errors?.event?.name && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.name?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("event.description", {
            required: "Une description pour équipe est requise",
          })}
        />
        {formState.errors?.event?.description && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.description?.message}</p>
        )}
      </div>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="city">Capacité</Label>
        <Input
          type="number"
          id="capacity"
          placeholder="2300"
          {...register("event.capacity", {
            required: "Une capacité est requise",
            valueAsNumber: true,
          })}
        />
        {formState.errors?.event?.capacity && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.capacity?.message}</p>
        )}
      </div>

      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        {"Début et Fin de l'événement"}
      </h2>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="startsAt">Début</Label>
        <Input
          type="datetime-local"
          id="startsAt"
          placeholder="Date"
          {...register("event.startsAt", {
            required: "Une date pour équipe est requise",
          })}
        />
        {formState.errors?.event?.startsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.startsAt?.message as string}
          </p>
        )}
      </div>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="endsAt">Fin</Label>
        <Input
          type="datetime-local"
          id="endsAt"
          placeholder="Date"
          {...register("event.endsAt", {
            required: "Une date pour équipe est requise",
          })}
        />
        {formState.errors?.event?.endsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.endsAt?.message as string}</p>
        )}
      </div>

      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        Début et Fin de la réservation
      </h2>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="bookingStartsAt">Début</Label>
        <Input
          type="datetime-local"
          id="bookingStartsAt"
          placeholder="Date de début des réservations"
          {...register("event.bookingStartsAt", {
            required: "Une date de début des réservations pour équipe est requise",
          })}
        />
        {formState.errors?.event?.bookingStartsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.bookingStartsAt?.message as string}
          </p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="bookingEndsAt">Fin</Label>
        <Input
          type="datetime-local"
          id="bookingEndsAt"
          placeholder="Date de fin des réservations"
          {...register("event.bookingEndsAt", {
            required: "Une date de fin des réservations pour équipe est requise",
          })}
        />
        {formState.errors?.event?.bookingEndsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.event?.bookingEndsAt?.message as string}
          </p>
        )}
      </div>

      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        Lieu
      </h2>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="placeName">Nom du lieu</Label>
        <Input
          type="text"
          id="placeName"
          placeholder="Nom du lieu"
          {...register("event.placeName", {
            required: "Un nom de lieu pour équipe est requis",
          })}
        />
        {formState.errors?.event?.placeName && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.placeName?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="addressLine1">Adresse</Label>
        <Input
          type="text"
          id="addressLine1"
          placeholder="Adresse"
          {...register("event.addressLine1", {
            required: "Une adresse pour équipe est requise",
          })}
        />
        {formState.errors?.event?.addressLine1 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.addressLine1?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="addressLine2">Complément d&apos;adresse</Label>
        <Input type="text" id="addressLine2" placeholder="Complément d'adresse" {...register("event.addressLine2")} />
        {formState.errors?.event?.addressLine2 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.addressLine2?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="postalCode">Code postal</Label>
        <Input
          type="text"
          id="postalCode"
          placeholder="Code postal"
          {...register("event.zipCode", {
            required: "Un code postal pour équipe est requis",
          })}
        />
        {formState.errors?.event?.zipCode && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.zipCode?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="city">Ville</Label>
        <Input
          type="text"
          id="city"
          placeholder="Ville"
          {...register("event.city", {
            required: "Une ville pour équipe est requise",
          })}
        />
        {formState.errors?.event?.city && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.city?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="country">Pays</Label>
        <Input
          type="text"
          id="country"
          placeholder="Pays"
          {...register("event.country", {
            required: "Un pays pour équipe est requis",
          })}
        />
        {formState.errors?.event?.country && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.event?.country?.message}</p>
        )}
      </div>
      <div className="mt-4 grid items-center gap-1.5">
        <Label className="mt-2" htmlFor="webhookList">
          Ajouter un webhook (Zapier, Maker, etc.)
          <div className="my-4 rounded-lg border p-4">
            <div className="flex">
              <div className="shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-200" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-200">Attention </h3>
                <div className="mt-2 text-sm ">
                  <p>{`Le webhook doit recevoir les données qu'on lui envoi, et non un webhook de demande d'infos.`}</p>
                  <p className="italic">{`L'url doit ressembler à ceci : https://hook.eu1.make.com/m71ivakh5nnwknu1zwmdefle1u2c1qjs`}</p>
                </div>
              </div>
            </div>
          </div>
        </Label>
        <div className="flex space-x-4">
          <Input
            type="text"
            id="webhookList"
            placeholder="Saissir un webhook"
            onChange={(evt) => setWebhook(evt?.currentTarget?.value)}
          />
          <div
            className="inline-flex items-center rounded-full border border-transparent p-1  shadow-sm  focus:outline-none"
            onClick={() => {
              if (webhook) {
                setWebhookList([...webhookList, webhook]);
                setWebhook("");
              }
            }}
          >
            Ajouter <PlusCircle className="ml-2" />
          </div>
        </div>

        {webhookList?.map((webhook, index) => (
          <div
            key={webhook + index}
            className="inline-flex items-center rounded-full border border-transparent p-1  shadow-sm  focus:outline-none"
            onClick={() => removeItemClick(index)}
          >
            {webhook} <MinusCircle className="ml-2" />
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Créer
        </button>
      </div>
      {error && (
        <p className="mt-2 line-clamp-3 text-sm text-red-800 dark:text-red-300">
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
