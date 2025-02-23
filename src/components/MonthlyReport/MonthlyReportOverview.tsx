import { Grid2 } from "@mui/material";
import { PaymentCommonAttribute, Status } from "../../types";
import { getStatusMessage } from "../../utils";
import OverviewCard from "../common/OverviewCard";

interface MonthlyReportOverviewProps extends PaymentCommonAttribute {
  status: Status;
};

const MonthlyReportOverview = (props: MonthlyReportOverviewProps) => {
  const { Revenue, Commission, Complete, status } = props;

  return (
    <Grid2 container spacing={2}>
      <OverviewCard size={3}
        title="총 수익"
        data={`${Revenue.toLocaleString()}원`}
      />
      <OverviewCard size={3}
        title="총 수수료"
        data={`${Commission.toLocaleString()}원`}
      />
      <OverviewCard size={3}
        title="총 캠페인 참여자 수"
        data={`${Complete.toLocaleString()}명`}
      />
      <OverviewCard size={3}
        title="상태"
        data={getStatusMessage(status)}
      />
    </Grid2>
  );
};

export default MonthlyReportOverview;
