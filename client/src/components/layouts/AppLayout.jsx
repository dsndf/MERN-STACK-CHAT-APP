import {
  StyledChatListColumn,
  StyledProfileColumn,
} from "../style/StyleComponent";
import Footer from "./Footer";
import Header from "./Header";
import { Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const theme = useTheme();
    const {id} = useParams(); 
   
    return (
      <>
        <Header />
        <Stack direction={"row"} spacing={1}>
          <StyledChatListColumn>
            <ChatList activeChatId={id}  />
          </StyledChatListColumn>
          <WrappedComponent {...props} />
          <StyledProfileColumn>
            <Profile />
          </StyledProfileColumn>
        </Stack>
        <Footer />
      </>
    );
  };
};
export default AppLayout;
