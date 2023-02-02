interface DataRow {
  [key: string]: any;
}

interface iData {
  Nom: string;
  Lieu: string;
  "Commence le": string;
  "Debut inscription": string;
  "Fin inscription": string;
  Participants: number;
}

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
