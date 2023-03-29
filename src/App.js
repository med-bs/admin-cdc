import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Calendar from "./scenes/Calendar";
import ClientForm from "./scenes/ClientForm";
import Dashboard from "./scenes/Dashboard";
import SideBar from "./scenes/global/SideBar";
import TopBar from "./scenes/global/TopBar";
import Invoices from "./scenes/Invoices";
import Team from "./scenes/Team.jsx";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <SideBar />
          <CssBaseline />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<ClientForm />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App