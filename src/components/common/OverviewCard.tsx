import { Card, Grid2 } from "@mui/material";

interface OverviewCardProps {
  title: string;
  data: string;
  size: number;
}

const OverviewCard = (props: OverviewCardProps) => {
  const { title, data, size } = props;

  return (
    <Grid2 size={size}>
      <Card 
        variant="outlined" 
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p style={{ fontWeight: 'bold' }}>
          {title}
        </p>
        <p>{data}</p>
      </Card>
    </Grid2>
  );
};

export default OverviewCard;