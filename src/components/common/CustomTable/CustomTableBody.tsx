import { TableBody } from "@mui/material";
import CustomTableBodyRow from "./CustomTableBodyRow";
import { Virtualizer } from "@tanstack/react-virtual";
import { Row } from "@tanstack/react-table";

interface CustomTableBodyProps<TData> {
  rows: Row<TData>[];
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  onClickRow?: (rowIndex: number) => void;
}

const CustomTableBody = <TData extends {}>(props: CustomTableBodyProps<TData>) => {
  const { rows, rowVirtualizer, onClickRow } = props;

  return (
    <TableBody style={{
      height: `${rowVirtualizer.getTotalSize()}px`,
      position: 'relative'
    }}>
      {rowVirtualizer.getVirtualItems().map(virtualRow => {
        const row = rows[virtualRow.index] as Row<TData>;
        return (
          <CustomTableBodyRow 
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
            onClick={onClickRow ? () => onClickRow(virtualRow.index) : undefined}
          />
        );
      })}
    </TableBody>
  );
};

export default CustomTableBody;
