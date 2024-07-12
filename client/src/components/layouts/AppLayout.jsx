import {
  StyledChatListColumn,
  StyledProfileColumn,
} from "../style/StyleComponent";
import Footer from "./Footer";
import Header from "./Header";
import { Drawer, Stack } from "@mui/material";
import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMyChatsQuery } from "../../redux/api/query";
import { useDialog } from "../../hooks/useDialog";
import { useAddEvents } from "../../hooks/useAddEvents";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";
import {
  ALERT,
  DELETE_GROUP_ALERT,
  NEW_MESSAGE_COUNT_ALERT,
  OFFLINE,
  ONLINE,
  REFETCH_CHATS,
  REMOVE_MEMBER_ALERT,
} from "../../events/clientEvents";
import { useDispatch, useSelector } from "react-redux";
import {
  setLastChatMessage,
  setNewMessageCount,
  setOnlineUsers,
} from "../../redux/slices/chatSlice";
import { useErrors } from "../../hooks/useErrors";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const wrappedComponentprops = { ...props, chatId: id };
    const {
      data,
      error: myChatsError,
      isError: isMyChatError,
      refetch,
      isLoading,
      status,
      isSuccess,
      requestId,
    } = useGetMyChatsQuery(null, { refetchOnMountOrArgChange: true });
    const { open, closeHandler, openHandler } = useDialog({ value: false });
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const refetchChats = useCallback((message) => {
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

    const newMessageCountAlertEventHandler = useCallback(
      (data) => {
        const { chatId } = data;
        if (id && id === chatId) return;
        dispatch(setNewMessageCount(chatId));
      },
      [id]
    );
    const alertEventHandler = useCallback(
      ({ message, chatId, type }) => {
        toast.success(message);
        if (type === REMOVE_MEMBER_ALERT) {
          if (chatId === id) {
            navigate("/");
          }
        } else if (type === DELETE_GROUP_ALERT) {
          if (chatId === id) {
            navigate("/");
          }
        }
      },
      [id]
    );

    useAddEvents(
      [
        {
          event: ALERT,
          eventHandler: alertEventHandler,
        },
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
        {
          event: NEW_MESSAGE_COUNT_ALERT,
          eventHandler: newMessageCountAlertEventHandler,
        },
      ],
      {
        dependencies: [
          onlineEventHandler,
          offlineEventHandler,
          newMessageCountAlertEventHandler,
        ],
      }
    );

    useEffect(() => {
      if (status === "fulfilled") {
        dispatch(setOnlineUsers(data.onlineUsers));
        data.chats.forEach((v)=>{
          dispatch(setLastChatMessage({chat:v._id,lastMessage:v.lastMessage}));
        })
      }
    }, [status]);

    useErrors(
      [
        {
          isError: isMyChatError,
          error: myChatsError,
        },
      ],
      [isMyChatError]
    );

    return (
      <>
        <Header drawerOpenHandler={openHandler} />
        <Stack direction={"row"} spacing={0.5}>
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
