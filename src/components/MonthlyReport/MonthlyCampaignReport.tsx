import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

import MonthlyCampaignTable from "./MonthlyCampaignTable";
import { Campaign } from "../../types";
import CustomPieChart from "../common/CustomPieChart";
import LazyComponent from "../common/LazyComponent";

const availbleCriteria = ["revenue", "complete"] as const;
export type Criteria = (typeof availbleCriteria)[number];

interface MonthlyCampaignReportProps {
  campaigns: Campaign[];
}

const MonthlyCampaignReport = (props: MonthlyCampaignReportProps) => {
  const { campaigns } = props;

  const [criteria, setCriteria] = useState<Criteria>("revenue");

  const onSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as Criteria;
    setCriteria(selectedValue);
  }

  const sortedData = 
    criteria === "complete" 
    ? campaigns.sort((a,b) => b.Complete - a.Complete) 
    : campaigns.sort((a,b) => b.Revenue - a.Revenue); 

  const chartData = sortedData.map(campaign => ({
    name: campaign.CampaignName,
    value: criteria === "complete" ? campaign.Complete : campaign.Revenue
  }));

  const chartTooltipValueFormatter = (value: number) => {
    const result = value.toLocaleString();
    return criteria === "complete" ? `${result}명` : `${result}원`;
  }

  return (
    <div>
      <h2>캠페인 별 성과</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <FormControl size="small">
          <Select 
            label="정렬 기준"
            value={criteria}
            defaultValue="revenue"
            onChange={onSelectChange}
          >
            <MenuItem value="revenue">수익</MenuItem>
            <MenuItem value="complete">참여자</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <h3>{criteria === "complete" ? "캠페인 별 참여자 수 비율" : "캠페인 별 수익 비율"}</h3>
        <div style={{
          width: '100%',
          height: '400px'
        }}>
          <CustomPieChart
            data={chartData} 
            minPercent={0.01} 
            valueFormatter={chartTooltipValueFormatter}
          />
        </div>
      </div>

      <LazyComponent threshold={0.1}>
        <MonthlyCampaignTable campaigns={sortedData} />
      </LazyComponent>
    </div>
  );
};

export default MonthlyCampaignReport;
