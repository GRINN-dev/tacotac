"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { AttendeeStatus, GetAttendeeByIdQuery, UpdateAttendeeInput } from "@tacotacIO/codegen";
import { Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, transformStatus } from "@/lib/utils";
import { Loader } from "@/components/loader";
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

export const UpdateAttendeeForm: FC<{
  attendee: GetAttendeeByIdQuery["attendee"];
  organizationSlug: string;
  eventSlug: string;
}> = ({ attendee, organizationSlug, eventSlug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control } = useForm<UpdateAttendeeInput>();
  const onSubmit = handleSubmit(async (data: any) => {
    setIsLoading(true);
    data.id = attendee.id;
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
      router.refresh();

      toast({
        title: "Participant mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
    });
  });

  const deleteAttendee = async () => {
    setIsLoading(true);
    await sdk().DeleteAttendee({ input: { id: attendee.id } });
    setIsLoading(false);
    startTransition(() => {
      router.push(`/admin/${organizationSlug}/${eventSlug}`);
    });
  };
  return (
    <form onSubmit={onSubmit} className={cn("mt-4", isSubmitting && "animate-pulse")}>
      <Loader loading={isSubmitting} />

      <div className="mt-4 grid items-center gap-1.5">
        <Controller
          name={"patch.status"}
          control={control}
          render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
            <>
              <Select defaultValue={attendee.status} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un status" />
                </SelectTrigger>
                <SelectContent defaultValue={attendee.status} className="w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value={AttendeeStatus.Idle}>{transformStatus(AttendeeStatus.Idle)}</SelectItem>
                    <SelectItem value={AttendeeStatus.Cancelled}>
                      {transformStatus(AttendeeStatus.Cancelled)}
                    </SelectItem>
                    <SelectItem value={AttendeeStatus.Confirmed}>
                      {transformStatus(AttendeeStatus.Confirmed)}
                    </SelectItem>
                    <SelectItem value={AttendeeStatus.TicketScan}>
                      {transformStatus(AttendeeStatus.TicketScan)}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          defaultValue={attendee.firstname}
          placeholder="Martin"
          {...register("patch.firstname", {
            required: "Un prénom pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.firstname && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.firstname?.message}</p>
        )}
      </div>

      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          defaultValue={attendee.lastname}
          placeholder="Martin"
          {...register("patch.lastname", {
            required: "Un nom pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.lastname && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.lastname?.message}</p>
        )}
      </div>
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          defaultValue={attendee.email}
          placeholder="mon@email.com"
          {...register("patch.email", {
            required: "Un email pour le participant est requis",
          })}
        />
        {formState.errors?.patch?.email && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.email?.message}</p>
        )}
      </div>

      {/* <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="isVip">{"Vip"}</Label>
        <Input
          type="checkbox"
          defaultChecked={attendee.isVip}
          id="isVip"
          className="h-4 w-4 "
          {...register("patch.isVip", {})}
        />
        {formState.errors?.patch?.isVip && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.isVip?.message}</p>
        )}
      </div> */}
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="panelNumber">{"Numéro de panneau"}</Label>
        <Input
          type="number"
          defaultValue={attendee.panelNumber}
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
