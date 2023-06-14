"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  CalendarAndTimeFormField,
  InputFormField,
  NumberFormField,
  TextAreaFormField,
} from "@/components/ui/form/form-fields";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    name: z.string().nonempty({ message: "Le nom de l'événement est obligatoire" }),
    description: z.string().optional(),
    capacity: z.coerce.number().positive({ message: "La capacité doit être un nombre positif" }).optional(),
    bookingStartDate: z.date().optional(),
    bookingEndDate: z.date().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    placeName: z.string().nonempty({ message: "Le nom du lieu est obligatoire" }),
    placeAddress: z.string().nonempty({ message: "L'adresse du lieu est obligatoire" }),
    placeAddressComplement: z.string().optional(),
    placeZipCode: z.string().nonempty({ message: "Le code postal du lieu est obligatoire" }),
    placeCity: z.string().nonempty({ message: "La ville du lieu est obligatoire" }),
    placeCountry: z.string().optional(),
    webhooks: z
      .array(
        z.object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
  })
  .refine(({ bookingEndDate, bookingStartDate }) => bookingEndDate < bookingStartDate, {
    message: "La date de fin de la billeterie doit être après la date d'ouverture",
    path: ["bookingEndDate"],
  })
  .refine(({ endDate, startDate }) => endDate < startDate, {
    message: "La date de fin de l'événement doit être après la date de début",
    path: ["endDate"],
  });

