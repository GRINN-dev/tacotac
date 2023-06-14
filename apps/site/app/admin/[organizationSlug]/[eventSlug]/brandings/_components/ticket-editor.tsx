"use client";

import { PreviewA4 } from "@diagoriente/react-preview-a4";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";

import { Button } from "@/components/ui/button";
import { TicketThemeForm } from "./ticket-theme-form";

export function TicketEditor({ event }: { event: GetEventBySlugQuery["eventBySlug"] }) {
  return (
    <div className="mt-12">
      <section className="text-foreground bg-background h-80" id="ticket-preview"></section>
      <TicketThemeForm />
    </div>
  );
}
