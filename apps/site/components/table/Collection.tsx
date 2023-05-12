"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Filter, PlusCircle, XCircle } from "lucide-react";



import { IData, IHeader, ITypeFilter } from "@/types/filter";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface iTableEvent {
  header: IHeader[];
  data: IData[];
  totalCount: number;
  pageInfo: any;
  initLimit?: number;
  routerPath?: any;
  isRedirectStop?: boolean;
}
//pour pr

const formatCollectionData = (headerFormat: IHeader[], rawData: IData[]) => {
  //regroupement des données afin qu'elles correspondent au header pour l'affichage à faire évoluer ?
  const dataformat: IData[] = rawData?.map((row) => {
    const dataRow: IData = {};
    headerFormat?.forEach((item) => {
      dataRow[item?.title] = row[item?.title];
    });
    return dataRow;
  });

  return { headerFormat, dataformat };
};

export const Collection = ({
  pageInfo,
  totalCount,
  header,
  data,
  initLimit,
  routerPath,
  isRedirectStop,
}: iTableEvent) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const offsetParams = searchParams.get("offset");
  const firstParams = searchParams.get("first");
  const orderByParams = searchParams.get("orderBy");
  const { headerFormat, dataformat } = formatCollectionData(header, data);

  // Begin filter parts
  const [typeFilter, setTypeFilter] = useState<string>();
  const [filter, setFilter] = useState<string | null>(null);
  const [valueFilter, setValueFilter] = useState<string | number | null>(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [isDate, setIsDate] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("");

  const filterStringType: ITypeFilter[] = [
    { title: "contient", value: "in" },
    { title: "ne contient pas", value: "notIn" },
    { title: "est", value: "equalTo" },
    { title: "n'est pas", value: "notEqualTo" },
    { title: "n'est pas nul", value: "isNull" },
  ];

  const filterDateType: ITypeFilter[] = [
    // { title: "est", value: "equalTo" },
    // { title: "n'est pas", value: "notEqualTo" },
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
    valueFilter: any,
    dateFilter: any | null,
    isNull: boolean
  ) => {
    const typeObject: {} = {};

    if (!value || !filter) {
      return null;
    }

    //début partie gestion affichage filtre
    const foundTitle =
      filterStringType.find((element) => element.value === filter) ||
      filterDateType.find((element) => element.value === filter);

    const { title } = header?.find((element) => element?.value === value);

    setCurrentFilter(
      `${title} ${foundTitle?.title} ${isNull ? "" : valueFilter || dayjs(dateFilter).format("DD/MM/YYYY")}`
    );
    //fin parti gestion affichage filtre
    typeObject[filter] = isNull ? false : isNaN(valueFilter) ? valueFilter : Number(valueFilter) || dateFilter;

    return { [value]: typeObject };
  };

  const onChange = () => {
    const { value } = JSON.parse(typeFilter);
    const filterObject = createFilterObject(value, filter, valueFilter, dateFilter, isNull);

    if (filterObject) {
      startTransition(() =>
        router.push(pathname + `?filter=${JSON.stringify(filterObject)}${firstParams ? `&first=${firstParams}` : ""}`)
      );
    }
    setTypeFilter(null);
    setFilter(null);
    setValueFilter(null);
    setDateFilter(null);
  };
  //end filter parts

  //begin pagination parts

  const filterParams = searchParams.get("filter");
  //On peut éventuellement recupérer les données de filterObject dans le onChange via un hook (ceci est un reliquat du composant pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initLimit);

  //end pagination parts

  //animation non dépendante supprimer motion.div si nécessaire
  const controls = useAnimationControls();

  useEffect(() => {
    //pour animation peut-etre supprimé si import
    controls.start({ opacity: 1, x: 0 });
  }, [data]);

  return (
    <>
      {/* //motion.div => pour animation peut-etre supprimé si import */}
      <motion.div initial={{ opacity: 0, x: -100 }} animate={controls}>
        {/* begin filter parts */}
        <div id="Filter" className="mx-auto  mt-4 flex w-full space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-10 rounded-full p-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Open popover</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="m-2 flex flex-col space-y-4">
                <div className="">
                  <Select onValueChange={(value) => setTypeFilter(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisis un type" />
                    </SelectTrigger>
                    <SelectContent className="w-[180px]">
                      <SelectGroup>
                        {headerFormat
                          ?.filter(({ isVisible }) => isVisible)
                          ?.map(({ title, value, type }, index) => (
                            <SelectItem
                              key={title + value + index}
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
                        onChange={(e) => setDateFilter(e.target?.value)}
                        type={"datetime-local"}
                        id="date"
                        className="col-span-2 h-8"
                      />
                    ) : (
                      <Input onChange={(e) => setValueFilter(e.target.value)} id="value" className="col-span-2 h-8" />
                    )}
                  </div>
                )}

                <DropdownMenuItem className="self-center" onClick={onChange}>
                  <Button className="flex space-x-4 ">
                    <PlusCircle className="h-4 w-4" />
                    <span>Filtrer</span>
                  </Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {currentFilter && (
            <div
              className="border-primary rounded-md border p-2"
              onClick={() => {
                router.push(pathname);
                setCurrentFilter("");
              }}
            >
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium">{currentFilter}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-m-1.5">
                    <button
                      type="button"
                      className="focus:none inline-flex rounded-md p-1.5 text-white focus:outline-none"
                    >
                      <span className="sr-only">Dismiss</span>
                      <XCircle className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* end filter parts */}

        {/* begin table parts */}
        <div id="organizations" className="mx-auto mt-4 w-full">
          <table className="border-primary flex flex-col rounded-lg border px-6 py-3">
            <thead>
              <tr className="flex items-center">
                {headerFormat?.map(
                  (item, index) =>
                    item?.isVisible && (
                      <th className="w-full p-1" key={"head " + item?.title + index}>
                        <div className="flex items-center justify-center">
                          {item?.title}

                          {item?.isSortable && (
                            <Button
                              onClick={() => {
                                const chekActualOrder = orderByParams?.includes("_ASC") ? "_DESC" : "_ASC";
                                const convertName =
                                  item.value?.replace(/([A-Z])/g, "_$1").toUpperCase() + chekActualOrder;
                                router.push(
                                  `${pathname}?orderBy=${convertName}${filterParams ? `&filter=${filterParams}` : ""}${
                                    firstParams ? `&first=${firstParams}` : ""
                                  }${offsetParams ? `&offset=${offsetParams}` : ""}`
                                );
                              }}
                              variant="ghost"
                              size="sm"
                              className="w-9 p-0"
                            >
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          )}
                        </div>
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody className="flex flex-col">
              {dataformat.map((row, index) => (
                <tr
                  className={`flex items-start ${!isRedirectStop?'hover:cursor-pointer':''}`}
                  onClick={() => {
                    !isRedirectStop && router.push(`${pathname}/${row?.slug}`);
                  }}
                  key={"row-" + index}
                >
                  {headerFormat?.map(
                    (item, index) =>
                      item?.isVisible && (
                        <td
                          className={`border-primary border-t ${
                            !isPending
                              ? "w-full p-2 text-center "
                              : "m-1  h-[2.05rem] w-full  animate-pulse rounded-lg bg-gray-200 opacity-20"
                          }`}
                          key={"data-" + item?.title + index}
                        >
                          {!isPending && row[item?.title]}
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {/* End table parts */}
          {/* Begin pagination parts */}
          <div id="Pagination" className="flex flex-row justify-between">
            <nav className="flex w-full items-center  justify-evenly px-4 py-3 sm:px-6" aria-label="Pagination">
              <div className="hidden sm:block">
                <p className="text-sm ">
                  Affichage{" "}
                  <span className="font-medium">
                    {!offsetParams || Number(offsetParams) < 2 ? 1 : Number(offsetParams) + 1}
                  </span>{" "}
                  à <span className="font-medium">{data?.length + Number(offsetParams)}</span> sur{" "}
                  <span className="font-medium">{totalCount}</span> résultats
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <Button
                  className=" relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={!pageInfo?.hasPreviousPage}
                  onClick={() => {
                    startTransition(() => {
                      const offSetPrev = currentPage <= 2 ? 0 : currentPage % 2 ? currentPage - 1 : currentPage - limit;
                      router.push(
                        `${pathname}?offset=${offSetPrev}${filterParams ? `&filter=${filterParams}` : ""}${
                          firstParams ? `&first=${firstParams}` : ""
                        }`
                      );
                    });

                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  className=" relative inline-flex items-center rounded-md border  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={!pageInfo?.hasNextPage}
                  onClick={() => {
                    startTransition(() => {
                      const offsetNext = currentPage % 2 ? currentPage + 1 : currentPage + limit;
                      router.push(
                        `${pathname}?offset=${offsetNext}${filterParams ? `&filter=${filterParams}` : ""}${
                          firstParams ? `&first=${firstParams}` : ""
                        }`
                      );
                    });
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <Select
                onValueChange={(value) => {
                  setLimit(Number(value));
                  router.push(
                    `${pathname}?first=${value}${filterParams ? `&filter=${filterParams}` : ""}${
                      offsetParams ? `&offset=${offsetParams}` : ""
                    }${filterParams ? `&filter=${filterParams}` : ""}`
                  );
                }}
              >
                <SelectTrigger className="w-34">
                  <SelectValue placeholder="Entrée par page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[2, 10, 25, 50, 100].map((value, index) => (
                      <SelectItem key={value + "-" + index} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </nav>
          </div>
          {/* End pagination parts */}
        </div>
      </motion.div>
    </>
  );
};