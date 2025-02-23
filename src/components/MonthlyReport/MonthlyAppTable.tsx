import { createColumnHelper, HeaderContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { App } from "../../types";
import CustomTable from "../common/CustomTable/CustomTable";
import MonthlyAppCampaignReport from "./MonthlyAppCampaignReport";
import { Criteria } from "./MonthlyAppReport";

export type TApp = {
  name: string;
  complete: number;
  commission: number;
  revenue: number;
};

const columnHelper = createColumnHelper<TApp>();

const getFooter = (accessor: string) => {
  return (info: HeaderContext<TApp, number>) => {
    const total = info.table.getPrePaginationRowModel()
      .rows.reduce((sum, row) => sum + (row.getValue(accessor) as number), 0);
    return total.toLocaleString();
  }
}

const columns = [
  columnHelper.accessor("name", {
    header: "앱 명",
    meta: { width: "40%" },
  }),
  columnHelper.accessor("complete", { 
    header: "참여자 수",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "20%" },
    footer: getFooter("complete")
  }),
  columnHelper.accessor("commission", { 
    header: "수수료",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "20%" },
    footer: getFooter("commission")
  }),
  columnHelper.accessor("revenue", { 
    header: "수익",
    cell: info => info.getValue().toLocaleString(),
    meta: { width: "20%" },
    footer: getFooter("revenue")
  }),
];

interface MonthlyAppTableProps {
  apps: App[];
  criteria: Criteria;
}

const MonthlyAppTable = (props: MonthlyAppTableProps) => {
  const { apps, criteria } = props;

  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  
  const data = apps.map(app => ({
    name: app.AppName,
    complete: app.Complete,
    commission: app.Commission,
    revenue: app.Revenue
  }));

  const AppTable = useMemo(() => {
    const onClickRow = (rowIndex: number) => {
      const app = apps[rowIndex];
      setSelectedApp(app);
    }

    return (
      <div>
        <h3>앱 별 완료 건수 & 수익</h3>
        <p 
          style={{
            color: "#ABABAB",
            fontSize: "0.8em"
          }}>
            행을 누르면 해당 앱의 캠페인 데이터를 볼 수 있습니다.
        </p>

        <CustomTable
          data={data} 
          columns={columns} 
          showHeader
          onClickRow={onClickRow}
        />
      </div>
    );
  }, [data, apps]);

  return (
    <>
      {AppTable}

      {selectedApp && (
        <MonthlyAppCampaignReport 
          app={selectedApp} 
          criteria={criteria} 
        />
      )}
    </>
  );
};

export default MonthlyAppTable;
