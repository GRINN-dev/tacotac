"use client";

import { FC, useEffect, useTransition } from "react";
import Link from "next/link";
import { GetOrganizationBySlugQuery } from "@/../../@tacotacIO/codegen/dist";
import { motion, useAnimationControls } from "framer-motion";
import { PlusSquare } from "lucide-react";

import { iSelectData } from "@/types/filter";
import { FilterUi } from "@/components/Filter";
import { PaginationUi } from "@/components/Pagination";
import { buttonVariants } from "@/components/ui/button";

interface iTableEvent extends ExtractType<GetOrganizationBySlugQuery, "organizationBySlug"> {
  limit: number;
}

export const TableEvent = ({ slug, events, limit }: iTableEvent) => {
  const [isPending, startTransition] = useTransition();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [events]);

  const select: iSelectData[] = [
    { title: "Nom", value: "name", type: "string" },
    { title: "Lieu", value: "city", type: "string" },
    { title: "Commence le", value: "happeningAt", type: "date" },
    { title: "Début inscription", value: "bookingStartsAt", type: "date" },
    { title: "Fin inscription", value: "bookingEndsAt", type: "date" },
    { title: "Participants", value: "attendees", type: "date" },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        <FilterUi select={select} transition={startTransition} />
        <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
          {events?.nodes?.length > 0 ? (
            <>
              {events?.nodes.map((event) => (
                <div
                  key={event?.id}
                  className="flex items-center justify-between px-6 py-3 border-b border-x border-slate-300 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
                >
                  <Link
                    className={isPending && "w-1/2 h-10  bg-gray-200 rounded-lg opacity-20 animate-pulse"}
                    href={`/organizations/${slug}/${event?.slug}`}
                  >
                    {!isPending && event?.name}
                  </Link>

                  <Link
                    href={`/organizations/${slug}/${event?.slug}`}
                    className={`${
                      isPending
                        ? "w-1/6 h-10  bg-gray-200 rounded-lg opacity-20 animate-pulse "
                        : buttonVariants({ variant: "outline" })
                    }`}
                  >
                    {!isPending && (
                      <>
                        <PlusSquare className="w-4 h-4 mr-2" /> Infos
                      </>
                    )}
                  </Link>
                </div>
              ))}
              <PaginationUi
                totalCount={events?.totalCount}
                limit={limit}
                pageInfo={events?.pageInfo}
                transition={startTransition}
              />
            </>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p>
                Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
              </p>
              <Link
                href={`/organizations/${slug}/create-event`}
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                <PlusSquare className="w-4 h-4 mr-2" /> Créer un évènement
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};