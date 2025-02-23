import { Dayjs } from "dayjs";
import { useState } from "react";

import DateContext from "../context/DateContext";
import ReportDatePicker from "../components/common/ReportDatePicker";
import YearlyReportContent from "../components/YearlyReport/YearlyReportContent";
import MainDivider from "../components/common/MainDivider";

const YearlyReport = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  
  return (
    <DateContext.Provider value={{ date, setDate }}>
      <h1>연간 리포트</h1>

      <ReportDatePicker views={["year"]} />

      {date && (
        <>
          <MainDivider />
          <YearlyReportContent year={date.year()} />
        </>
      )}
    </DateContext.Provider>
  );
};

export default YearlyReport;
