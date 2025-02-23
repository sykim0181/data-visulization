import { Table, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import CustomTableBody from "./CustomTableBody";
import useCustomTable from "../../../hooks/useCustomTable";

interface CustomTableProps<TData> extends React.HTMLAttributes<HTMLTableElement> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  height?: number;
  showHeader?: boolean;
  onClickRow?: (rowIndex: number) => void;
}

const CustomTable = <TData extends {}>(props: CustomTableProps<TData>) => {
  const { 
    data, 
    columns, 
    height,
    showHeader, 
    onClickRow,
    ...leftProps 
  } = props;

  const {
    tableContainerRef,
    table,
    rowVirtualizer
  } = useCustomTable({ data, columns });

  const { rows } = table.getRowModel();

  return (
    <div  
      ref={tableContainerRef}
      style={{ 
        position: 'relative',
        height: height ? `${height}px` : "300px",
        overflowY: "scroll" 
      }}
    >
      <Table {...leftProps}>
        {showHeader && (
          <TableHead style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: "white"
          }}>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow 
                key={headerGroup.id}
                style={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                  {headerGroup.headers.map((header) => {
                    const width = header.column.columnDef.meta?.width;
                    return (
                      <TableCell 
                        key={header.id}
                        style={{
                          display: 'flex',
                          width: width,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))}
          </TableHead>)}

        <CustomTableBody 
          rows={rows}
          rowVirtualizer={rowVirtualizer}
          onClickRow={onClickRow}
        />

        <TableFooter>
          {table.getFooterGroups().map(footerGroup => (
            <TableRow key={footerGroup.id}
              style={{
                display: 'flex',
                width: '100%',
              }}>
              {footerGroup.headers.map(header => {
                const width = header.column.columnDef.meta?.width;
                return (
                  <TableCell key={header.id} style={{
                    display: 'flex',
                    width: width,
                  }}>
                    {flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomTable;
