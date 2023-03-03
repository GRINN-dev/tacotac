"use client";

import { FC, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Attendee,
  AttendeeInput,
  CivilityStatus,
  CreateAttendeeInput,
  EventStatus,
  GetEventByIdQuery,
  MyAttendeeFragment,
} from "@/../../@tacotacIO/codegen/dist";
import { Controller, useForm } from "react-hook-form";

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
  const [items, setItems] = useState<string[]>(["numéro 1"]);
  const [attendeeData, setAttendeeData] = useState<AttendeeInput[]>([]);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef(null);
  // const handleDeleteNewParticipant = (index: number) => {
  //   const newItems = [...items];
  //   newItems.splice(index, 1);
  //   setItems(newItems);
  // };
  const { register, handleSubmit, formState, control, reset } = useForm<CreateAttendeeInput>({
    defaultValues: {
      attendee: {
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
      },
    },
  });

  const handleAddParticipant = () => {
    setItems([...items, `numéro ${items.length + 1}`]);
    reset();
  };
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    // data.attendee.eventId = id;
    await sdk()
      .CreateAttendee({
        input: {
          attendee: {
            status: EventStatus.Idle,
            civility: data?.attendee?.civility,
            firstname: data?.attendee?.firstname,
            lastname: data?.attendee?.lastname,
            email: data?.attendee?.email,
            phoneNumber: data?.attendee?.phoneNumber,
            zipCode: data?.attendee?.zipCode,
            hearAbout: data?.attendee?.hearAbout,
            // eventId: id,
            isFundraisingGenerosityOk: data?.attendee?.isFundraisingGenerosityOk,
            isInscriptor: data?.attendee?.isInscriptor,
            isVip: data?.attendee?.isVip,
          },
        },
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    const result = { ...data };
    const newAttendeeData = result.attendee;
    setAttendeeData((prevState) => prevState.concat(newAttendeeData));
    console.log(newAttendeeData);
    startTransition(() => {
      router.push(pathname.substring(0, pathname.lastIndexOf("/participant/create") + 1) + "?reload=true");
    });
  });
  return (
    <div className="flex flex-col w-full">
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item} value={item}>
            <AccordionTrigger>{`Participant ${item}`}</AccordionTrigger>
            <AccordionContent>
              <form ref={formRef} onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Controller
                    name={"attendee.civility"}
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
                    {...register("attendee.firstname", {
                      required: "Un prénom pour le participant est requis",
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
                    type="text"
                    id="lastname"
                    placeholder="Dupond"
                    {...register("attendee.lastname", {
                      required: "Un nom pour le participant est requis",
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
                    type="text"
                    id="email"
                    placeholder="jeanned@mail.com"
                    {...register("attendee.email", {
                      required: "Un email pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendee?.email && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendee?.email?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="phoneNumber">Téléphone</Label>
                  <Input
                    type="number"
                    id="phoneNumber"
                    placeholder="Entrez un numéro de téléphone"
                    {...register("attendee.phoneNumber", {
                      required: "Un téléphone pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendee?.phoneNumber && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendee?.phoneNumber?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input
                    type="number"
                    id="zipCode"
                    placeholder="44000"
                    {...register("attendee.zipCode", {
                      required: "Un code postal pour le participant est requis",
                    })}
                  />
                  {formState.errors?.attendee?.zipCode && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendee?.zipCode?.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 grid w-full items-center gap-1.5">
                  <Controller
                    name={"attendee.hearAbout"}
                    control={control}
                    {...register("attendee.hearAbout")}
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
                    {...register("attendee.isFundraisingGenerosityOk", {
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
                    {...register("attendee.isInscriptor", {})}
                  />
                  {formState.errors?.attendee?.isInscriptor && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendee?.isInscriptor?.message}
                    </p>
                  )}
                  <Label htmlFor="isInscriptor">{"Inscripteur"}</Label>
                </div>
                <div className="mt-4 flex w-full items-center gap-1.5">
                  <Input type="checkbox" id="isVip" className="w-4 h-4 " {...register("attendee.isVip", {})} />
                  {formState.errors?.attendee?.isVip && (
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {formState.errors?.attendee?.isVip?.message}
                    </p>
                  )}
                  <Label htmlFor="isVip">{"Vip"}</Label>
                </div>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-col w-6/12 mx-auto my-4">
        <button className={buttonVariants({ size: "lg" })} onClick={handleAddParticipant}>
          Ajouter un participant
        </button>
      </div>
    </div>
  );
};
