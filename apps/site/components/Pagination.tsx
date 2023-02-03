"use client";

import { TransitionStartFunction, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageInfo } from "@/../../@tacotacIO/codegen/dist";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";



import { Button } from "./ui/button";


interface IPagination {
  totalCount: number;
  limit: number;
  searchParams?: any;
  pageInfo?: PageInfo;
  transition: TransitionStartFunction;
}

export const PaginationUi = ({
  totalCount,
  limit,
  pageInfo,
  transition,
}: IPagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCount / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between">
      <nav
        className="inline-flex -space-x-px rounded-md shadow-sm isolate"
        aria-label="Pagination"
      >
        <Button
          disabled={!pageInfo?.hasPreviousPage}
          onClick={() => {
            transition(() => {
              if (currentPage <= 2) {
                router.push(pathname);
                return;
              }
              router.push(
                pathname +
                  `?offset=${
                    currentPage % 2 ? currentPage - 1 : currentPage - 2
                  }`
              );
            });

            setCurrentPage(currentPage - 1);
          }}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        {pages?.map((number) => (
          <button
            disabled={currentPage === number}
            key={"input-limit-" + number}
            className={`relative  inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20`}
            onClick={() => {
              transition(() => {
                if (number > 1) {
                  router.push(
                    pathname + `?offset=${number % 2 ? number + 1 : number}`
                  );
                } else {
                  router.push(pathname);
                }
              });

              setCurrentPage(number);
            }}
            
          >
            {currentPage === number && (
              <motion.span
                layoutId="underline"
                className="absolute left-[25%] block items-center justify-center top-full  h-[1px] w-1/2 bg-white"
              />
            )}
            {number}
          </button>
        ))}
        <Button
          disabled={!pageInfo?.hasNextPage}
          onClick={() => {
            transition(() => {
              router.push(
                pathname +
                  `?offset=${
                    currentPage % 2 ? currentPage + 1 : currentPage + 2
                  }`
              );
            });
            setCurrentPage(currentPage + 1);
          }}
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </nav>
    </div>
  );
};