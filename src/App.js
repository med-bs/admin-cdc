import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";

import TopBar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";

import Dashboard from "./scenes/Dashboard";

import Bar from "./scenes/Bar";
import Geography from "./scenes/Geography";
import Line from "./scenes/Line";
import Pie from "./scenes/Pie";

import SignIn from "./auth/SignIn";

import ConnectorForm from "./scenes/cdc/ConnectorForm";
import Connectors from "./scenes/cdc/Connectors";
import Connector from "./scenes/cdc/Connector";

function App() {
  const location = useLocation();
  const showBars = !['/signin', '/signup'].includes(location.pathname);
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

              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/geography" element={<Geography />} />

              <Route path="/connectors" element={<Connectors />} />
              <Route path="/connector/:connectorName" element={<Connector />} />
              <Route path="/addconnectors" element={<ConnectorForm />} />

              <Route path="/signin" element={<SignIn />} />

              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App