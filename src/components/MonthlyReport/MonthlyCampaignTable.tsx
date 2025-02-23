import { createColumnHelper } from "@tanstack/react-table";
import { HeaderContext } from "@tanstack/react-table";

import { Campaign } from "../../types";
import CustomTable from "../common/CustomTable/CustomTable";

type TCampaign = {
  name: string;
  complete: number;
  commission: number;
  revenue: number;
};

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

interface MonthlyCampaignTableProps {
  campaigns: Campaign[];
}

const MonthlyCampaignTable = (props: MonthlyCampaignTableProps) => {
  const { campaigns } = props;

  const data = campaigns.map(campaign => ({
    name: campaign.CampaignName,
    complete: campaign.Complete,
    commission: campaign.Commission,
    revenue: campaign.Revenue,
  }));

  return (
    <div>
      <h3>캠페인 별 완료 건수 & 수익</h3>
      <CustomTable data={data} columns={columns} showHeader />
    </div>
  );
};

export default MonthlyCampaignTable;