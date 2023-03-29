"use client";

import { FC, useState, useTransition } from "react";
import Script from "next/script";
import { CheckCircle2, Download, MinusCircle } from "lucide-react";

import "@/styles/globals.css";
import { Montserrat, Roboto } from "@next/font/google";
import { EventStatus, GetEventBySlugQuery, RegisterAttendeesInput } from "@tacotacIO/codegen/dist";
import { useFieldArray, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, validCaptcha } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParticipantSubForm } from "./participant-sub-form";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});
interface iUpdateEvent extends ExtractType<GetEventBySlugQuery, "eventBySlug"> {}

export const CreateAttendeeForm: FC<iUpdateEvent> = ({ id, eventBranding, city, bookingStartsAt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const methods = useForm<RegisterAttendeesInput>({
    defaultValues: {
      attendees: [
        {
          isFundraisingGenerosityOk: false,
          isInscriptor: false,
          isVip: false,
          status: EventStatus.Idle,
        },
      ],
    },
  });
  const { register, handleSubmit, formState, control, reset, trigger } = methods;
  const fieldMethods = useFieldArray({
    control,
    name: "attendees",
  });

  const { fields, append, remove } = fieldMethods;

  const onSubmit = handleSubmit(async (data: RegisterAttendeesInput) => {
    const isValid = await trigger();
    const { isValidCaptcha } = await validCaptcha();
    if (isValid && isValidCaptcha) {
      setIsLoading(true);
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

  return (
    <div className="flex flex-col w-full">
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE}`} />

      <>
        <div className={showConfirmation === true ? "hidden" : "flex w-full flex-col"}>
          <form onSubmit={onSubmit} className={cn("mt-4 w-full", isLoading && "animate-pulse")}>
            {fields?.length > 1 ? (
              <Accordion type="single" collapsible defaultValue={"1"}>
                {fields.map((item, i) => (
                  <AccordionItem key={i} value={i.toString()}>
                    <AccordionTrigger
                      className={
                        formState?.errors?.attendees ? "text-red-500 hover:no-underline" : "hover:no-underline"
                      }
                    >
                      <div className="flex justify-between w-full mx-6">
                        <div>{i > 0 ? `Participant ${i + 1} ` : "Participant principal"}</div>
                        {i !== 0 && (
                          <div
                            className="inline-flex items-center p-1 text-xs border border-transparent rounded-full shadow-sm focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(i);
                            }}
                          >
                            Supprimer ce participant <MinusCircle size="14" className="ml-2 text-xs" />
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ParticipantSubForm index={i} branding={eventBranding} methods={methods} isInscriptor={i === 0} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <ParticipantSubForm index={0} branding={eventBranding} methods={methods} isInscriptor={true} />
            )}

            <div className="mt-4 flex flex-col w-full items-center justify-between gap-1.5">
              <div className="flex items-start">
                <Label htmlFor="isFundraisingGenerosityOk" className="col-span-2">
                  {
                    "J'ai bien compris qu'il s'agit d'une soirée de levée de dons et que les associations comptent sur la générosité des participants."
                  }{" "}
                  <span className="text-red-500">*</span>
                </Label>{" "}
                <Input
                  type="checkbox"
                  id="isFundraisingGenerosityOk"
                  className="flex w-4 h-4 ml-1 text-right"
                  {...register(`attendees.0.isFundraisingGenerosityOk`, {
                    required: "Cette information est requise",
                  })}
                />
              </div>
            </div>
            {formState.errors?.attendees?.[0]?.isFundraisingGenerosityOk && (
              <p className="mt-2 text-sm text-left text-red-800 dark:text-red-300">
                {formState.errors?.attendees?.[0]?.isFundraisingGenerosityOk?.message}
              </p>
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
          <div className="flex w-6/12 mt-8 md:-mt-11 md:mx-auto md:flex-col ">
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
              onClick={async () => {
                // trigger validation and add a new field if ok
                const formHasError = await trigger();
                if (!formHasError) return;
                append({ status: EventStatus.Idle });
              }}
            >
              Ajouter un participant
            </button>
          </div>
        </div>
      </>

      {showConfirmation === true ? (
        <div className="flex flex-col items-center justify-center mt-4 text-xl">
          <CheckCircle2 className="w-16 h-16 mb-8" />
          <h2>Votre inscription est terminée !</h2>
          <p className="pt-8 text-sm">
            Un email de confirmation pour votre inscription a été envoyé. Vérifiez vos courriers indésirables si vous ne
            le recevez pas.
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
