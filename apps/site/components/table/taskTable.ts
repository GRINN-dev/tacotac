import { iData } from "@/types/filter";

interface DataRow {
  [key: string]: any;
}
console.log("new compo");

const formatData = (header: string[], rawData: iData[]) => {
  const data: DataRow[] = rawData?.map((row) => {
    const dataRow: DataRow = {};
    header?.forEach((item) => {
      dataRow[item] = row[item];
    });
    return dataRow;
  });

  return { header, data };
};

export default formatData;
