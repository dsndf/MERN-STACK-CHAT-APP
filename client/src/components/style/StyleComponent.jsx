import { Box, Button, IconButton, ListItem, Paper, styled } from "@mui/material";
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
export const StyledChatListColumn = styled(Box)({
  flex: 1,
  height: "calc(100vh - 4rem)",
  overflowY:"scroll",

});
export const StyledChatColumn = styled(Box)({
  // backgroundColor:"skyblue",
  height: "calc(100vh - 4rem)",
  flex: 2,

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
  backgroundColor:"white",
  width:"100%"
});

export const StyledChatFormInputBox = styled('input')({
  width:"100%",
  padding:"1rem",
  paddingLeft:"3rem",
  borderRadius:"35px",
  border:"none",
  backgroundColor:inputGray,
  "&:focus":{
    outline:"none"
  },
  fontSize:"15px"
})

export const StyledLink = styled(Link)({
  textDecoration:"none"
})

export const AdminStyledPaper = styled(Paper)(({theme})=>( {
  borderRadius:"5px",
  padding:"15px"
}))