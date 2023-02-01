"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { PlusSquare } from "lucide-react";

import { PaginationUi } from "@/components/Pagination";
import { buttonVariants } from "@/components/ui/button";

export const TableEvent = ({ organization, limit }) => {
  const [isPending, startTransition] = useTransition();
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [organization]);

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
          {organization?.events?.edges?.length > 0 ? (
            <>
              {organization?.events?.edges.map((event) => (
                <div
                  key={event?.node?.id}
                  className="flex items-center justify-between px-6 py-3 border-b border-x border-slate-300 first-of-type:rounded-t-lg first-of-type:border-t last-of-type:rounded-b-lg"
                >
                  <Link
                    href={`/organizations/${organization?.slug}/${event?.node?.slug}`}
                  >
                    {event?.node?.name}
                  </Link>

                  <Link
                    href={`/organizations/${organization?.slug}/${event?.node?.slug}`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <PlusSquare className="w-4 h-4 mr-2" /> Infos
                  </Link>
                </div>
              ))}
              <PaginationUi
                totalCount={organization?.events?.totalCount}
                limit={limit}
                pageInfo={organization?.events?.pageInfo}
              />
            </>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p>Vous n&apos;avez pas encore créé d&apos;évènements.</p>
              <Link
                href={`/organizations/${organization?.slug}/create-event`}
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
