import React from "react";

interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
}

interface TableRow {
  [key: string]: string | number;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = React.memo(({
  columns,
  data,
  className = ""
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`text-${column.align || 'left'} text-sm font-medium text-gray-500 pb-3`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-100">
              {columns.map((column) => (
                <td 
                  key={column.key}
                  className={`py-3 text-sm ${
                    column.align === 'right' 
                      ? 'text-right font-medium text-gray-900' 
                      : column.key === columns[0].key 
                        ? 'text-gray-900' 
                        : 'text-gray-600'
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

DataTable.displayName = "DataTable";
