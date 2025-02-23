import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material';

import './App.css';
import MonthlyReport from './pages/MonthlyReport';
import Home from './pages/Home';
import YearlyReport from './pages/YearlyReport';
import MainLayout from './layout/MainLayout';
import Pretendard from './fonts/PretendardVariable.ttf';

const queryClient = new QueryClient();

const materialTheme = createTheme({
  typography: {
    fontFamily: "'Pretendard'"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pretendard';
          font-display: 'swap';
          src: url(${Pretendard}) format('truetype');
        }
      `
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={materialTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/monthly-report" element={<MonthlyReport />} />
                  <Route path="/yearly-report" element={<YearlyReport />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </LocalizationProvider>      
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
