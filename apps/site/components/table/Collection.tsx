"use client";

import { useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";



import { FilterUi } from "@/components/Filter";
import { PaginationUi } from "@/components/Pagination";

interface iTableEvent {
  limit: number;
  header: any[];
  data: any[];
  totalCount: number;
  pageInfo: any;
}

export const Collection = ({ pageInfo, totalCount, limit, header, data }: iTableEvent) => {
  const [isPending, startTransition] = useTransition();
  const controls = useAnimationControls();
  const pathname = usePathname();
  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [data]);

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        <FilterUi select={header} transition={startTransition} />
        <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
          {/* {events?.nodes?.length > 0 ? ( */}
          <>
            <table className="flex flex-col px-6 py-3 border-t border-b rounded-t-lg rounded-b-lg border-x border-slate-300">
              <thead>
                <tr className="flex items-center">
                  {header?.map((item) => (
                    <th className="w-1/3 p-1" key={"head " + item?.title} onClick={() => console.log("test: ", item)}>
                      {item?.title}
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
                            : "w-1/6  h-[2.05rem] m-1  bg-gray-200 rounded-lg opacity-20 animate-pulse"
                        }`}
                        key={"data " + item?.title}
                      >
                        {!isPending && row[item?.title]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationUi totalCount={totalCount} limit={limit} pageInfo={pageInfo} transition={startTransition} />
          </>
          {/* ) : (
            <div className="flex flex-col items-start gap-4">
              <p>
                Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
              </p>
              <Link href={`/${pathname}/create-event`} className={buttonVariants({ size: "lg", variant: "outline" })}>
                <PlusSquare className="w-4 h-4 mr-2" /> Créer un évènement
              </Link>
            </div>
          )} */}
        </div>
      </motion.div>
    </>
  );
};