import { Card, Grid2 } from "@mui/material";
import { Link } from "react-router";

interface MenuCardProps {
  title: string;
  href: string;
}

const MenuCard = (props: MenuCardProps) => {
  const { title, href } = props;

  return (
    <Grid2
      size={{
        xs: 3,
        md: 4,
        lg: 5,
      }}
    >
      <Card variant="outlined" style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Link to={href} style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <p style={{
            fontSize: "1.3em",
            display: "flex",
            alignItems: "center"
          }}>{title}</p>
        </Link>
      </Card>
    </Grid2>
  );
};

export default MenuCard;
