import { Card } from "@mui/material";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

type TData = {
  name: string;
  value: number;
};

/**
 * minPercent: 해당 값보다 작은 파이는 라벨이 보이지 않음 (예: 0.01)
 */
interface CustomPieChartProps {
  data: TData[];
  minPercent: number;
  valueFormatter?: (value: number) => string;
}

const CustomPieChart = (props: CustomPieChartProps) => {
  const { data, minPercent, valueFormatter } = props;

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, index }: {
    cx: number;
    cy: number;
    midAngle: number;
    percent: number;
    outerRadius: number;
    index: number;
  }) => {
    if (percent < minPercent) {
      return <></>;
    }

    const RADIAN = Math.PI / 180;

    const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {data[index].name}
      </text>
    );
  };

  const renderCustomLabelLine = ({ cx, cy, midAngle, outerRadius, percent }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
  }) => {
    if (percent < minPercent) {
      return <></>;
    }

    const RADIAN = Math.PI / 180;
    const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const x2 = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
    const y2 = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={1} />
    );
  };

  const getCustomToolTip = (
    payload: Payload<ValueType, NameType>[] | undefined,
    active: boolean | undefined,
  ) => {
    if (active && payload && payload.length) {
      const total = data.reduce((acc, entry) => acc + entry.value, 0);
      const value = payload[0].value;
      const valueStr = value !== undefined ? valueFormatter?.(Number(value)) : "";
      const percentageStr = value !== undefined 
        ? `${((Number(value) / total) * 100).toFixed(2)}%` 
        : "?"; 

      return (
        <Card variant="outlined" 
          style={{ padding: '10px 15px' }}
        >
          <p>{payload[0].name}</p>
          <p>{valueStr}</p>
          <p>{`비율: ${percentageStr}`}</p>
        </Card>
      );
    }
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={({ payload, active }) => getCustomToolTip(payload, active)}/>
        <Pie
          data={data} 
          dataKey="value" 
          nameKey="name"
          cx="50%" 
          cy="50%"
          outerRadius={100}
          label={renderCustomLabel}
          labelLine={renderCustomLabelLine}
          fill="#F68EAB"
        >
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
