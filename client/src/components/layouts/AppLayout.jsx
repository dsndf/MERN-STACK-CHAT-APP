import {
  StyledChatListColumn,
  StyledProfileColumn,
} from "../style/StyleComponent";
import Footer from "./Footer";
import Header from "./Header";
import { Drawer, Stack } from "@mui/material";

import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import { useGetMyChatsQuery } from "../../redux/api/query";
import { useDialog } from "../../hooks/useDialog";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const { data, error, refetch, isLoading } = useGetMyChatsQuery();
    console.log(data);
    const { open, closeHandler, openHandler } = useDialog({ value: false });
    return (
      <>
        <Header drawerOpenHandler={openHandler} />
        <Stack direction={"row"} spacing={1}>
          <Drawer sx={{ width: "40%" }} open={open} onClose={closeHandler}>
            <ChatList activeChatId={id} chats={data?.chats} />
          </Drawer>
          <StyledChatListColumn>
            <ChatList activeChatId={id} chats={data?.chats} />
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
