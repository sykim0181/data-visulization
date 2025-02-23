import { Link, Outlet } from "react-router";
import { HomeRounded } from '@mui/icons-material';

const MainLayout = () => {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center"
    }}>
      <div 
        style={{
          maxWidth: "1024px",
          width: '100%',
      }}>
        <header 
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px"
        }}>
          <Link to={"/"}>
            <HomeRounded style={{ fontSize: "2em" }} />
          </Link>
        </header>

        <main 
          style={{
            minHeight: 'calc(100vh - 50px - 70px)',
            padding: "0 20px"
        }}>
          <article style={{ width: "100%" }}>
            <Outlet />
          </article>
        </main>
        
        <footer 
          style={{
            display: 'flex',
            gap: '10px',
            color: "#ABABAB",
            height: '70px',
            boxSizing: 'border-box',
            padding: "0 20px",
            alignItems: "center",
            fontSize: "0.8em"
        }}>
          <p>김소연</p>
          <p>soyeon364@naver.com</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;