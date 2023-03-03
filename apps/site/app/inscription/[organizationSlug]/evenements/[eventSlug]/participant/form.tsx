"use client";

import { FC, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Attendee,
  AttendeeInput,
  AttendeePatch,
  CivilityStatus,
  CreateAttendeeInput,
  EventStatus,
  GetEventByIdQuery,
  MyAttendeeFragment,
  RegisterAttendeesInput,
} from "@/../../@tacotacIO/codegen/dist";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface iUpdateEvent extends ExtractType<GetEventByIdQuery, "event"> {}

export const CreateAttendeeForm: FC<iUpdateEvent> = ({ id, slug, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef(null);

  const { register, handleSubmit, formState, control, reset } = useForm<RegisterAttendeesInput>({
    defaultValues: {
      attendees: [
        {
          civility: null,
          firstname: "",
          lastname: "",
          phoneNumber: "",
          zipCode: "",
          email: "",
          hearAbout: "",
          isFundraisingGenerosityOk: false,
          isInscriptor: false,
          isVip: false,
          status: EventStatus.Idle,
        },
      ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "attendees",
  });

  const handleAddParticipant = () => {
    append({ status: EventStatus.Idle });
  };
  const onSubmit = handleSubmit(async (data: RegisterAttendeesInput) => {
    setIsLoading(true);
    await sdk()
      .RegisterAttendees({
        input: data,
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);

    startTransition(() => {
      router.push(pathname.substring(0, pathname.lastIndexOf("/participant/create") + 1) + "?reload=true");
    });
  });
  return (
    <div className="flex flex-col w-full">
      <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
        <Accordion type="single" collapsible>
          {fields.map((item, i) => (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger>{i > 0 ? `Participant ${i}` : "Participant principal"}</AccordionTrigger>
              <AccordionContent>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Controller
                    name={`attendees.${i}.civility`}
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
                    placeholder="Jeanne"
                    {...register(`attendees.${i}.firstname`, {
                      required: "Un prénom pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendees?.[i]?.firstname && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.firstname?.message}
                    </p>
                  )}
                </div>

                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input
                    type="text"
                    id="lastname"
                    placeholder="Dupond"
                    {...register(`attendees.${i}.lastname`, {
                      required: "Un nom pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendees?.[i]?.lastname && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i].lastname?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="jeanned@mail.com"
                    {...register(`attendees.${i}.email`, {
                      required: "Un email pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendees?.[i].email && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.email?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="phoneNumber">Téléphone</Label>
                  <Input
                    type="number"
                    id="phoneNumber"
                    placeholder="Entrez un numéro de téléphone"
                    {...register(`attendees.${i}.phoneNumber`, {
                      required: "Un téléphone pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendees?.[i]?.phoneNumber && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.phoneNumber?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input
                    type="number"
                    id="zipCode"
                    placeholder="44000"
                    {...register(`attendees.${i}.zipCode`, {
                      required: "Un code postal pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendees?.[i]?.zipCode && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.zipCode?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Controller
                    name={"attendee.hearAbout"}
                    control={control}
                    {...register(`attendees.${i}.hearAbout`)}
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
                <div className="mt-4 flex w-full items-center gap-1.5">
                  <Input
                    type="checkbox"
                    id="isFundraisingGenerosityOk"
                    className="w-4 h-4 "
                    {...register(`attendees.${i}.isFundraisingGenerosityOk`, {
                      required: "Cette info pour le participant est requise",
                    })}
                  />
                  <Label htmlFor="isFundraisingGenerosityOk">
                    {
                      "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                    }
                  </Label>
                </div>
                <div className="mt-4 flex w-full items-center gap-1.5">
                  <Input
                    type="checkbox"
                    id="isInscriptor"
                    className="w-4 h-4 "
                    {...register(`attendees.${i}.isInscriptor`, {})}
                  />
                  {formState.errors?.attendees?.[i]?.isInscriptor && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.isInscriptor?.message}
                    </p>
                  )}
                  <Label htmlFor="isInscriptor">{"Inscripteur"}</Label>
                </div>
                <div className="mt-4 flex w-full items-center gap-1.5">
                  <Input type="checkbox" id="isVip" className="w-4 h-4 " {...register(`attendees.${i}.isVip`, {})} />
                  {formState.errors?.attendees?.[i]?.isVip && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendees?.[i]?.isVip?.message}
                    </p>
                  )}
                  <Label htmlFor="isVip">{"Vip"}</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex gap-2 mt-8">
          <button type="submit" className={buttonVariants({ size: "lg" })}>
            Continuer
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
      <div className="flex flex-col w-6/12 mx-auto my-4">
        <button className={buttonVariants({ size: "lg" })} onClick={handleAddParticipant}>
          Ajouter un participant
        </button>
      </div>
    </div>
  );
};
