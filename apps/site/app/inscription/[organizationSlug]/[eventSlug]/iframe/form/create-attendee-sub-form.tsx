"use client";

import { FC } from "react";
import { FieldTypes, GetEventBySlugQuery, RegisterCompleteAttendeesInput } from "@tacotacIO/codegen";
import { Check } from "lucide-react";
import { Control, Controller, FieldArrayWithId, FormState, UseFormRegister, useFieldArray } from "react-hook-form";

import {
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

export const CreateAttendeeSubForm: FC<{
  formFields: GetEventBySlugQuery["eventBySlug"]["formFields"]["nodes"];
  isInscriptor?: boolean;
  control: Control<RegisterCompleteAttendeesInput, any>;
  register: UseFormRegister<RegisterCompleteAttendeesInput>;
  formState: FormState<RegisterCompleteAttendeesInput>;
  attendeeIndex: number;
}> = ({ formFields, isInscriptor, control, register, attendeeIndex, formState }) => {
  return (
    <>
      {formFields.map((formField, i) => {
        const required =
          (isInscriptor && !!formField.isRequiredForInscriptor) || (!isInscriptor && !!formField.isRequiredForAttendee);
        const shouldBeDisplayed = isInscriptor || formField.appliesToAllAttendees;
        if (!shouldBeDisplayed) return;
        // si le champ est radio ou checkbox on le renvoie dans un RadioGroup ou un Checkbox, différemment

        if (formField.type === FieldTypes.Checkbox)
          return (
            <div className="mt-4  w-full" key={formField.id}>
              <Label htmlFor={formField.id} className="flex gap-4">
                <Controller
                  name={`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const}
                  control={control}
                  rules={{ required: { message: "Ce champ est requis", value: required } }}
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Checkbox className="" value={value} onCheckedChange={(e) => onChange(e)} />
                  )}
                />
                {formField.label}
                <span className={`text-red-500 ${required ? "" : "hidden"}`}>*</span>
              </Label>
              <input
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.fieldId` as any)}
                defaultValue={formField.id}
                hidden
                type="hidden"
              />
              <input
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.attendeeId` as any)}
                defaultValue={
                  // fake value, juste to please graphql
                  "fc8bf1ed-d663-4169-a2b4-66e20fb1411f"
                }
                hidden
                type="hidden"
              />
              {formState.errors?.completeAttendees?.[attendeeIndex]?.attendeeFormFields?.[i]?.value && (
                <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
                  {formState.errors?.completeAttendees?.[i]?.attendeeFormFields?.[i]?.value?.message ||
                    "Ce champ est requis"}
                </p>
              )}
            </div>
          );

        if (formField.type === FieldTypes.Radio)
          return (
            <div className="mt-4 grid w-full items-center gap-1.5 sm:grid-cols-3" key={formField.id}>
              <Label htmlFor={formField.id} className="flex gap-4">
                {formField.label}
                <span className={`text-red-500 ${required ? "" : "hidden"}`}>*</span>
              </Label>
              <Controller
                name={`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const}
                control={control}
                rules={{ required: { message: "Ce champ est requis", value: required } }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <RadioGroup className="mt-2 w-full sm:col-span-2" value={value} onValueChange={(e) => onChange(e)}>
                    {formField.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        {" "}
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              <input
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.fieldId` as any)}
                defaultValue={formField.id}
                hidden
                type="hidden"
              />
              <input
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.attendeeId` as any)}
                defaultValue={
                  // fake value, juste to please graphql
                  "fc8bf1ed-d663-4169-a2b4-66e20fb1411f"
                }
                hidden
                type="hidden"
              />
              {formState.errors?.completeAttendees?.[attendeeIndex]?.attendeeFormFields?.[i]?.value && (
                <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
                  {formState.errors?.completeAttendees?.[i]?.attendeeFormFields?.[i]?.value?.message ||
                    "Ce champ est requis"}
                </p>
              )}
            </div>
          );

        return (
          <div className="mt-4 grid w-full items-center gap-1.5 sm:grid-cols-3" key={formField.id}>
            <Label htmlFor={formField.id}>
              {formField.label}
              <span className={`text-red-500 ${required ? "" : "hidden"}`}>*</span>
            </Label>

            {formField.type === "TEXT" ? (
              <Input
                placeholder={formField.placeholder}
                className="w-full sm:col-span-2"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : formField.type === "TEXTAREA" ? (
              <Textarea
                placeholder={formField.placeholder}
                className="w-full sm:col-span-2"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : formField.type === "SELECT" ? (
              <Controller
                control={control}
                name={`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const}
                rules={{ required: { message: "Ce champ est requis", value: required } }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Select value={value} onValueChange={(e) => onChange(e)}>
                    <SelectTrigger className="w-full sm:col-span-2">
                      <SelectValue placeholder={formField.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {required ? null : <SelectItem value={null}>-</SelectItem>}
                      {formField.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : formField.type === FieldTypes.Email ? (
              <Input
                placeholder={formField.placeholder}
                className="w-full sm:col-span-2"
                type="email"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : formField.type === FieldTypes.Tel ? (
              <Input
                placeholder={formField.placeholder}
                className="w-full sm:col-span-2"
                type="tel"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : formField.type === FieldTypes.Date ? (
              <Input
                placeholder={formField.placeholder}
                className="w-full sm:col-span-2"
                type="date"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : formField.type === FieldTypes.Number ? (
              <Input
                className="w-full sm:col-span-2"
                type="number"
                id={formField.id}
                {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.value` as const, {
                  required: { message: "Ce champ est requis", value: required },
                })}
              />
            ) : null}

            <input
              {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.fieldId` as any)}
              defaultValue={formField.id}
              hidden
              type="hidden"
            />
            <input
              {...register(`completeAttendees.${attendeeIndex}.attendeeFormFields.${i}.attendeeId` as any)}
              defaultValue={
                // fake value, juste to please graphql
                "fc8bf1ed-d663-4169-a2b4-66e20fb1411f"
              }
              hidden
              type="hidden"
            />
            {formState.errors?.completeAttendees?.[attendeeIndex]?.attendeeFormFields?.[i]?.value && (
              <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
                {formState.errors?.completeAttendees?.[i]?.attendeeFormFields?.[i]?.value?.message ||
                  "Ce champ est requis"}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};
