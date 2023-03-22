"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetEventByIdQuery, GetOrganizationBySlugQuery, UpdateEventInput, UpdateOrganizationInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, MinusCircle, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";




interface iUpdateEvent extends ExtractType<GetEventByIdQuery, "event"> {}
export const UpdateEventForm: FC<iUpdateEvent> = ({ id, name, description, webhooks }) => {
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
        <Label htmlFor="bookingStartsAt">Debut reservation</Label>
        <Input
          type="datetime-local"
          id="bookingStartsAt"
          placeholder="Date"
          {...register("patch.bookingStartsAt", {
            required: "Une date pour l'organisation est requise",
          })}
        />
        {formState.errors?.patch?.bookingStartsAt && (
          <p className="text-sm text-red-800 dark:text-red-300">
            {formState.errors?.patch?.bookingStartsAt?.message as string}
          </p>
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
        <Label>Liste des webhooks</Label>
        <ul className="list-disc pl-4">
          {webhookList?.length > 0
            ? webhookList?.map((webhook, index) => (
                <li key={webhook + index}>
                  <div
                    className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm  focus:outline-none"
                    onClick={() => removeItemClick(index)}
                  >
                    {webhook} <MinusCircle className="ml-2" />
                  </div>
                </li>
              ))
            : "Aucun webhook pour l'instant"}
        </ul>

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
            className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm  focus:outline-none"
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