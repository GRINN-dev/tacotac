"use client";

import { FC, useRef } from "react";
import {  GetEventBySlugQuery } from "@/../../@tacotacIO/codegen/dist";
import {  useForm } from "react-hook-form";

import {
  Button,
  Label,
} from "@/components/ui";
import { defaultTheme } from "./theme";
import { CreateAttendeeForm2 } from "@/app/inscription/[organizationSlug]/[eventSlug]/iframe/form/create-attendee-form";
import { sdk } from "@/lib/sdk";

export const ThemeBuilder: FC<{
  eventBySlug: GetEventBySlugQuery["eventBySlug"];
}> = ({eventBySlug}) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      branding:
        eventBySlug?.eventBranding?.cssVariables ||
        defaultTheme.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {} as any),
    },
  });

  return (
    <div className="mt-12">

      <section
        ref={previewRef}
        className="text-foreground bg-background"
        id="preview text-foreground bg-background"
        style={
          ...watch('branding') as any
        }
      >
        <div className="p-4 border-4 rounded-3xl border-dashed">
          <CreateAttendeeForm2 event={eventBySlug}  />
        </div>
      </section>
      <form
        className="mt-12"
        onSubmit={handleSubmit((data) => {
          sdk().UpdateEventBranding({
            input: {
              id: eventBySlug.eventBranding.id,
              patch: {
                cssVariables: data.branding,
              }
            }
          })
        })}
      >
          <h2 className="text-3xl font-bold mb-6">Couleurs</h2>
          {defaultTheme.filter(x => x.type === "color").map((x) => (
            <Label htmlFor={x.name} key={x.name} className="mt-2 flex gap-2">
                <input
                  type="color"
                  id={x.name}
                  className="p-0 h-8 w-8 rounded-full flex-none border"
                  style={
                    {
                    backgroundColor: watch(`branding.${x.name}`),
                    }
                  }
                {...register(`branding.${x.name}`, {
                  onChange: (e) => {
                  previewRef.current.style.setProperty(`${x.name}`, watch(`branding.${x.name}`));
                  }
                  })}
                />
              <div>
                <p className="font-semibold">{x.displayName}</p>
                <p className="text-muted-foreground">{
                  x.description}</p>
              </div>
            </Label>
          ))
        }
        <Button
          disabled={!isDirty}
          className="mt-4"
          type="submit"
        >Mettre les couleurs à jours</Button>
        </form>
    </div>
  );
};


/*
map(var => (

          )
        )
*/
