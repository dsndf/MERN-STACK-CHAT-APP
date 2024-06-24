import {
  Box,
  Button,
  IconButton,
  ListItem,
  Paper,
  styled,
} from "@mui/material";
import { inputGray, mainBg } from "../../constants/color";
import { Link } from "react-router-dom";
export const VisuallyHiddenInput = styled("input")({
  border: "1px solid red",
  position: "absolute",
  width: 100,
  clip: "rect(0px, 49px, 20px, 29px )",
  left: 155,
  bottom: 0,
  opacity: 0,
  zIndex: 10,
  cursor: "pointer",
});
export const AppButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.otherColor.main,
  m: 3,
  color: "white",
}));
export const StyledChatListColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "calc(100vh - 4rem)",
  overflow: "auto",

  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));
export const StyledChatColumn = styled(Box)({
  height: "calc(100vh - 4rem)",
  flex: 2,
  padding: 0,
});
export const StyledHomeColumn = styled(Box)({
  height: "calc(100vh - 4rem)",
  flex: 2,
  padding: 0,
  backgroundColor:"beige"
});

export const StyledProfileColumn = styled(Box)({
  backgroundColor: "black",
  flex: 1,
});

export const StyledAddFriendButton = styled(IconButton)({
  color: "white",
  backgroundColor: mainBg,
});

export const StyledChatForm = styled("form")({
  position: "absolute",
  bottom: "0",
  height: "4rem",
  padding: "0.5rem",
  backgroundColor: "white",
  width: "100%",
});

export const StyledChatFormInputBox = styled("input")({
  width: "100%",
  padding: "1rem",
  paddingLeft: "3rem",
  borderRadius: "35px",
  border: "none",
  backgroundColor: inputGray,
  "&:focus": {
    outline: "none",
  },
  fontSize: "15px",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const AdminStyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "5px",
  padding: "5px",
}));

export const StyledOnlineEffect = styled(Box)({
  position: "absolute",
  borderRadius: "100%",
  width: "100%",
  height: "100%",
  backgroundColor: "#00540040",
  animationName: "online-effect",
  animationDuration: "1.5s",
  animationIterationCount: "infinite",
  animationDirection: "normal",
  animationFillMode: "forwards",
  zIndex: 1,
});
