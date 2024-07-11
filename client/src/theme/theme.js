import { createTheme } from "@mui/material";
import { mainBg, onlineColor, textColorInDark } from "../constants/color";

export const theme = createTheme({
  palette: {
    primary: {
      main: mainBg,
      light: "#046b87",
    },
    secondary: {
      main: "#2b689d",
      light: "",
    },

    primaryLight: {},
    light: {
      main: "#fff",
    },
    gray: {
      main: "#bbbbbb",
    },
    dark: {
      main: "#3f3f3f",
    },
  },
});
