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
import { getSocket } from "../../context/SocketApiContext";
import { useAddEvents } from "../../hooks/useAddEvents";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const { data, error, refetch, isLoading } = useGetMyChatsQuery();
    const { open, closeHandler, openHandler } = useDialog({ value: false });

    useAddEvents(
      {
        event: "I am online",
        eventHandler: (message) => {
          refetch();
        },
      },
      {
        event: "I am offline",
        eventHandler: (message) => {
        console.log("i am off")
          refetch();
        },
      }
    );

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
          <StyledProfileColumn display={["none", "none", "block"]}>
            <Profile />
          </StyledProfileColumn>
        </Stack>
        <Footer />
      </>
    );
  };
};
export default AppLayout;
