"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Filter, PlusCircle } from "lucide-react";

import { iSelectData } from "@/types/filter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface iFilter {
  select: iSelectData[];
  filterStringType: iSelectData[];
  filterDateType: iSelectData[];
}
interface iStateFilter {
  value: string;
  type: string;
}

export const FilterUi = ({
  select,
  filterStringType,
  filterDateType,
}: iFilter) => {
  const router = useRouter();
  const pathname = usePathname();
  const [typeFilter, setTypeFilter] = useState<any>("{}");
  const [filter, setFilter] = useState<string | null>(null);
  const [valueFilter, setValueFilter] = useState<string | number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [isDate, setIsDate] = useState(false);

  useEffect(() => {
    const { value, type } = JSON.parse(typeFilter);
    if (type === "date") {
      setIsDate(true);
    } else {
      setIsDate(false);
    }
  }, [typeFilter]);

  const onChange = () => {
    const { value } = JSON.parse(typeFilter);
    const filterObject = {};
    const typeObject = {};

    // Vérifiez si les variables ne sont pas null ou undefined
    console.log(
      "🚀 ~ file: Filter.tsx:50 ~ onChange ~ typeObject",
      filterObject,
      JSON.parse(typeFilter).value
    );
    if (value && filter && (valueFilter || date)) {
      typeObject[filter] = valueFilter || date;

      filterObject[value] = typeObject;
      console.log(
        "🚀 ~ file: Filter.tsx:69 ~ onChange ~ filterObject",
        filterObject
      );
      //router.push(pathname + `?filter=${JSON.stringify(filterObject)}`);
      setTypeFilter(null);
      setFilter(null);
      setValueFilter(null);
      setDate(null);
    }
  };
  return (
    <div id="Filter" className="w-full max-w-3xl mx-auto mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10 p-0 rounded-full">
            <Filter className="w-4 h-4" />
            <span className="sr-only">Open popover</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col space-y-4">
            <div className="">
              <Select onValueChange={(value) => setTypeFilter(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisis un type" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    {select?.map(({ title, value, type }) => (
                      <SelectItem
                        key={title + value}
                        value={JSON.stringify({ value: value, type: type })}
                      >
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
                          <SelectItem defaultChecked value={value}>
                            {title}
                          </SelectItem>
                        ))
                      : filterStringType?.map(({ title, value }) => (
                          <SelectItem defaultChecked value={value}>
                            {title}
                          </SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label htmlFor="height">{isDate ? "Date" : "Valeur"}</Label>
              {isDate ? (
                <Input
                  onChange={(e) => setDate(e.target.valueAsDate)}
                  type={"date"}
                  id="date"
                  className="h-8 col-span-2"
                />
              ) : (
                <Input
                  onChange={(e) => setValueFilter(e.target.value)}
                  id="value"
                  className="h-8 col-span-2"
                />
              )}
            </div>

            <div className="self-center">
              <PopoverTrigger asChild>
                <Button
                  onClick={onChange}
                  variant="outline"
                  className="flex space-x-4 "
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Ajouter</span>
                </Button>
              </PopoverTrigger>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};