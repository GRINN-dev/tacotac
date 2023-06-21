"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDownSquare, ChevronUpSquare, Filter } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, Input, Label, RadioGroup, RadioGroupItem } from "../ui";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const CollectionTable: FC<{
  collectionName: string;
  data: {
    displayName: string;
    name: string;
    values: (number | string | boolean | ReactNode)[];
    orderBy?: { asc: string; desc: string };
    filterType?: "boolean" | "string" | "date" | "id" | "number" | "enum";
    enumValues?: { value: string; label: string }[];
  }[];
}> = ({ data, collectionName }) => {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams as any);
  const orderBy = JSON.parse(searchParams.get("orderBy")) || [];
  const router = useRouter();
  const pathname = usePathname();
  return (
    <ScrollArea draggable className="w-full">
      <div className="sm:test-sm mx-4 text-xs md:mx-12 md:text-base">
        <table className="">
          <thead>
            <tr className="even:bg-muted m-0 border-t p-0">
              {data.map((item) => (
                <th className=" items-center border px-1 py-0.5 text-left font-bold sm:px-2 sm:py-1 md:px-4 md:py-2 [&[align=center]]:text-center [&[align=right]]:text-right">
                  <div className="flex items-center gap-1">
                    {item.displayName}
                    {item.orderBy && (
                      <div className="flex flex-col gap-px" id={`filter-${item.displayName}`}>
                        <button
                          className={cn(
                            "flex items-center justify-center ",
                            orderBy.includes(item.orderBy.asc) ? "bg-black text-white" : "text-primary bg-white"
                          )}
                          onClick={() => {
                            orderBy.includes(item.orderBy.asc) || orderBy.includes(item.orderBy.desc)
                              ? newSearchParams.delete("orderBy")
                              : newSearchParams.set(
                                  "orderBy",
                                  JSON.stringify([...orderBy, item.orderBy.asc]).replace(" ", "")
                                );
                            router.push(`${pathname}?${newSearchParams.toString()}`);
                          }}
                        >
                          <ChevronUpSquare size={8} />
                        </button>
                        <button
                          className={cn(
                            "flex items-center justify-center ",
                            orderBy.includes(item.orderBy.desc) ? "bg-black text-white" : "text-primary bg-white"
                          )}
                          onClick={() => {
                            orderBy.includes(item.orderBy.asc) || orderBy.includes(item.orderBy.desc)
                              ? newSearchParams.delete("orderBy")
                              : newSearchParams.set(
                                  "orderBy",
                                  JSON.stringify([...orderBy, item.orderBy.desc]).replace(" ", "")
                                );
                            router.push(`${pathname}?${newSearchParams.toString()}`);
                          }}
                        >
                          <ChevronDownSquare size={8} />
                        </button>
                      </div>
                    )}
                    {item.filterType ? (
                      <Popover>
                        <PopoverTrigger>
                          <Filter size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          {item.filterType === "boolean" ? (
                            <RadioGroup defaultValue="all">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" />
                                <Label htmlFor="all">Tout</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="true" />
                                <Label htmlFor="true">Oui</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="false" />
                                <Label htmlFor="false">Non</Label>
                              </div>
                            </RadioGroup>
                          ) : item.filterType === "string" ? (
                            <div className="flex items-center space-x-2">
                              <Input />
                              <div className="flex gap-2">
                                <Button>Valider</Button>
                                <Button variant="outline">Annuler</Button>
                              </div>
                            </div>
                          ) : item.filterType === "date" ? (
                            <div className="flex items-center space-x-2">
                              <Label htmlFor="date">avant le</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[280px] justify-start text-left font-normal",
                                      false && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {false ? format(new Date(), "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar mode="single" initialFocus />
                                </PopoverContent>
                              </Popover>
                            </div>
                          ) : item.filterType === "number" ? (
                            <div className="flex items-center space-x-2">
                              <Input />
                              <div className="flex gap-2">
                                <Button>Valider</Button>
                                <Button variant="outline">Annuler</Button>
                              </div>
                            </div>
                          ) : item.filterType === "enum" ? (
                            <RadioGroup defaultValue="all">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" />
                                <Label htmlFor="all">Tout</Label>
                              </div>
                              {item.enumValues.map((x) => (
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value={x.value} id={x.value} />
                                  <Label htmlFor={x.value}>{x.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          ) : (
                            false
                          )}
                        </PopoverContent>
                      </Popover>
                    ) : (
                      false
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].values.map((_, i) => (
              <tr className="even:bg-muted m-0 border-t p-0" key={`${collectionName}-row-${i}`}>
                {data.map((item, j) => (
                  <td
                    key={`${collectionName}-row-${i}-col-${j}`}
                    className="border px-1 py-0.5 text-left sm:px-2 sm:py-1 md:px-4 md:py-2 [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {item.values[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
