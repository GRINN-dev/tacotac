"use client";

import { FC } from "react";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreationDialog, FormFieldCard, OrderFieldButton } from "./form-fields-card";

export const EventFormFieldsForm: FC<{
  event: GetEventBySlugQuery["eventBySlug"];
}> = ({ event }) => {
  return (
    <section id="event-form-fields">
      <h2 className="admin-h2">Champs du formulaire évènement</h2>
      <CreationDialog eventID={event.id} />
      {/* Je veux mapper event.formFields.nodes pour voir tous les champs associés à cet event et je veux pouvoir en ajouter ou en supprimer */}
      <div className="mt-8 grid gap-4">
        <Accordion type="single" collapsible>
          {event.formFields.nodes.map((formField) => {
            return (
              <AccordionItem value={formField.id} key={formField.id}>
                <div className="flex w-full items-center gap-2">
                  <OrderFieldButton
                    formField={formField}
                    isLast={event.formFields.nodes[event.formFields.nodes.length - 1].id === formField.id}
                  />
                  <AccordionTrigger className="grow">{formField.label}</AccordionTrigger>
                </div>

                <AccordionContent>
                  <FormFieldCard
                    formField={formField}
                    isLast={event.formFields.nodes[event.formFields.nodes.length - 1].id === formField.id}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};
