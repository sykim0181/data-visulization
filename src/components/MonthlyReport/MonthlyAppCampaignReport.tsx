import { createColumnHelper, HeaderContext } from "@tanstack/react-table";
import { useMemo } from "react";

import { App } from "../../types";
import CustomTable from "../common/CustomTable/CustomTable";
import { Criteria } from "./MonthlyAppReport";

export type TCampaign = {
  name: string;
  complete: number;
  commission: number;
  revenue: number;
}

const columnHelper = createColumnHelper<TCampaign>();

const getFooter = (accessor: string) => {
  return (info: HeaderContext<TCampaign, number>) => {
    const total = info.table.getPrePaginationRowModel()
      .rows.reduce((sum, row) => sum + (row.getValue(accessor) as number), 0);
    return total.toLocaleString();
  }
}

const columns = [
  columnHelper.accessor("name", {
    header: "캠페인 명",
    meta: { width: "40%" }
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

interface MonthlyAppCampaignReportProps {
  app: App;
  criteria: Criteria;
}

const MonthlyAppCampaignReport = (props: MonthlyAppCampaignReportProps) => {
  const { app, criteria } = props;

  const data = useMemo(() => {
    const campaigns = app.Campaign.map(campaign => ({
      name: campaign.CampaignName,
      complete: campaign.Complete,
      commission: campaign.Commission,
      revenue: campaign.Revenue
    }));

    switch(criteria) {
      case "revenue": {
        return campaigns.sort((a,b) => b.revenue - a.revenue);
      }
      case "complete": {
        return campaigns.sort((a,b) => b.complete - a.complete);
      }
      default: {
        return campaigns.sort((a,b) => b.revenue - a.revenue);
      }
    }
  }, [app, criteria]);

  return (
    <div>
      <h3>{`${app.AppName}의 캠페인`}</h3>
      <CustomTable
        data={data} 
        columns={columns} 
        showHeader
      />
    </div>
  );
}

export default MonthlyAppCampaignReport;