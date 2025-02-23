import { Dayjs } from "dayjs";
import { useState } from "react";

import DateContext from "../context/DateContext";
import ReportDatePicker from "../components/common/ReportDatePicker";
import MonthlyReportContent from "../components/MonthlyReport/MonthlyReportContent";
import MainDivider from "../components/common/MainDivider";

const MonthlyReport = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <DateContext.Provider value={{ date, setDate }}>     
      <h1>월간 리포트</h1>

      <ReportDatePicker 
        views={["year", "month"]}
      />

      {date && (
        <>
          <MainDivider />
          <MonthlyReportContent year={date.year()} month={date.month() + 1} />
        </>
      )}
    </DateContext.Provider>
  );
};

export default MonthlyReport;
