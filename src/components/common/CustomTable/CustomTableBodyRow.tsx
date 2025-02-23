import { TableCell, TableRow } from "@mui/material";
import { flexRender, Row } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

interface CustomTableBodyRowProps<TData> {
  row: Row<TData>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  onClick?: () => void;
}

const CustomTableBodyRow = <TData extends {}>(props: CustomTableBodyRowProps<TData>) => {
  const { row, virtualRow, rowVirtualizer, onClick } = props;

  const onClickRow = () => {
    onClick?.();
  }

  return (
    <>
      <TableRow
        data-index={virtualRow.index}
        ref={node => rowVirtualizer.measureElement(node)}
        key={row.id} 
        onClick={onClickRow}
        style={{
          display: 'flex',
          position: 'absolute',
          transform: `translateY(${virtualRow.start}px)`,
          width: '100%',
          cursor: onClick ? "pointer" : "auto"
        }}
      >
        {row.getVisibleCells().map((cell) => {
          const width = cell.column.columnDef.meta?.width;
          return (
            <TableCell
              key={cell.id}
              style={{
                display: 'flex',
                width: width,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
        
      </TableRow>
    </>
  );
}

export default CustomTableBodyRow;
