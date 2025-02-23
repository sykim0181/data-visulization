import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";

interface useCustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

const useCustomTable = <TData extends {}>(props: useCustomTableProps<TData>) => {
  const { data, columns } = props;

  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    if (tableContainerRef.current) {
      setScrollElement(tableContainerRef.current);
    }
  }, []);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 20,
    measureElement:
    typeof window !== 'undefined' &&
    navigator.userAgent.indexOf('Firefox') === -1
      ? element => element?.getBoundingClientRect().height
      : undefined,
    overscan: 5,
  });

  return {
    tableContainerRef,
    table,
    rowVirtualizer
  }
};

export default useCustomTable;