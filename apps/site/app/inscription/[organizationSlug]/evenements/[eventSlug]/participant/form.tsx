"use client";

import { FC, MouseEvent, useState, useTransition } from "react";
import Script from "next/script";
import { CheckCircle2, Download, MinusCircle } from "lucide-react";

import "@/styles/globals.css";
import { Montserrat, Roboto } from "@next/font/google";
import { CivilityStatus, EventStatus, GetEventBySlugQuery, RegisterAttendeesInput } from "@tacotacIO/codegen/dist";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, validCaptcha } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});
interface iUpdateEvent extends ExtractType<GetEventBySlugQuery, "eventBySlug"> {}

export const CreateAttendeeForm: FC<iUpdateEvent> = ({ id, eventBranding }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  const handleAddParticipant = async () => {
    const formHasError = await trigger();
    if (!formHasError) return;
    append({ status: EventStatus.Idle });
  };

  const handleRemoveParticipant = async (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, index: number) => {
    event.stopPropagation();
    const formHasError = await trigger();
    if (!formHasError) return;
    remove(index);
  };

  const onSubmit = handleSubmit(async (data: RegisterAttendeesInput) => {
    const isValid = await trigger();
    const { isValidCaptcha } = await validCaptcha();
    if (isValid && isValidCaptcha) {
      setIsLoading(true);
      setAttendeeEmail(data?.attendees?.[0].email);
      data.eventId = id;
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
      setShowConfirmation(true);
    } else {
      console.log("invalide");
    }
  });
  const { nom, prenom, email, telephone, zipcode } = eventBranding?.placeholder || {};

  return (
    <div className="flex w-full flex-col">
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE}`} />

      <div className={showConfirmation === true ? "hidden" : "flex w-full flex-col"}>
        <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
          {fields?.length > 1 ? (
            <Accordion type="single" collapsible defaultValue={"1"}>
              {fields.map((item, i) => (
                <AccordionItem key={i} value={i.toString()}>
                  <AccordionTrigger
                    className={formState?.errors?.attendees ? "text-red-500 hover:no-underline" : "hover:no-underline"}
                  >
                    <div className="mx-6 flex w-full justify-between">
                      <div>{i > 0 ? `Participant ${i + 1} ` : "Participant principal"}</div>
                      {i !== 0 && (
                        <div
                          className="inline-flex items-center rounded-full border border-transparent p-1 text-xs  shadow-sm focus:outline-none"
                          onClick={(e) => handleRemoveParticipant(e, i)}
                        >
                          Supprimer ce participant <MinusCircle size="14" className="ml-2 text-xs" />
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                      <Label htmlFor="civility">
                        Civilité <span className="text-red-500">*</span>{" "}
                      </Label>
                      <Controller
                        name={`attendees.${i}.civility`}
                        control={control}
                        render={({ field: { onChange }, fieldState: { error } }) => (
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

                    <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                      <Label htmlFor="lastname">
                        Nom <span className="text-red-500">*</span>
                      </Label>
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
                        <p className="text-right text-sm text-red-800 dark:text-red-300">
                          {formState.errors?.attendees?.[i]?.lastname?.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                      <Label htmlFor="firstname">
                        Prénom <span className="text-red-500">*</span>
                      </Label>
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
                        <p className="text-right text-sm text-red-800 dark:text-red-300">
                          {formState.errors?.attendees?.[i]?.firstname?.message}
                        </p>
                      )}
                    </div>

                    {i === 0 ? (
                      <>
                        <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="email"
                            className="col-span-2"
                            placeholder={eventBranding?.placeholder?.email}
                            {...register(`attendees.${i}.email`, {
                              required: "Un email pour le participant est requis",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Merci d'entrer un email valide",
                              },
                            })}
                          />
                          {formState.errors?.attendees?.[i]?.email && (
                            <p className="text-sm text-red-800 dark:text-red-300">
                              {formState.errors?.attendees?.[i]?.email?.message}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                          <Label htmlFor="phoneNumber">
                            Téléphone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="number"
                            id="phoneNumber"
                            className="col-span-2"
                            placeholder={eventBranding?.placeholder?.telephone}
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
                        <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                          <Label htmlFor="zipCode">
                            Code postal <span className="text-red-500">*</span>
                          </Label>
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
                            Comment avez-vous entendu parler de Lille pour le Bien Commun ?{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Controller
                            name={"attendee.hearAbout"}
                            control={control}
                            {...register(`attendees.${i}.hearAbout`)}
                            render={({ field: { onChange }, fieldState: { error } }) => (
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
                        <div className="mt-4 flex w-full items-center justify-between gap-1.5">
                          <Label htmlFor="isFundraisingGenerosityOk" className="col-span-2">
                            {
                              "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                            }
                            <span className="text-red-500">*</span>
                          </Label>{" "}
                          <Input
                            type="checkbox"
                            id="isFundraisingGenerosityOk"
                            className="flex h-4 w-4 text-right"
                            {...register(`attendees.${i}.isFundraisingGenerosityOk`, {
                              required: "Cette information pour le participant est requise",
                            })}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="text"
                          id="email"
                          placeholder={eventBranding.placeholder}
                          className="col-span-2"
                          {...register(`attendees.${i}.email`, {
                            setValueAs: (v) => (v ? v : null),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Merci d'entrer un email valide",
                            },
                          })}
                        />
                        {formState.errors?.attendees?.[i]?.email && (
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
                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
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

                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder={nom}
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
                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder={prenom}
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
                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      className="col-span-2"
                      placeholder={email}
                      {...register(`attendees.${i}.email`, {
                        setValueAs: (v) => (v ? v : null),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Merci d'entrer un email valide",
                        },
                      })}
                    />
                    {formState.errors?.attendees?.[i].email && (
                      <p className="text-sm text-red-800 dark:text-red-300">
                        {formState.errors?.attendees?.[i]?.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                    <Label htmlFor="phoneNumber">Téléphone</Label>
                    <Input
                      type="number"
                      id="phoneNumber"
                      className="col-span-2"
                      placeholder={telephone}
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
                  <div className="mt-4 grid w-full grid-cols-3 items-center gap-1.5">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input
                      type="number"
                      id="zipCode"
                      placeholder={zipcode}
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
                  <div className="mt-4 flex w-full items-center justify-between gap-1.5">
                    <Label htmlFor="isFundraisingGenerosityOk" className="col-span-2">
                      {
                        "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                      }
                    </Label>{" "}
                    <Input
                      type="checkbox"
                      id="isFundraisingGenerosityOk"
                      className="flex h-4 w-4 text-right"
                      {...register(`attendees.${i}.isFundraisingGenerosityOk`, {
                        required: "Cette info pour le participant est requise",
                      })}
                    />
                  </div>
                </>
              );
            })
          )}

          <div className="styles.text mt-8 flex items-center gap-2">
            <button
              className={`${eventBranding.font} === "roboto" ? ${roboto.className} : ${montserrat.className}`}
              style={{
                backgroundColor: `#${eventBranding.color1}`,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                color: "#fff",
                fontWeight: "500",
                padding: "0.75rem 1.5rem",
                marginRight: "1rem",
              }}
              type="submit"
            >
              Continuer
            </button>

            <p>ou</p>
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
        <div className="mt-16 flex w-6/12 md:mx-auto md:my-3 md:flex-col ">
          <button
            className={`${eventBranding.font} === "roboto" ? ${roboto.className} : ${montserrat.className}`}
            style={{
              backgroundColor: `#${eventBranding.color1}`,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: "#fff",
              fontWeight: "500",
              padding: "0.75rem 1.5rem",
              marginTop: "-3.5rem",
            }}
            onClick={handleAddParticipant}
          >
            Ajouter un participant
          </button>
        </div>
      </div>
      {showConfirmation === true ? (
        <div className="mt-4 flex flex-col items-center justify-center text-xl">
          <CheckCircle2 className="mb-8 h-16 w-16" />
          <h2 className="">Votre inscription est terminée !</h2>
          <p className="pt-8 text-sm">
            Un email de confirmation pour votre inscription a été envoyé à {attendeeEmail} . Vérifiez vos courriers
            indésirables si vous ne le recevez pas.
          </p>
          <div className="flex items-center justify-between">
            <button
              className={buttonVariants({ size: "lg", className: "mt-12" })}
              style={{ backgroundColor: `#${eventBranding.color2}` }}
            >
              <Download className="mr-2" />
              <p>Télécharger vos billets</p>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
