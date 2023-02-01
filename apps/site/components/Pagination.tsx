"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PageInfo } from "@/../../@tacotacIO/codegen/dist";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./ui/button";

interface IPagination {
  totalCount: number;
  limit: number;
  searchParams?: any;
  pageInfo?: PageInfo;
}

export const PaginationUi = ({
  totalCount,
  limit,
  searchParams,
  pageInfo,
}: IPagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState(pageInfo?.endCursor);
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
            router.push(pathname + `?last=2&before=${pageInfo?.startCursor}`);
            //setCurrentPage(currentPage - 1);
            setCurrentCursor(pageInfo?.endCursor);
          }}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {pages?.map((number) => (
          //   <Link href={pathname}>{number}</Link>
          <button
            disabled={currentPage === number}
            key={"input-limit-" + number}
            className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20"
            onClick={() => {
              router.push(pathname + `?after=${pageInfo?.endCursor}`);
              setCurrentPage(number);
            }}
          >
            {number}
          </button>
        ))}

        <Button
          disabled={!pageInfo?.hasNextPage}
          onClick={() => {
            router.push(pathname + `?after=${pageInfo?.endCursor}`);
            //setCurrentPage(currentPage + 1);
            setCurrentCursor(pageInfo?.endCursor);
          }}
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </nav>
    </div>
  );
};
