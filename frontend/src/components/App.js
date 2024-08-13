import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./HomePage";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2', // Customize primary color
    },
    secondary: {
      main: '#00c853', // Customize secondary color
    },
    info:
    {
      main: '#1b4670', // Customize info color
    },
  }
});

const App = () => {
  return (
    <div className="center">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

const appDiv = document.getElementById("app");

if (appDiv) {
  const root = createRoot(appDiv);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

