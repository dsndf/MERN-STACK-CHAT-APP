import { createTheme } from "@mui/material";
import { mainBg, onlineColor, textColorInDark } from "../constants/color";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ac00c3',
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