import React, { FC } from "react";

interface SimpleCollectionProps {
  arrayList: any[];
}

const SimpleCollection: FC<SimpleCollectionProps> = ({ arrayList }) => {
  const tableHeaders = Object.keys(arrayList[0]);
  const tableRows = arrayList?.map((item, index) => (
    <tr key={index}>
      {tableHeaders.map((header, index) => (
        <td key={index} className="relative border-t py-4 pl-4 pr-3 text-sm sm:pl-6">
          {item[header]}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="-mx-4 rounded-lg ring-1 ring-gray-300 sm:mx-0">
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default SimpleCollection;
