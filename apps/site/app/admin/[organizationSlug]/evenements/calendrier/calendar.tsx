"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllEventsQuery } from "@/../../@tacotacIO/codegen/dist";
import { Flower2 } from "lucide-react";

import { GenericCalendar } from "@/components/calendar/generic-calendar";

export const EventsCalendar: FC<{
  events: GetAllEventsQuery["events"]["nodes"];
  currentUserId: string;
  organizationSlug: string;
}> = ({ events, currentUserId, organizationSlug }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cafe = searchParams.get("cafe") || "all";
  return (
    <section id="liste-des-cafes" className="mt-12">
      <div className="mt-8"></div>
      <GenericCalendar
        defaultView="calendar"
        onDateSelected={(date) => {
          router.push(`/admin/${organizationSlug}/evenements/create`);
        }}
        elementsToDisplay={events.map((event) => ({
          endsAt: new Date(event.endsAt),
          startsAt: new Date(event.startsAt),
          title: event.name,
          onClick: () => {
            router.push(`/admin/${organizationSlug}/evenements/${event.slug}`);
          },
          color: "green",
          Icon: Flower2,
          createdAt: new Date(event.createdAt),
          description: event.description,
          //userName: event.user && `${event.user.firstname} ${event.user.lastname}`,
          //coffeeShopName: event.coffeeShop && event.coffeeShop.name,
        }))}
      />
    </section>
  );
};
