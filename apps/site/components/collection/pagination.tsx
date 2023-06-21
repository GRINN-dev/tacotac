"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";

export const Pagination: FC<{ totalCount: number }> = ({ totalCount }) => {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams as any);
  const page = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "4");
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="inline-flex items-center justify-center gap-8 text-xs sm:text-sm md:text-base">
      <div className="flex items-center gap-2">
        <Button
          disabled={page === 1}
          onClick={() => {
            newSearchParams.set("page", (page - 1).toString());
            router.push(`${pathname}?${newSearchParams.toString()}`);
          }}
        >
          <ChevronLeft size={8} className=" h-4 w-4 " />
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Select
            onValueChange={(value) => {
              newSearchParams.set("page", value);
              router.push(`${pathname}?${newSearchParams.toString()}`);
            }}
          >
            <SelectTrigger className="min-w-max">
              <SelectValue>page {page}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                <SelectItem value={i.toString()}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>/</div>
          <div className="min-w-max">
            {totalPages} ({totalCount} total)
          </div>
        </div>
        <Button
          disabled={page === totalPages}
          onClick={() => {
            newSearchParams.set("page", (page + 1).toString());
            router.push(`${pathname}?${newSearchParams.toString()}`);
          }}
        >
          <ChevronRight size={8} className=" h-4 w-4 " />
        </Button>
      </div>
      <Select
        onValueChange={(value) => {
          newSearchParams.set("itemsPerPage", value);
          router.push(`${pathname}?${newSearchParams.toString()}`);
        }}
      >
        <SelectTrigger>
          <SelectValue>{itemsPerPage} / page</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="12">12</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
