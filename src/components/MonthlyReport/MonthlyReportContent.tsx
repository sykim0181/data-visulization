import { useMemo } from "react";
import { CircularProgress } from "@mui/material";

import MonthlyReportOverview from "./MonthlyReportOverview";
import MonthlyCampaignReport from "./MonthlyCampaignReport";
import MonthlyAppReport from "./MonthlyAppReport";
import { Campaign } from "../../types";
import usePaymentQuery from "../../hooks/usePaymentQuery";
import MainDivider from "../common/MainDivider";
import LazyComponent from "../common/LazyComponent";

interface MonthlyReportContentProps {
  year: number;
  month: number;
}

const MonthlyReportContent = (props: MonthlyReportContentProps) => {
  const { year, month } = props;

  const { 
    data, 
    isFetching, 
    isError, 
    error 
  } = usePaymentQuery({ year, month });

  const Content = useMemo(() => {
    if (isError) {
      return (
        <>
          <p>데이터를 불러오지 못했습니다.</p>
          <p>{error?.message}</p>
        </>
      );
    }
    if (isFetching) {
      return (
        <div style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "center",
          padding: "20px" 
        }}>
          <CircularProgress style={{ color: "#F68EAB" }} />
        </div>
      );
    }
    if (data) {
      let campaigns: Campaign[] = [];
      data.Monthly[0].App.forEach(app => {
        campaigns = [...campaigns, ...app.Campaign];
      });

      return (
        <>
          <MonthlyReportOverview  
            Revenue={data.Revenue} 
            Commission={data.Commission} 
            Complete={data.Complete}
            status={data.Monthly[0].Status}
          />

          <MainDivider />

          <MonthlyCampaignReport campaigns={campaigns} />

          <MainDivider />

          <LazyComponent threshold={0.1}>
            <MonthlyAppReport apps={data.Monthly[0].App} />
          </LazyComponent>
        </>
      );
    }
  }, [data, isFetching, isError, error]);

  return (
    <div>
      <h2>{`${year}년 ${month}월`}</h2>
      {Content}
    </div>
  );
};

export default MonthlyReportContent;