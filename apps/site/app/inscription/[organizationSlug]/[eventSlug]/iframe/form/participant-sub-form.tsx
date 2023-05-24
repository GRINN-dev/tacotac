"use client";

import { FC } from "react";
import { CivilityStatus, GetEventBySlugQuery, RegisterAttendeesInput } from "@tacotacIO/codegen";
import { Controller, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ParticipantSubFormProps {
  branding: GetEventBySlugQuery["eventBySlug"]["eventBranding"];
  methods: UseFormReturn<RegisterAttendeesInput, any>;
  // fieldMethods: UseFieldArrayReturn<RegisterAttendeesInput, "attendees", "id">;
  index: number;
  isInscriptor: boolean;
}
export const ParticipantSubForm: FC<ParticipantSubFormProps> = ({ branding, methods, index, isInscriptor }) => {
  const { register, formState, control } = methods;
  const i = index;
  const { nom, prenom, email, telephone, zipcode } = branding?.placeholder || {};

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
        <Label htmlFor="civility">
          Civilité<span className="text-red-500"> *</span>
        </Label>
        <Controller
          name={`attendees.${i}.civility`}
          control={control}
          rules={{ required: "Une civilité pour le participant est requise" }}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col">
              <Select value={value} onValueChange={onChange}>
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
              {formState.errors?.attendees?.[i]?.civility && (
                <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
                  {formState.errors?.attendees?.[i]?.civility?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
        <Label htmlFor="lastname">
          Nom<span className="text-red-500"> *</span>
        </Label>
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
          <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
            {formState.errors?.attendees?.[i].lastname?.message}
          </p>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
        <Label htmlFor="firstname">
          Prénom <span className="text-red-500"> *</span>
        </Label>
        <div className="flex w-full flex-col">
          <Input
            type="text"
            id="firstname"
            placeholder={prenom}
            {...register(`attendees.${i}.firstname`, {
              required: "Un prénom pour le participant est requis",
            })}
            className="col-span-2 w-full"
          />
          {formState.errors?.attendees?.[i]?.firstname && (
            <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
              {formState.errors?.attendees?.[i]?.firstname?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
        <Label htmlFor="email">
          Email
          {isInscriptor ? <span className="text-red-500"> *</span> : ""}
        </Label>
        <div className="flex flex-col">
          <Input
            type="email"
            id="email"
            className="col-span-2"
            placeholder={email}
            {...register(`attendees.${i}.email`, {
              setValueAs: (v) => (v ? v : null),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Merci d'entrer un email valide",
              },
              required: { value: isInscriptor, message: "Un email pour le participant est requis" },
            })}
          />
          {formState.errors?.attendees?.[i].email && (
            <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
              {formState.errors?.attendees?.[i]?.email?.message}
            </p>
          )}
        </div>
      </div>
      {isInscriptor ? (
        <>
          <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
            <Label htmlFor="phoneNumber">Téléphone</Label>
            <Input
              type="number"
              id="phoneNumber"
              className="col-span-2"
              placeholder={telephone}
              {...register(`attendees.${i}.phoneNumber`)}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 items-center gap-1.5">
            <Label htmlFor="zipCode">
              Code postal <span className="text-red-500"> *</span>
            </Label>
            <div className="flex w-full flex-col">
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
                <p className="whitespace-nowrap text-sm text-red-800 dark:text-red-300">
                  {formState.errors?.attendees?.[i]?.zipCode?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex w-full items-baseline gap-1">
            <Label htmlFor="civility" className="my-4">
              Comment avez-vous entendu parler de cet événement ?<span className="text-red-500"> *</span>
            </Label>

            <Controller
              name={"attendee.hearAbout"}
              control={control}
              {...register(`attendees.${i}.hearAbout`, { required: "Merci de sélectionner une réponse" })}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col">
                  <Select value={value} onValueChange={onChange} required={true}>
                    <SelectTrigger className="my-4">
                      <SelectValue placeholder="Sélectionnez une réponse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"par un mécéne"}>Par un mécéne</SelectItem>
                        <SelectItem value={"par une association lauréate"}>Par une association lauréate</SelectItem>
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
                </div>
              )}
            />
          </div>
          {formState.errors?.attendees?.[i]?.hearAbout && (
            <p className="-mt-1 text-sm text-red-800 dark:text-red-300">
              {formState.errors?.attendees?.[i]?.hearAbout?.message}
            </p>
          )}
        </>
      ) : null}
    </>
  );
};
