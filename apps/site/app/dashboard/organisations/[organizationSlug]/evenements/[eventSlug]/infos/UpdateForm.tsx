"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetEventBySlugQuery, UpdateEventInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { AlertTriangle, MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useForm } from "react-hook-form";



import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";



interface iUpdateEvent extends ExtractType<GetEventBySlugQuery, "eventBySlug"> {}
export const UpdateEventForm: FC<iUpdateEvent> = ({
  id,
  name,
  description,
  startsAt,
  endsAt,
  bookingStartsAt,
  bookingEndsAt,
  country,
  city,
  zipCode,
  addressLine1,
  addressLine2,
  capacity,
  placeName,
  webhooks,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const [webhookList, setWebhookList] = useState<string[]>(webhooks || []);
  const [webhook, setWebhook] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState } = useForm<UpdateEventInput>();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.id = id;
    data.patch.webhooks = webhookList;
    await sdk()
      .UpdateEvent({
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
        title: "Événement mis à jour",
        action: (
          <ToastAction
            onClick={() => router.push(pathname.substring(0, pathname.lastIndexOf("/") + 1) + "?reload=true")}
            altText="Retour"
          >
            Retour
          </ToastAction>
        ),
      });
    });
  });

  const deleteEvent = async () => {
    await sdk().DeleteEvent({ input: { id } });
    router.push("dashboard/organisations");
  };

  const removeItemClick = (index: number) => {
    const newList = [...webhookList];
    newList.splice(index, 1);
    setWebhookList(newList);
  };
  return (
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="name">Nom</Label>
        <Input
          type="text"
          id="name"
          placeholder="Obole"
          defaultValue={name}
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
          {...register("patch.description")}
        />
        {formState.errors?.patch?.description && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.description?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="city">Capacité</Label>
        <Input
          type="number"
          id="capacity"
          placeholder="2300"
          defaultValue={capacity}
          {...register("patch.capacity", {
            valueAsNumber: true,
          })}
        />
        {formState.errors?.patch?.capacity && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.capacity?.message}</p>
        )}
      </div>
      <Separator className="my-8" />

      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        Date et ouverture de la billeterie
      </h2>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="startsAt">Début</Label>
        <Input
          type="datetime-local"
          id="startsAt"
          placeholder="Date"
          defaultValue={dayjs(startsAt).format("YYYY-MM-DDTHH:mm")}
          {...register("patch.startsAt")}
        />
        {formState.errors?.patch?.startsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.patch?.startsAt?.message as string}
          </p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="endsAt">Fin</Label>
        <Input
          type="datetime-local"
          id="endsAt"
          placeholder="Date"
          defaultValue={dayjs(endsAt).format("YYYY-MM-DDTHH:mm")}
          {...register("patch.endsAt")}
        />
        {formState.errors?.patch?.endsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.endsAt?.message as string}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="bookingStartsAt">Date de début des réservations</Label>
        <Input
          type="datetime-local"
          id="bookingStartsAt"
          placeholder="Date de début des réservations"
          defaultValue={dayjs(bookingStartsAt).format("YYYY-MM-DDTHH:mm")}
          {...register("patch.bookingStartsAt")}
        />
        {formState.errors?.patch?.bookingStartsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.patch?.bookingStartsAt?.message as string}
          </p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="bookingEndsAt">Date de fin des réservations</Label>
        <Input
          type="datetime-local"
          id="bookingEndsAt"
          placeholder="Date de fin des réservations"
          defaultValue={dayjs(bookingEndsAt).format("YYYY-MM-DDTHH:mm")}
          {...register("patch.bookingEndsAt")}
        />
        {formState.errors?.patch?.bookingEndsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.patch?.bookingEndsAt?.message as string}
          </p>
        )}
      </div>
      <Separator className="my-8" />

      <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
        Lieu
      </h2>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label>Liste des webhooks</Label>
        <ul className="list-disc pl-4">
          {webhookList?.length > 0
            ? webhookList?.map((webhook, index) => (
                <li key={webhook + index}>
                  <div
                    className="inline-flex items-center rounded-full border border-transparent p-1 shadow-sm focus:outline-none"
                    onClick={() => removeItemClick(index)}
                  >
                    {webhook} <MinusCircle className="ml-2" />
                  </div>
                </li>
              ))
            : "Aucun webhook pour l'instant"}
        </ul>
        <Label htmlFor="placeName">Nom du lieu</Label>
        <Input
          type="text"
          id="placeName"
          placeholder="Nom du lieu"
          defaultValue={placeName}
          {...register("patch.placeName")}
        />
        {formState.errors?.patch?.placeName && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.placeName?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="addressLine1">Adresse</Label>
        <Input
          type="text"
          id="addressLine1"
          placeholder="Adresse"
          defaultValue={addressLine1}
          {...register("patch.addressLine1")}
        />
        {formState.errors?.patch?.addressLine1 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.addressLine1?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="addressLine2">Complément d&apos;adresse</Label>
        <Input
          type="text"
          id="addressLine2"
          defaultValue={addressLine2}
          placeholder="Complément d'adresse"
          {...register("patch.addressLine2")}
        />
        {formState.errors?.patch?.addressLine2 && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.addressLine2?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="zipCode">Code postal</Label>
        <Input
          type="text"
          id="zipCode"
          placeholder="Code postal"
          defaultValue={zipCode}
          {...register("patch.zipCode")}
        />
        {formState.errors?.patch?.zipCode && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.zipCode?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="city">Ville</Label>
        <Input type="text" id="city" placeholder="Ville" defaultValue={city} {...register("patch.city")} />
        {formState.errors?.patch?.city && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.city?.message}</p>
        )}
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="country">Pays</Label>
        <Input type="text" id="country" placeholder="Pays" defaultValue={country} {...register("patch.country")} />
        {formState.errors?.patch?.country && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.country?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
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
        <Label>Liste des webhooks</Label>
        <ul className="list-disc pl-4">
          {webhookList?.length > 0
            ? webhookList?.map((webhook, index) => (
                <li key={webhook + index}>
                  <div
                    className="inline-flex items-center rounded-full border border-transparent p-1  shadow-sm  focus:outline-none"
                    onClick={() => removeItemClick(index)}
                  >
                    {webhook} <MinusCircle className="ml-2" />
                  </div>
                </li>
              ))
            : "Aucun webhook pour l'instant"}
        </ul>
        <div className="flex space-x-4">
          <Input
            type="text"
            id="webhookList"
            placeholder="Saissir un webhook"
            onChange={(evt) => setWebhook(evt?.currentTarget?.value)}
          />
          <div
            className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm focus:outline-none"
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
      </div>
      <div className="mt-8 flex justify-between gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Mettre à jour
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Supprimer cet évenement
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sur de vous ? </AlertDialogTitle>
              <AlertDialogDescription>
                <span className="flex flex-col space-y-4">
                  <span>{"Vous allez supprimer un événement et tous les participants qui lui sont liés."}</span>
                  <span>{"Vous serez rediriger vers la page organisations une fois la suppression terminé"}</span>
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={deleteEvent}>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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