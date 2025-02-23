import { useMemo } from "react";
import { CircularProgress } from "@mui/material";

import usePaymentQuery from "../../hooks/usePaymentQuery";
import YearlyReportOverview from "./YearlyReportOverview";
import CustomBarChart from "../common/CustomBarChart";
import YearlyDataTable from "./YearlyDataTable";
import MainDivider from "../common/MainDivider";
import LazyComponent from "../common/LazyComponent";

interface YearlyReportContentProps {
  year: number;
}

const YearlyReportContent = (props: YearlyReportContentProps) => {
  const { year } = props;

  const {
    data,
    isFetching,
    isError,
    error
  } = usePaymentQuery({ year });

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
      const monthly = data.Monthly;
      const revenueChartData = monthly.map((month, index) => ({
        name: `${index + 1}월`,
        value: month.Revenue
      }));
      const completeChartData = monthly.map((month, index) => ({
        name: `${index + 1}월`,
        value: month.Complete
      }));

      return (
        <>
          <YearlyReportOverview Revenue={data.Revenue} Commission={data.Commission} Complete={data.Complete} />

          <MainDivider />

          <div>
            <h2>월 별 수익</h2>
            <div style={{
              width: '100%',
              height: '400px'
            }}>
              <CustomBarChart 
                data={revenueChartData} 
                valueFormatter={value => `${value.toLocaleString()}원`}
              />
            </div>
          </div>

          <MainDivider />

          <div>
            <h2>월 별 참여 수</h2>
            <div style={{
              width: '100%',
              height: '400px'
            }}>
              <CustomBarChart 
                data={completeChartData} 
                valueFormatter={value => `${value.toLocaleString()}회`}
              />
            </div>
          </div>

          <MainDivider />

          <LazyComponent threshold={0.1}>
            <YearlyDataTable data={data} />
          </LazyComponent>
        </>
      );
    }
  }, [data, isFetching, isError, error]);

  return (
    <div>
      <h2>{`${year}년`}</h2>
      {Content}
    </div>
  );
};

export default YearlyReportContent;