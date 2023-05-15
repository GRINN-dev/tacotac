"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EventStatus, GetAttendeeByIdQuery, UpdateAttendeeInput } from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

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
import { Button, buttonVariants } from "@/components/ui/button";
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

export const UpdateAttendeeForm: FC<iUpdateAttendee> = ({
  id,
  firstname,
  lastname,
  email,
  status,
  panelNumber,
  phoneNumber,
  zipCode,
  hearAbout,
  isVip,
}) => {
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
      router.push(pathname.substring(0, pathname.lastIndexOf(`/participant/${id}`) + 1) + "?reload=true");

      toast({
        title: "Participant mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
    });
  });

  const deleteAttendee = async () => {
    // await sdk().DeleteRegistration({ input: { id: registrationId } });
    router.push(pathname.substring(0, pathname.lastIndexOf(`/participant/${id}`) + 1) + "?reload=true");
  };
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
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="phoneNumber">Téléphone</Label>
        <Input
          type="number"
          id="phoneNumber"
          defaultValue={phoneNumber}
          placeholder="Obole"
          {...register("patch.phoneNumber")}
        />
        {formState.errors?.patch?.phoneNumber && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.phoneNumber?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="zipCode">Code postale</Label>
        <Input type="number" id="zipCode" defaultValue={zipCode} placeholder="44000" {...register("patch.zipCode")} />
        {formState.errors?.patch?.zipCode && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.zipCode?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Controller
          name={"patch.hearAbout"}
          control={control}
          defaultValue={hearAbout}
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
        <Label htmlFor="isVip">{"Vip"}</Label>
        <Input
          type="checkbox"
          defaultChecked={isVip}
          id="isVip"
          className="h-4 w-4 "
          {...register("patch.isVip", {})}
        />
        {formState.errors?.patch?.isVip && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.isVip?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="panelNumber">{"Numéro de panneau"}</Label>
        <Input
          type="number"
          defaultValue={panelNumber}
          id="panelNumber"
          {...register("patch.panelNumber", {
            valueAsNumber: true,
          })}
        />
        {formState.errors?.patch?.panelNumber && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.panelNumber?.message}</p>
        )}
      </div>
      <div className="mt-8 flex justify-between gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Mettre à jour
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Supprimer ce participant
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sur de vous ? </AlertDialogTitle>
              <AlertDialogDescription>
                <span className="flex flex-col space-y-4">
                  <span>{"Vous allez supprimer un participant"}</span>
                  <span>{"Vous serez rediriger vers la page des participants"}</span>
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={deleteAttendee}>Ok</AlertDialogAction>
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
