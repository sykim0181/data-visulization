import { useMemo, useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import MonthlyAppTable from "./MonthlyAppTable";
import { App } from "../../types";
import CustomPieChart from "../common/CustomPieChart";

const availbleCriteria = ["revenue", "complete"] as const;
export type Criteria = (typeof availbleCriteria)[number];

interface MonthlyAppReportProps {
  apps: App[];
}

const MonthlyAppReport = (props: MonthlyAppReportProps) => {
  const { apps } = props;

  const [criteria, setCriteria] = useState<Criteria>("revenue");

  const onSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as Criteria;
    setCriteria(selectedValue);
  }

  const data = useMemo(() => {
    switch(criteria) {
      case "revenue": {
        return apps.sort((a,b) => b.Revenue - a.Revenue);
      }
      case "complete": {
        return apps.sort((a,b) => b.Complete - a.Complete);
      }
      default: {
        return apps.sort((a,b) => b.Revenue - a.Revenue);
      }
    }
  }, [apps, criteria]);

  const chartData = apps.map(app => ({
    name: app.AppName,
    value: criteria === "complete" ? app.Complete : app.Revenue
  }));

  const chartTooltipValueFormatter = (value: number) => {
    const result = value.toLocaleString();
    return criteria === "complete" ? `${result}명` : `${result}원`;
  }

  return (
    <div>
      <h2>앱 별 성과</h2>

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
        <h3>{criteria === "complete" ? "앱 별 참여자 비율" : "앱 별 수익 비율"}</h3>
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

      <MonthlyAppTable apps={data} criteria={criteria} />
    </div>
  );
}

export default MonthlyAppReport;
