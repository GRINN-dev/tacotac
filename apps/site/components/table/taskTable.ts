import { DataRow, iData, iHeader } from "@/types/filter";

const formatData = (header: iHeader[], rawData: any[]) => {
  const data: DataRow[] = rawData?.map((row) => {
    const dataRow: DataRow = {};
    header?.forEach((item) => {
      dataRow[item?.title] = row[item?.title];
    });
    return dataRow;
  });

  return { header, data };
};

export default formatData;
