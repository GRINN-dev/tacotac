"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, PlusCircle } from "lucide-react";

import { iTypeFilter } from "@/types/filter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface iTableEvent {
  limit: number;
  header: any[];
  data: any[];
  totalCount: number;
  pageInfo: any;
}

export const Collection = ({ pageInfo, totalCount, limit, header, data }: iTableEvent) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Begin filter parts
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
      startTransition(() => router.push(pathname + `?filter=${JSON.stringify(filterObject)}`));
    }
    setTypeFilter(null);
    setFilter(null);
    setValueFilter(null);
    setDateFilter(null);
  };
  //end filter parts

  //begin pagination parts

  const filterParams = searchParams.get("filter"); //On peut éventuellement recupérer les données de filterObject dans le onChange via un hook (ceci est un reliquat du composant pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCount / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  //end pagination parts

  //animation non dépendante supprimer motion.div si nécessaire
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [data]);

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        {/* begin filter parts */}
        <div id="Filter" className="w-full max-w-3xl mx-auto mt-4">
          <Popover>
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
                        {header?.map(({ title, value, type, index }) => (
                          <SelectItem key={title + value + index} value={JSON.stringify({ value: value, type: type })}>
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
                          ? filterDateType?.map(({ title, value }, index) => (
                              <SelectItem key={title + value + index} defaultChecked value={value}>
                                {title}
                              </SelectItem>
                            ))
                          : filterStringType?.map(({ title, value }, index) => (
                              <SelectItem key={title + value + index} defaultChecked value={value}>
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
        {/* end filter parts */}
        <div id="organizations" className="w-full max-w-3xl mx-auto mt-4">
          <table className="flex flex-col px-6 py-3 border-t border-b rounded-t-lg rounded-b-lg border-x border-slate-300">
            <thead>
              <tr className="flex items-center">
                {header?.map((item, index) => (
                  <th
                    className="w-1/3 p-1"
                    key={"head " + item?.title + index}
                    onClick={() => console.log("test: ", item)}
                  >
                    {item?.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="flex flex-col">
              {data.map((row, index) => (
                <tr className="flex items-center " key={"row-" + index}>
                  {header?.map((item, index) => (
                    <td
                      className={` border-t ${
                        !isPending
                          ? "w-1/3 p-2 text-center "
                          : "w-1/6  h-[2.05rem] m-1  bg-gray-200 rounded-lg opacity-20 animate-pulse"
                      }`}
                      key={"data " + item?.title + index}
                    >
                      {!isPending && row[item?.title]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Begin pagination parts */}
          <div id="Pagination" className="flex flex-row justify-between">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Button
                disabled={!pageInfo?.hasPreviousPage}
                onClick={() => {
                  startTransition(() => {
                    const offset = currentPage <= 2 ? 0 : currentPage % 2 ? currentPage - 1 : currentPage - 2;
                    router.push(`${pathname}?offset=${offset}${filterParams ? `&filterParams=${filterParams}` : ""}`);
                  });

                  setCurrentPage(currentPage - 1);
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {pages?.map((number) => (
                <button
                  disabled={currentPage === number}
                  key={"input-limit-" + number}
                  className={`relative  inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20`}
                  onClick={() => {
                    startTransition(() => {
                      const offsetCurrent = number > 1 ? (number % 2 ? number + 1 : number) : 0;
                      router.push(
                        `${pathname}?offset=${offsetCurrent}${filterParams ? `&filterParams=${filterParams}` : ""}`
                      );
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
                  startTransition(() => {
                    const offsetNext = currentPage % 2 ? currentPage + 1 : currentPage + 2;
                    router.push(
                      `${pathname}?offset=${offsetNext}${filterParams ? `&filterParams=${filterParams}` : ""}`
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
          {/* End pagination parts */}
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