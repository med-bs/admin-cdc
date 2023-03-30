import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Bar from "./scenes/Bar";
import Calendar from "./scenes/Calendar";
import ClientForm from "./scenes/ClientForm";
import Contacts from "./scenes/Contacts";
import Dashboard from "./scenes/Dashboard";
import FAQ from "./scenes/FAQ";
import Geography from "./scenes/Geography";
import SideBar from "./scenes/global/SideBar";
import TopBar from "./scenes/global/TopBar";
import Invoices from "./scenes/Invoices";
import Line from "./scenes/Line";
import Pie from "./scenes/Pie";
import Team from "./scenes/Team.jsx";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const location = useLocation();
  const showBars = !['/a', '/b'].includes(location.pathname);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="app">
          {showBars && <SideBar />}
          {showBars && <CssBaseline />}
          <main className="content">
            {showBars && <TopBar />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<ClientForm />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App