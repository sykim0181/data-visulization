import { createColumnHelper, HeaderContext } from "@tanstack/react-table";
import { Payment, Status } from "../../types";
import CustomTable from "../common/CustomTable/CustomTable";
import { getStatusMessage } from "../../utils";

type TMonth = {
  month: number;
  complete: number;
  revenue: number;
  commission: number;
  status: Status;
}

const columnHelper = createColumnHelper<TMonth>();

const getFooter = (accessor: string) => {
  return (info: HeaderContext<TMonth, number>) => {
    const total = info.table.getPrePaginationRowModel()
      .rows.reduce((sum, row) => sum + (row.getValue(accessor) as number), 0);
    return total.toLocaleString();
  }
}

const columns = [
  columnHelper.accessor("month", { 
    header: "월",
    meta: { width: "10%" }
  }),
  columnHelper.accessor("complete", { 
    header: "참여자 수",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "25%" },
    footer: getFooter("complete")
  }),
  columnHelper.accessor("commission", { 
    header: "수수료",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "25%" },
    footer: getFooter("commission")
  }),
  columnHelper.accessor("revenue", { 
    header: "수익",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "25%" },
    footer: getFooter("revenue")
  }),
  columnHelper.accessor("status", { 
    header: "상태",
    cell: info => getStatusMessage(info.getValue()),
    meta: { width: "15%" }
  }),
];

interface YearlyDataTableProps {
  data: Payment;
}

const YearlyDataTable = (props: YearlyDataTableProps) => {
  const { data } = props;

  const tableData = data.Monthly.map((month, index) => ({
    month: index + 1, 
    complete: month.Complete,
    revenue: month.Revenue,
    commission: month.Commission,
    status: month.Status
  }));

  return (
    <div>
      <h2>월 별 성과</h2>
      <CustomTable 
        data={tableData} 
        columns={columns}
        height={500}
        showHeader
      />
    </div>
  );
};

export default YearlyDataTable;
