import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main className="content">
        <div className="app">App</div>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App