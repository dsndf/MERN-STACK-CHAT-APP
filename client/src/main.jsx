import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseLine from "@mui/material/CssBaseline";
import "./global.css";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      {" "}
      <HelmetProvider>
        <CssBaseLine />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  // {/* </React.StrictMode> */}
);
