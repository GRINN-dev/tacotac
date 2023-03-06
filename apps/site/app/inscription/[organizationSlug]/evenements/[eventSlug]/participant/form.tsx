"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CivilityStatus,
  EventStatus,
  GetEventByIdQuery,
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

interface iUpdateEvent extends ExtractType<GetEventByIdQuery, "event"> {}

export const CreateAttendeeForm: FC<iUpdateEvent> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { register, handleSubmit, formState, control, reset, trigger } = useForm<RegisterAttendeesInput>({
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
      <div className="flex flex-col w-full">
        <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
          {fields?.length > 1 ? (
            <Accordion type="single" collapsible>
              {fields.map((item, i) => (
                <AccordionItem key={i} value={i.toString()}>
                  <AccordionTrigger className={formState?.errors?.attendees ? "text-red-500" : ""}>
                    {i > 0 ? `Participant ${i + 1}` : "Participant principal"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                      <Label htmlFor="civility">Civilité</Label>
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
                            {error?.message && (
                              <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                      <Label htmlFor="firstname">Prénom</Label>
                      <Input
                        type="text"
                        id="firstname"
                        placeholder="Jeanne"
                        {...register(`attendees.${i}.firstname`, {
                          required: "Un prénom pour le participant est requis",
                        })}
                        className="col-span-2"
                      />
                      {formState.errors?.attendees?.[i]?.firstname && (
                        <p className="text-sm text-red-800 dark:text-red-300">
                          {formState.errors?.attendees?.[i]?.firstname?.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                      <Label htmlFor="lastname">Nom</Label>
                      <Input
                        type="text"
                        id="lastname"
                        placeholder="Dupond"
                        {...register(`attendees.${i}.lastname`, {
                          required: "Un nom pour le participant est requis",
                        })}
                        className="col-span-2"
                      />
                      {formState.errors?.attendees?.[i]?.lastname && (
                        <p className="text-sm text-red-800 dark:text-red-300">
                          {formState.errors?.attendees?.[i].lastname?.message}
                        </p>
                      )}
                    </div>

                    {i === 0 ? (
                      <>
                        <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            type="text"
                            id="email"
                            className="col-span-2"
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
                        <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                          <Label htmlFor="phoneNumber">Téléphone</Label>
                          <Input
                            type="number"
                            id="phoneNumber"
                            className="col-span-2"
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
                        <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                          <Label htmlFor="zipCode">Code postal</Label>
                          <Input
                            type="number"
                            id="zipCode"
                            placeholder="44000"
                            className="col-span-2"
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
                        <div className="mt-4 w-full items-center gap-1.5">
                          <Label htmlFor="civility" className="my-4">
                            Comment avez-vous entendu parler de Lille pour le Bien Commun ?
                          </Label>

                          <Controller
                            name={"attendee.hearAbout"}
                            control={control}
                            {...register(`attendees.${i}.hearAbout`)}
                            render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
                              <>
                                <Select onValueChange={onChange}>
                                  <SelectTrigger className="my-4">
                                    <SelectValue placeholder="Sélectionnez une réponse" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value={"par un mécéne"}>Par un mécéne</SelectItem>
                                      <SelectItem value={"par une association lauréate"}>
                                        Par une association lauréate
                                      </SelectItem>
                                      <SelectItem value={"par Obole, co-organisateur de l''événement"}>
                                        Par Obole, co-organisateur de l&apos;événement
                                      </SelectItem>
                                      <SelectItem value={"par le bouche à oreille"}>Par le bouche à oreille</SelectItem>
                                      <SelectItem value={"par la Fondation de France, co-organisateur de l''événement"}>
                                        Par la Fondation de France, co-organisateur de l&apos;événement
                                      </SelectItem>
                                      <SelectItem value={"autre"}>Autre</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {error?.message && (
                                  <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mt-4 flex justify-between w-full items-center gap-1.5">
                          <Label htmlFor="isFundraisingGenerosityOk" className="col-span-2">
                            {
                              "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                            }
                          </Label>{" "}
                          <Input
                            type="checkbox"
                            id="isFundraisingGenerosityOk"
                            className="flex w-4 h-4 text-right"
                            {...register(`attendees.${i}.isFundraisingGenerosityOk`, {
                              required: "Cette info pour le participant est requise",
                            })}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="text"
                          id="email"
                          placeholder="jeanned@mail.com"
                          className="col-span-2"
                          {...register(`attendees.${i}.email`)}
                        />
                        {formState.errors?.attendees?.[i].email && (
                          <p className="text-sm text-red-800 dark:text-red-300">
                            {formState.errors?.attendees?.[i]?.email?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            fields.map((p, i) => {
              return (
                <>
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="civility">Civilité</Label>
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
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="Jeanne"
                      {...register(`attendees.${i}.firstname`, {
                        required: "Un prénom pour le participant est requis",
                      })}
                      className="col-span-2"
                    />
                    {formState.errors?.attendees?.[i]?.firstname && (
                      <p className="text-sm text-red-800 dark:text-red-300">
                        {formState.errors?.attendees?.[i]?.firstname?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="Dupond"
                      {...register(`attendees.${i}.lastname`, {
                        required: "Un nom pour le participant est requis",
                      })}
                      className="col-span-2"
                    />
                    {formState.errors?.attendees?.[i]?.lastname && (
                      <p className="text-sm text-red-800 dark:text-red-300">
                        {formState.errors?.attendees?.[i].lastname?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      className="col-span-2"
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
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="phoneNumber">Téléphone</Label>
                    <Input
                      type="number"
                      id="phoneNumber"
                      className="col-span-2"
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
                  <div className="mt-4 grid grid-cols-3 w-full items-center gap-1.5">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input
                      type="number"
                      id="zipCode"
                      placeholder="44000"
                      className="col-span-2"
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
                  <div className="mt-4 w-full items-center gap-1.5">
                    <Label htmlFor="civility" className="my-4">
                      Comment avez-vous entendu parler de Lille pour le Bien Commun ?
                    </Label>

                    <Controller
                      name={"attendee.hearAbout"}
                      control={control}
                      {...register(`attendees.${i}.hearAbout`)}
                      render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
                        <>
                          <Select onValueChange={onChange}>
                            <SelectTrigger className="my-4">
                              <SelectValue placeholder="Sélectionnez une réponse" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value={"par un mécéne"}>Par un mécéne</SelectItem>
                                <SelectItem value={"par une association lauréate"}>
                                  Par une association lauréate
                                </SelectItem>
                                <SelectItem value={"par Obole, co-organisateur de l''événement"}>
                                  Par Obole, co-organisateur de l&apos;événement
                                </SelectItem>
                                <SelectItem value={"par le bouche à oreille"}>Par le bouche à oreille</SelectItem>
                                <SelectItem value={"par la Fondation de France, co-organisateur de l''événement"}>
                                  Par la Fondation de France, co-organisateur de l&apos;événement
                                </SelectItem>
                                <SelectItem value={"autre"}>Autre</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-4 flex justify-between w-full items-center gap-1.5">
                    <Label htmlFor="isFundraisingGenerosityOk" className="col-span-2">
                      {
                        "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                      }
                    </Label>{" "}
                    <Input
                      type="checkbox"
                      id="isFundraisingGenerosityOk"
                      className="flex w-4 h-4 text-right"
                      {...register(`attendees.${i}.isFundraisingGenerosityOk`, {
                        required: "Cette info pour le participant est requise",
                      })}
                    />
                  </div>
                </>
              );
            })
          )}

          <div className="flex items-center gap-2 mt-8">
            <button type="submit" className={buttonVariants({ size: "lg", className: "mr-3" })}>
              Continuer
            </button>
            <p>ou</p>
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
        <div className="flex w-6/12 mt-16 md:mx-auto md:flex-col md:my-3 ">
          <button className={buttonVariants({ size: "lg", className: "-mt-14" })} onClick={handleAddParticipant}>
            Ajouter un participant
          </button>
        </div>
      </div>
    </div>
  );
};
