"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Filter, PlusCircle } from "lucide-react";



import { iSelectData } from "@/types/filter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface iFilter {
  select: iSelectData[];
  filterType: iSelectData[];
}

export const FilterUi = ({ select, filterType }: iFilter) => {
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [value, setValue] = useState<string | number | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const onChange = () => {
    console.log(type, filter, value, date);
    const filterObject = {};
    const typeObject = {};

    // Vérifiez si les variables ne sont pas null ou undefined
    console.log(
      "🚀 ~ file: Filter.tsx:50 ~ onChange ~ typeObject",
      filterObject,
      JSON.stringify(filterObject)
    );
    if (type && filter && (value || date)) {
      typeObject[filter] = value || date;

      filterObject[type] = typeObject;
      router.push(pathname + `?filter=${JSON.stringify(filterObject)}`);
      setType(null)
      setFilter(null)
      setValue(null)
      setDate(null)
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
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisis un type" />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    {select?.map(({ title, value }) => (
                      <SelectItem key={title + value} value={value}>
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
                    {filterType?.map(({ title, value }) => (
                      <SelectItem defaultChecked value={value}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label htmlFor="height">Valeur</Label>
              <Input
                onChange={(e) => setValue(e.target.value)}
                id="value"
                className="h-8 col-span-2"
              />
            </div>
            <div className="">
              <Label htmlFor="maxHeight">Date</Label>
              <Input
                onChange={(e) => setDate(e.target.valueAsDate)}
                type={"date"}
                id="date"
                className="h-8 col-span-2"
              />
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