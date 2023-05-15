"use client";

import { FC, useEffect, useRef } from "react";
import { CivilityStatus, GetEventBySlugQuery } from "@/../../@tacotacIO/codegen/dist";
import { Controller, useForm } from "react-hook-form";

import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { defaultTheme } from "./theme";
import { CreateAttendeeForm } from "@/app/inscription/[organizationSlug]/[eventSlug]/iframe/form";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ThemeBuilder: FC<{
  eventBySlug: GetEventBySlugQuery["eventBySlug"];
}> = ({eventBySlug}) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      branding: defaultTheme.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {} as any),
    },
  });

  // objectifs:
  // - isoler les composants d'un formulaire d'inscription (inputs, boutons, checkboxes, etc.)
  // - avoir un input pour chacune des variables de personnalisation
  // - refleter en temps réel l'effet de ces variables sur le formulaire
  return (
    <div className="grid-cols-2 h-full md:grid">
      <ScrollArea className="h-full border-r">
        <form onChange={e=>{trigger()}}>
          <h2>Couleurs</h2>
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
        </form>
      </ScrollArea>
      <section
        ref={previewRef}
        className="text-foreground bg-background p-4"
        id="preview text-foreground bg-background"
        style={
          ...watch('branding') as any
        }
      >
              <CreateAttendeeForm {...eventBySlug} />

      </section>
    </div>
  );
};


/*
map(var => (

          )
        )
*/
