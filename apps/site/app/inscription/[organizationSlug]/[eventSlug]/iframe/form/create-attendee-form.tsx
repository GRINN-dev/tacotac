"use client";

import { FC, useState } from "react";
import Script from "next/script";
import { FieldTypes, GetEventBySlugQuery, RegisterCompleteAttendeesInput } from "@/../../@tacotacIO/codegen/dist";
import { CheckCircle2, MinusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, validCaptcha } from "@/lib/utils";
import { Button, Input, Label } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreateAttendeeSubForm } from "./create-attendee-sub-form";

export const CreateAttendeeForm2: FC<{
  event: GetEventBySlugQuery["eventBySlug"];
}> = ({ event }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [accordionValue, setAccordionValue] = useState("0");
  const [error, setError] = useState<Error | string>(null);
  const { register, handleSubmit, watch, control, formState, trigger } = useForm<RegisterCompleteAttendeesInput>({
    defaultValues: {
      completeAttendees: [
        {
          attendeeFormFields: event.formFields.nodes.map((formField) => ({
            fieldId: formField.id,
            value: "",
          })),
        },
      ],
      eventId: event.id,
    },
  });
  const attendeesFieldArray = useFieldArray({
    control,
    name: "completeAttendees",
  });

  const emailFormFieldId = event.formFields.nodes.find((formField) => formField.name === "email")?.id;
  const firstnameFormFieldId = event.formFields.nodes.find((formField) => formField.name === "firstname")?.id;
  const lastnameFormFieldId = event.formFields.nodes.find((formField) => formField.name === "lastname")?.id;
  const civilityFormFieldId = event.formFields.nodes.find((formField) => formField.name === "civility")?.id;

  return (
    <div className={cn(loading && "animate-pulse", "flex w-full flex-col")}>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE}`} />

      <form
        className={cn("overflow-visible p-2", success === true && "hidden")}
        onSubmit={handleSubmit(async (data) => {
          const isValid = await trigger();
          const { isValidCaptcha } = await validCaptcha();
          if (isValid && isValidCaptcha) {
            setLoading(true);
            // on boucle data.completeAttendees et pour chacun on boucle sur attendeeFormField pour récupérer les valeurs des champs email, firstname, lastname et civility que l'on ajoute au data.completeAttendees.attendee correspondant

            for (let i = 0; i < data.completeAttendees.length; i++) {
              data.completeAttendees[i].attendee = {
                email: "",
                firstname: "",
                lastname: "",
                civility: "",
                isInscriptor: false,
              };
              if (i === 0) {
                data.completeAttendees[i].attendee.isInscriptor = true;
              }

              for (let j = 0; j < data.completeAttendees[i].attendeeFormFields.length; j++) {
                if (data.completeAttendees[i].attendeeFormFields[j].fieldId === emailFormFieldId) {
                  data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value;
                }
                if (data.completeAttendees[i].attendeeFormFields[j].fieldId === firstnameFormFieldId) {
                  data.completeAttendees[i].attendee.firstname = data.completeAttendees[i].attendeeFormFields[j].value;
                }
                if (data.completeAttendees[i].attendeeFormFields[j].fieldId === lastnameFormFieldId) {
                  data.completeAttendees[i].attendee.lastname = data.completeAttendees[i].attendeeFormFields[j].value;
                }
                if (data.completeAttendees[i].attendeeFormFields[j].fieldId === civilityFormFieldId) {
                  data.completeAttendees[i].attendee.civility = data.completeAttendees[i].attendeeFormFields[j].value;
                }

                data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value =
                  String(
                    (data.completeAttendees[i].attendee.email = data.completeAttendees[i].attendeeFormFields[j].value)
                  );
              }
            }

            const res = await sdk().RegisterCompleteAttendees({ input: data });

            res.registerCompleteAttendees?.registration?.id ? setSuccess(true) : setError("Une erreur est survenue");
            setLoading(false);
          }
        })}
      >
        <Accordion
          defaultValue={"0"}
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={(value) => {
            setAccordionValue(value);
          }}
        >
          {attendeesFieldArray.fields.map((attendee, index) => (
            <AccordionItem value={String(index)} key={"attendee" + index}>
              <AccordionTrigger className={cn(attendeesFieldArray.fields.length < 2 && "hidden")}>
                <div className="flex w-full justify-between">
                  <div>{index > 0 ? `Participant ${index + 1} ` : "Participant principal"}</div>
                  {index !== 0 && (
                    <div
                      className="inline-flex items-center rounded-full border border-transparent p-1 text-xs shadow-sm focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        attendeesFieldArray.remove(index);
                        index <= parseInt(accordionValue) && setAccordionValue(String(parseInt(accordionValue) - 1));
                      }}
                    >
                      Supprimer ce participant <MinusCircle size="14" className="ml-2 text-xs" />
                    </div>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="overflow-visible">
                <CreateAttendeeSubForm
                  formState={formState}
                  key={"attendee" + index}
                  formFields={event.formFields.nodes}
                  isInscriptor={index === 0}
                  register={register}
                  attendeeIndex={index}
                  control={control}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 flex w-full justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const formIsOk = await trigger(`completeAttendees`);
              console.log(formIsOk);
              if (formIsOk) {
                attendeesFieldArray.append({});
                setAccordionValue(String(attendeesFieldArray.fields.length));
              }
            }}
          >
            Ajouter un participant
          </Button>
          <Button type="submit">Valider</Button>
        </div>
      </form>
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
      {success === true ? (
        <div className="mt-4 flex flex-col items-center justify-center text-xl">
          <CheckCircle2 className="mb-8 h-16 w-16" />
          <h2>Votre inscription est terminée !</h2>
          <p className="pt-8 text-sm">
            Un email de confirmation pour votre inscription a été envoyé avec votre billet. Vérifiez vos courriers
            indésirables si vous ne le recevez pas.
          </p>
          {/* <div className="flex items-center justify-between">
            <Button className={buttonVariants({ size: "lg", className: "mt-12" })}>
              <Download className="mr-2" />
              <p>Télécharger vos billets</p>
            </Button>
          </div> */}
        </div>
      ) : null}
    </div>
  );
};
