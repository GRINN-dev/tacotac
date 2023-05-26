"use client";

import { FC } from "react";
import { GetEventBySlugQuery } from "@/../../@tacotacIO/codegen/dist";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreationDialog, FormFieldCard } from "./_components/form-fields-card";

export const EventFormFieldsForm: FC<{
  event: GetEventBySlugQuery["eventBySlug"];
}> = ({ event }) => {
  return (
    <section id="event-form-fields">
      <h2 className="admin-h2">Champs du formulaire évènement</h2>
      <CreationDialog eventID={event.id} />
      {/* Je veux mapper event.formFields.nodes pour voir tous les champs associés à cet event et je veux pouvoir en ajouter ou en supprimer */}
      <div className="mt-8 grid gap-4">
        {event.formFields.nodes.map((formField) => {
          return (
            <Card key={formField.id}>
              {formField.label && <CardHeader>{formField.label}</CardHeader>}

              <CardContent>
                <FormFieldCard
                  formField={formField}
                  isLast={event.formFields.nodes[event.formFields.nodes.length - 1].id === formField.id}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