export const UpdateForm: FC<{ event: GetEventBySlugQuery["eventBySlug"] }> = ({ event }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event.name,
      description: event.description,
      capacity: event.capacity,
      bookingStartDate: event.bookingStartsAt && new Date(event.bookingStartsAt),
      bookingEndDate: event.bookingEndsAt && new Date(event.bookingEndsAt),
      startDate: event.startsAt && new Date(event.startsAt),
      endDate: event.endsAt && new Date(event.endsAt),
      placeName: event.placeName,
      placeAddress: event.addressLine1,
      placeAddressComplement: event.addressLine2,
      placeZipCode: event.zipCode,
      placeCity: event.city,
      placeCountry: event.country,
      webhooks: event.webhooks.map((webhook) => ({ value: webhook })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "webhooks",
    control: form.control,
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await sdk()
      .UpdateEvent({
        input: {
          id: event.id,
          patch: {
            name: values.name,
            description: values.description,
            capacity: values.capacity,
            bookingStartsAt: values.bookingStartDate,
            bookingEndsAt: values.bookingEndDate,
            startsAt: values.startDate,
            endsAt: values.endDate,
            placeName: values.placeName,
            addressLine1: values.placeAddress,
            addressLine2: values.placeAddressComplement,
            zipCode: values.placeZipCode,
            city: values.placeCity,
            country: values.placeCountry,
            webhooks: values.webhooks.map((webhook) => webhook.value),
          },
        },
      })
      .catch((error) => {
        setError(error);
      });
    setIsLoading(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="admin-h1">Modifier les informations</h1>
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting || !form.formState.isDirty}>
            Mettre à jour
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={async () => {
              setIsLoading(true);
              sdk()
                .UpdateEvent({
                  input: {
                    id: event.id,
                    patch: {
                      isDraft: !event.isDraft,
                    },
                  },
                })
                .then((data) => {
                  setIsLoading(false);
                  startTransition(() => router.refresh());

                  toast({
                    title: data.updateEvent?.event?.isDraft ? "Événement dépublié" : "Événement publié",
                  });
                })
                .catch((error) => {
                  toast({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                    variant: "destructive",
                  });
                  setError(error);
                  setIsLoading(false);
                  throw error;
                });
            }}
          >
            {event.isDraft ? "Publier" : "Dépublier"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline">
                Annuler l&apos;événement
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Annuler l&apos;événement</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>Êtes-vous sûr de vouloir annuler cet événement ?</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setIsLoading(true);
                    sdk()
                      .UpdateEvent({
                        input: {
                          id: event.id,
                          patch: {
                            isCancelled: true,
                          },
                        },
                      })
                      .then(() => {
                        setIsLoading(false);
                        toast({
                          title: "Événement mis à jour",
                          action: (
                            <ToastAction onClick={() => router.back()} altText="Retour">
                              Retour
                            </ToastAction>
                          ),
                        });

                        router.refresh();
                      })
                      .catch((error) => {
                        toast({
                          title: "Erreur",
                          description: "Une erreur est survenue",
                          variant: "destructive",
                        });
                        setError(error);
                        setIsLoading(false);
                        throw error;
                      });
                  }}
                >
                  Annuler l&apos;événement
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="admin-h2">Infos générales</h2>
          <InputFormField
            control={form.control}
            name="name"
            label="Nom de l'événement *"
            descrition="Choisissez un nom pour votre événement"
            placeholder="Nom de l'événement"
          />
          <NumberFormField
            control={form.control}
            name="capacity"
            label="Capacité"
            descrition="Si vous n'indiquez pas de capacité, il n'y aura pas de limite"
            placeholder="2000"
          />
          <TextAreaFormField
            control={form.control}
            name="description"
            label="Description de l'événement"
            descrition="Décrivez votre événement"
            placeholder="Description de l'événement"
          />

          <h2 className="admin-h2">Date de l&apos;événement</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <CalendarAndTimeFormField
              control={form.control}
              name="startDate"
              label="Début de l'événement *"
              descrition="Choisissez un jour pour votre activité"
              placeholder="Choisissez un jour pour votre activité"
            />
            <CalendarAndTimeFormField
              control={form.control}
              name="endDate"
              label="Fin de l'événement"
              descrition=""
              placeholder="Choisissez un jour pour votre activité"
            />
          </div>

          <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
            Ouverture de la billeterie
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <CalendarAndTimeFormField
              control={form.control}
              name="bookingStartDate"
              label="Ouverture de la billeterie"
              descrition="Si vous n'indiquez pas de jour d'ouverture, la billeterie sera ouverte dès la création de l'événement"
              placeholder="Choisissez un jour "
            />
            <CalendarAndTimeFormField
              control={form.control}
              name="bookingEndDate"
              label="Fermeture de la billeterie"
              descrition="Si vou n'indiquez pas de jour de fin, la billeterie sera ouverte jusqu'à la fin de l'événement"
              placeholder="Choisissez un jour "
            />
          </div>

          <h2 className="admin-h2">Lieu de l&apos;événement</h2>
          <InputFormField
            control={form.control}
            name="placeName"
            label="Nom du lieu *"
            descrition="Choisissez un nom pour votre lieu"
            placeholder="Nom du lieu"
          />
          <InputFormField
            control={form.control}
            name="placeAddress"
            label="Adresse du lieu *"
            descrition=""
            placeholder="5 rue Broca"
          />
          <InputFormField
            control={form.control}
            name="placeAddressComplement"
            label="Complément d'adresse"
            descrition=""
            placeholder="Bâtiment A"
          />
          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-4">
              <InputFormField
                control={form.control}
                name="placeCity"
                label="Ville *"
                descrition=""
                placeholder="Paris"
              />
            </div>
            <div className="md:col-span-2">
              <InputFormField
                control={form.control}
                name="placeZipCode"
                label="Code postal *"
                descrition=""
                placeholder="75005"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-3">
              <InputFormField
                control={form.control}
                name="placeCountry"
                label="Pays *"
                descrition=""
                placeholder="France"
              />
            </div>
          </div>
          <h2 className="admin-h2">Webhooks</h2>
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`webhooks.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>Mes webhooks</FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Ajoutez des webhooks pour synchroniser les données enregistrées par Kaypi avec vos outils externes
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        {" "}
                        <Input {...field} className="w-full" />
                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          <XCircle size={24} />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="button" variant="link" size="sm" className="mt-1" onClick={() => append({ value: "" })}>
              Ajouter un webhook
            </Button>
          </div>
          <div className="flex w-full justify-end gap-2">
            <Button disabled={isSubmitting || !form.formState.isDirty} type="submit">
              Mettre à jour
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
