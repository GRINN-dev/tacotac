"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { PlusSquare } from "lucide-react";



import { PaginationUi } from "@/components/Pagination";
import { buttonVariants } from "@/components/ui/button";


export const TableEvent = ({ organization, limit, header, data }) => {
  const [isPending, startTransition] = useTransition();
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [organization]);
console.log("new compo");
  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
          {organization?.events?.nodes?.length > 0 ? (
            <>
              <table className="flex flex-col px-6 py-3 border-t border-b rounded-t-lg rounded-b-lg border-x border-slate-300">
                <thead>
                  <tr className="flex items-center">
                    {header?.map((item) => (
                      <th className="w-1/3 p-1" key={item}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="flex flex-col">
                  {data.map((row, index) => (
                    <tr className="flex items-center " key={index}>
                      {header?.map((item) => (
                        <td
                          className={` border-t ${
                            !isPending
                              ? "w-1/3 p-2 text-center "
                              : "w-1/6 h-8 m-1  bg-gray-200 rounded-lg opacity-20 animate-pulse"
                          }`}
                          key={item}
                        >
                          {!isPending && row[item]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationUi
                totalCount={organization?.events?.totalCount}
                limit={limit}
                pageInfo={organization?.events?.pageInfo}
                transition={startTransition}
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