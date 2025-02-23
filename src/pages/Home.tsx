import Grid from '@mui/material/Grid2';

import "../style/Home.css"
import MenuCard from '../components/common/MenuCard';

const Home = () => {
  return (
    <>
      <h1 style={{ marginBottom: "50px" }}>광고 정산 데이터 리포트</h1>

      <Grid 
        container 
        className="menu_container"
        spacing={5}
      >
        <MenuCard href="/yearly-report" title="연간 리포트" />
        <MenuCard href="/monthly-report" title="월간 리포트" />
      </Grid>
    </>
  );
};

export default Home;
