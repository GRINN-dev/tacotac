"use client";

import { TransitionStartFunction, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Filter, PlusCircle } from "lucide-react";



import { iSelectData, iTypeFilter } from "@/types/filter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface iFilter {
  select: iSelectData[];
  transition: TransitionStartFunction;
}

export const FilterUi = ({ select, transition }: iFilter) => {
  const router = useRouter();
  const pathname = usePathname();
  const [typeFilter, setTypeFilter] = useState<string>();
  const [filter, setFilter] = useState<string | null>(null);
  const [valueFilter, setValueFilter] = useState<string | number | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [isDate, setIsDate] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const filterStringType: iTypeFilter[] = [
    { title: "contient", value: "in" },
    { title: "ne contient pas", value: "notIn" },
    { title: "est", value: "equalTo" },
    { title: "n'est pas", value: "notEqualTo" },
    { title: "n'est pas nul", value: "isNull" },
  ];

  const filterDateType: iTypeFilter[] = [
    { title: "est", value: "equalTo" },
    { title: "n'est pas", value: "notEqualTo" },
    { title: "n'est pas nul", value: "isNull" },
    { title: "est plus petit que", value: "lessThan" },
    { title: "est plus petit ou égal à", value: "lessThanOrEqualTo" },
    { title: "est plus grand que", value: "greaterThan" },
    { title: "est plus grand ou égale à", value: "greaterThanOrEqualTo" },
  ];
  useEffect(() => {
    if (typeFilter) {
      const { type } = JSON.parse(typeFilter);
      setIsDate(type === "date");
    }

    setIsNull(filter === "isNull");
  }, [typeFilter, filter]);

  const createFilterObject = (
    value: any,
    filter: string,
    valueFilter: string | number | null,
    dateFilter: Date | null,
    isNull: boolean
  ) => {
    const typeObject: {} = {};

    if (!value || !filter) {
      return null;
    }

    if (isNull) {
      typeObject[filter] = false;
    } else {
      typeObject[filter] = valueFilter || dateFilter;
    }

    return { [value]: typeObject };
  };

  const onChange = () => {
    const { value } = JSON.parse(typeFilter);
    const filterObject = createFilterObject(value, filter, valueFilter, dateFilter, isNull);

    if (filterObject) {
      transition(() => router.push(pathname + `?filter=${JSON.stringify(filterObject)}`));
    }
    setTypeFilter(null);
    setFilter(null);
    setValueFilter(null);
    setDateFilter(null);
  };
  return (
    <div id="Filter" className="w-full max-w-3xl mx-auto mt-4">
      <Popover >
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10 p-0 rounded-full">
            <Filter className="w-4 h-4" />
            <span className="sr-only">Open popover</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <div className="flex flex-col space-y-4">
            <div className="">
              <Select onValueChange={(value) => setTypeFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisis un type" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    {select?.map(({ title, value, type }) => (
                      <SelectItem key={title + value} value={JSON.stringify({ value: value, type: type })}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select onValueChange={(value) => setFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisis un filtre" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    {isDate
                      ? filterDateType?.map(({ title, value }) => (
                          <SelectItem key={title+ value} defaultChecked value={value}>
                            {title}
                          </SelectItem>
                        ))
                      : filterStringType?.map(({ title, value }) => (
                          <SelectItem key={title+ value} defaultChecked value={value}>
                            {title}
                          </SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {!isNull && (
              <div className="">
                <Label htmlFor="height">{isDate ? "Date" : "Valeur"}</Label>
                {isDate ? (
                  <Input
                    onChange={(e) => setDateFilter(e.target.valueAsDate)}
                    type={"date"}
                    id="date"
                    className="h-8 col-span-2"
                  />
                ) : (
                  <Input onChange={(e) => setValueFilter(e.target.value)} id="value" className="h-8 col-span-2" />
                )}
              </div>
            )}

            <div className="self-center">
              <PopoverTrigger asChild>
                <Button onClick={onChange} variant="outline" className="flex space-x-4 ">
                  <PlusCircle className="w-4 h-4" />
                  <span>Filtrer</span>
                </Button>
              </PopoverTrigger>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};