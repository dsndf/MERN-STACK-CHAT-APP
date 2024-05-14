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
import { useAddEvents } from "../../hooks/useAddEvents";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { OFFLINE, ONLINE, REFETCH_CHATS } from "../../events/clientEvents";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../redux/slices/chatSlice";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const wrappedComponentprops = { ...props, chatId: id };
    const { data, error, refetch, isLoading, status, isSuccess, requestId } =
      useGetMyChatsQuery(null, { refetchOnMountOrArgChange: true });
    const { open, closeHandler, openHandler } = useDialog({ value: false });
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const refetchChats = useCallback((message) => {
      alert(message);
      if (message) toast(message);
      refetch();
    }, []);

    const onlineEventHandler = useCallback(
      (data) => {
        const { onlineUsers } = data;
        dispatch(setOnlineUsers(onlineUsers));
      },
      [setOnlineUsers]
    );
    const offlineEventHandler = useCallback(
      (data) => {
        const { onlineUsers } = data;
        dispatch(setOnlineUsers(onlineUsers));
      },
      [setOnlineUsers]
    );
    useAddEvents(
      [
        {
          event: REFETCH_CHATS,
          eventHandler: refetchChats,
        },
        {
          event: OFFLINE,
          eventHandler: offlineEventHandler,
        },
        {
          event: ONLINE,
          eventHandler: onlineEventHandler,
        },
      ],
      { dependencies: [setOnlineUsers] }
    );

    useEffect(() => {
      if (status === "fulfilled") dispatch(setOnlineUsers(data.onlineUsers));
    }, [status]);

    return (
      <>
        <Header drawerOpenHandler={openHandler} />
        <Stack direction={"row"} spacing={1}>
          <Drawer sx={{ width: "40%" }} open={open} onClose={closeHandler}>
            <ChatList
              activeChatId={id}
              chats={data?.chats}
              onlineUsers={chatState.onlineUsers}
            />
          </Drawer>
          <StyledChatListColumn>
            <ChatList
              activeChatId={id}
              chats={data?.chats}
              onlineUsers={chatState.onlineUsers}
            />
          </StyledChatListColumn>
          <WrappedComponent {...wrappedComponentprops} />
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
