import { createTheme } from "@mui/material";
import { mainBg, onlineColor, textColorInDark } from "../constants/color";

export const theme = createTheme({
    palette: {
        primary: {
            main: mainBg,
        },
        secondary:{
            main:"#2b689d"
        },
        primaryLight: {
            main: "#ebd4f1"
        }
        ,
        light: {
            main: "#fff"
        },
        gray: {
            main: "#bbbbbb"
        }
        ,
        dark:{
            main:"#3f3f3f"
        }
    },


})