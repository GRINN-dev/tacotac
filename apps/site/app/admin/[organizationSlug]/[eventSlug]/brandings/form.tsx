"use client";

import { FC } from "react";
import { GetEventBySlugQuery } from "@/../../@tacotacIO/codegen/dist";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventFormFieldsForm } from "./UpdateForm";
import { ThemeBuilder } from "./_components/theme-builder";

export const Form: FC<{
  eventBySlug: GetEventBySlugQuery["eventBySlug"];
}> = ({ eventBySlug }) => {
  return (
    <Tabs defaultValue="colors">
      <TabsList className="">
        <TabsTrigger value="colors">Couleurs</TabsTrigger>
        <TabsTrigger value="form">Champs formulaire</TabsTrigger>
        <TabsTrigger value="ticket">Billet</TabsTrigger>
      </TabsList>
      <TabsContent value="colors">
        <ThemeBuilder eventBySlug={eventBySlug} />
      </TabsContent>
      <TabsContent value="form">
        <EventFormFieldsForm event={eventBySlug} />
      </TabsContent>
      <TabsContent value="ticket"></TabsContent>
    </Tabs>
  );
};