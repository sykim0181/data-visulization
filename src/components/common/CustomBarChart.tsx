import { Card } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface CustomBarChartProps {
  data: { name: string, value: number }[];
  valueFormatter?: (value: number) => string;
}

const CustomBarChart = (props: CustomBarChartProps) => {
  const { data, valueFormatter } = props;

  const getCustomToolTip = (
    payload: Payload<ValueType, NameType>[] | undefined,
    active: boolean | undefined,
  ) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const valueStr = value !== undefined ? valueFormatter?.(Number(value)) : "";

      return (
        <Card variant="outlined" 
          style={{ padding: '10px 15px' }}
        >
          <p>{valueStr}</p>
        </Card>
      );
    }
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        width={730} 
        height={400} 
        data={data} 
        margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => value.toLocaleString()} />
        <Tooltip content={({ payload, active }) => getCustomToolTip(payload, active)}/>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>   
    </ResponsiveContainer>
  );
};

export default CustomBarChart;