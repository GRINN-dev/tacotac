"use client";

import { FC, useRef } from "react";
import { CreateAttendeeForm2 } from "@/app/inscription/[organizationSlug]/[eventSlug]/iframe/form/create-attendee-form";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { Button, Label } from "@/components/ui";
import { defaultTheme } from "./theme";

export const ThemeBuilder: FC<{
  eventBySlug: GetEventBySlugQuery["eventBySlug"];
}> = ({ eventBySlug }) => {
  const previewRef = useRef<HTMLDivElement>(null);
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
        style={{
          ...(watch("branding") as any),
        }}
      >
        <div className="rounded-3xl border-4 border-dashed p-4">
          <CreateAttendeeForm2 event={eventBySlug} />
        </div>
      </section>
      <form
        className="mt-12"
        onSubmit={handleSubmit((data: any) => {
          sdk().UpdateEventBranding({
            input: {
              id: eventBySlug.eventBranding.id,
              patch: {
                cssVariables: data.branding,
              },
            },
          });
        })}
      >
        <h2 className="mb-6 text-3xl font-bold">Couleurs</h2>
        {defaultTheme
          .filter((x) => x.type === "color")
          .map((x) => (
            <Label htmlFor={x.name} key={x.name} className="mt-2 flex gap-2">
              <input
                type="color"
                id={x.name}
                className="h-8 w-8 flex-none rounded-full border p-0"
                style={{
                  backgroundColor: watch(`branding.${x.name}`),
                }}
                {...register(`branding.${x.name}`, {
                  onChange: (e) => {
                    previewRef.current.style.setProperty(`${x.name}`, watch(`branding.${x.name}`));
                  },
                })}
              />
              <div>
                <p className="font-semibold">{x.displayName}</p>
                <p className="text-muted-foreground">{x.description}</p>
              </div>
            </Label>
          ))}
        <Button disabled={!isDirty} className="mt-4" type="submit">
          Mettre les couleurs à jours
        </Button>
      </form>
    </div>
  );
};

/*
map(var => (

          )
        )
*/
