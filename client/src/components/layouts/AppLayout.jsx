import {
  StyledChatListColumn,
  StyledProfileColumn,
} from "../style/StyleComponent";
import Footer from "./Footer";
import Header from "./Header";
import { Drawer, Stack } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import { useGetMyChatsQuery } from "../../redux/api/query";
import { useDialog } from "../../hooks/useDialog";
import { getSocket } from "../../context/SocketApiContext";
import { useAddEvents } from "../../hooks/useAddEvents";
import toast from "react-hot-toast";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const { data, error, refetch, isLoading } = useGetMyChatsQuery();
    const { open, closeHandler, openHandler } = useDialog({ value: false });

    useAddEvents(
      {
        event: "REFETCH_CHATS",
        eventHandler: (message) => {
          if (message)
            toast(message, {
              duration: 3000,
            });
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
