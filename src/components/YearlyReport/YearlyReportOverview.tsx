import { Grid2 } from "@mui/material";
import { PaymentCommonAttribute } from "../../types";
import OverviewCard from "../common/OverviewCard";

interface YearlyReportOverviewProps extends PaymentCommonAttribute {
}

const YearlyReportOverview = (props: YearlyReportOverviewProps) => {
  const { Revenue, Commission, Complete } = props;

  return (
    <Grid2 container spacing={2}>
      <OverviewCard size={4}
        title="총 수익"
        data={`${Revenue.toLocaleString()}원`}
      />
      <OverviewCard size={4}
        title="총 수수료"
        data={`${Commission.toLocaleString()}원`}
      />
      <OverviewCard size={4}
        title="총 캠페인 참여자 수"
        data={`${Complete.toLocaleString()}명`}
      />
    </Grid2>
  );
};

export default YearlyReportOverview;