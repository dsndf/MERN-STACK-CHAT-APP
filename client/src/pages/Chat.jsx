import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyledChatColumn,
  StyledChatForm,
  StyledChatFormInputBox,
} from "../components/style/StyleComponent";
import Title from "../components/shared/Title";
import AppLayout from "../components/layouts/AppLayout";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import chatWallpaper from "../assets/chat/pxfuel.jpg";
import { AttachFile, Send } from "@mui/icons-material";
import { hoverMainBg, mainBg } from "../constants/color";
import AttachFileMenu from "../components/dialog/AttachFileMenu.jsx";
import { useDialog } from "../hooks/useDialog.js";
import MessageComponent from "../components/shared/MessageComponent.jsx";
import {
  useGetChatDetailsQuery,
  useGetChatMessagesQuery,
  useSendAttachmentsMutation,
  useSendMessageMutation,
} from "../redux/api/query.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useInfiniteScrollTop } from "6pp";
import { useDispatchAndSelector } from "../hooks/useDispatchAndSelector.js";
import { useAddEvents } from "../hooks/useAddEvents.js";
import { getSocket } from "../context/SocketApiContext.jsx";
import toast from "react-hot-toast";
import { useMutation } from "../hooks/useMutation.js";
import Typing from "../components/shared/Typing.jsx";
import {
  TYPING_STOPPED,
  START_TYPING,
  TYPING_STARTED,
} from "../events/clientEvents.js";
import { STOP_TYPING } from "../../../server/events/serverEvents.js";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNewMessageCount,
  setLastChatMessage,
} from "../redux/slices/chatSlice.js";
import { useErrors } from "../hooks/useErrors.js";

const Chat = ({ chatId: currentChatId }) => {
  const socket = getSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const attachFileDialogAnchorEleRef = useRef();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  //.... ref....
  const containerRef = useRef(null);
  const containerBottomRef = useRef(null);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    socket.emit(START_TYPING, {
      chatId: currentChatId,
      members: chatDetailsData?.chat?.members,
    });
  };

  const scrollDownOnMessage = (eleRef) => {
    eleRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    state: { user },
  } = useDispatchAndSelector("auth");

  const attachFileDialog = useDialog({});
  const [newMessages, setNewMessages] = useState([]);

  //MUTATIONS
  const executeSendMessageMutation = useMutation({
    hook: useSendMessageMutation,
    loadingMessage: "Sending message...",
  });
  const exceuteSendAttachmentMutation = useMutation({
    hook: useSendAttachmentsMutation,
    loadingMessage: "Sending files...",
  });
  //QUERIES
  const chatDetails = useGetChatDetailsQuery(
    { chatId: currentChatId, populate: false },
    { skip: !currentChatId }
  );

  const oldMessagesChunks = useGetChatMessagesQuery(
    {
      chatId: currentChatId,
      page,
    },
    { skip: !currentChatId }
  );
  const oldMessagesChunksData = oldMessagesChunks.data;
  const chatDetailsData = chatDetails.data;
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunksData?.totatPages,
    page,
    setPage,
    oldMessagesChunksData?.messages
  );

  const sendMessageHandler = (e) => {
    e.preventDefault();
    executeSendMessageMutation({
      chatId: currentChatId,
      message: message,
    });
  };

  const sendAttachmentsHandler = (e) => {
    const files = e.target.files;
    if (files.length > 5) return toast.error("Only 5 files can be sent");
    const myForm = new FormData();
    Object.values(files).forEach((file) => myForm.append("files", file));

    scrollDownOnMessage(containerRef);
    exceuteSendAttachmentMutation({
      chatId: chatDetailsData?.chat?._id,
      formData: myForm,
    });
    attachFileDialog.closeHandler();
  };

  const onStopTyping = useMemo(() => {
    let tid;
    return () => {
      if (tid) clearTimeout(tid);
      tid = setTimeout(() => {
        socket.emit(STOP_TYPING, {
          chatId: currentChatId,
          members: chatDetailsData?.chat?.members,
        });
      }, 2000);
    };
  }, [socket, currentChatId, chatDetails.status]);

  const typingStarted = useCallback(
    ({ chatId }) => {
      if (currentChatId === chatId) {
        setIsTyping(true);
      }
    },
    [setIsTyping, currentChatId]
  );
  const typingStopped = useCallback(
    ({ chatId }) => {
      if (currentChatId === chatId) setIsTyping(false);
    },
    [setIsTyping, currentChatId]
  );
  const messageAlert = useCallback(
    ({ chatMessage, chatId }) => {
      console.log({ currentChatId, chatId });
      if (currentChatId !== chatId) return;
      setIsTyping(false);
      setNewMessages((prev) => [...prev, chatMessage]);
      dispatch(
        setLastChatMessage({
          chat: currentChatId,
          lastMessage: chatMessage.content || "file",
        })
      );
    },
    [setNewMessages, currentChatId]
  );

  useAddEvents(
    [
      {
        event: "message-alert",
        eventHandler: messageAlert,
      },
      {
        event: TYPING_STARTED,
        eventHandler: typingStarted,
      },
      {
        event: TYPING_STOPPED,
        eventHandler: typingStopped,
      },
    ],
    { dependencies: [currentChatId] }
  );

  useEffect(() => {
    scrollDownOnMessage(containerBottomRef);
  }, [newMessages]);

  useEffect(() => {
    dispatch(clearNewMessageCount(currentChatId));
    return () => {
      setOldMessages([]);
      setNewMessages([]);
      setPage(1);
      setMessage("");
    };
  }, [currentChatId]);

  useEffect(() => {
    if (oldMessagesChunksData?.messages?.length) {
      let messages = [...oldMessagesChunksData.messages];
      let lastMessage = messages.pop();
      let isContent = lastMessage?.content || "";
      let isFile = lastMessage?.attachments?.length > 0 ? "file" : "";
      dispatch(
        setLastChatMessage({
          chat: currentChatId,
          lastMessage: isFile ? isFile : isContent,
        })
      );
    }
  }, [oldMessagesChunksData]);

  const allMessages = [...oldMessages, ...newMessages];

  // console.log({ currentChatId, newMessages, oldMessages });
  const navigate = useNavigate();
  useErrors(
    [
      {
        isError: chatDetails.isError,
        error: chatDetails.error,
        fallback: () => navigate("/"),
      },
      {
        isError: oldMessagesChunks.isError,
        error: oldMessagesChunks.error,
        fallback: () => navigate("/"),
      },
    ],
    [chatDetails.isError, oldMessagesChunks.isError]
  );
  console.log({ chatDetailsData });
  return (
    <>
      <Title title={chatDetailsData?.chat?.name} description={""} />

      <StyledChatColumn>
        <Stack
          height={"100%"}
          sx={{ background: `url(${chatWallpaper})` }}
          position={"relative"}
        >
       
          <Stack
            component={"div"}
            ref={containerRef}
            p={"1rem"}
            direction={"column"}
            position={"absolute"}
            top={"0px"}
            width={"100%"}
            spacing={"0.5rem"}
            height={"calc(100% - 4rem)"}
            sx={{ overflowY: "scroll", overflowX: "hidden" }}
          >
            {allMessages &&
              allMessages.map(
                ({ sender, attachments, content, createdAt, _id }) => {
                  return (
                    <MessageComponent
                      key={_id}
                      attachments={attachments}
                      sender={sender}
                      content={content}
                      createdAt={createdAt}
                    />
                  );
                }
              )}

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-start"}
              ref={containerBottomRef}
            >
              {isTyping && <Typing />}
            </Box>
          </Stack>
          <StyledChatForm
            onSubmit={sendMessageHandler}
            encType="multipart/form-data"
          >
            <AttachFileMenu
              open={attachFileDialog.open}
              closeHandler={attachFileDialog.closeHandler}
              anchorEle={attachFileDialogAnchorEleRef.current}
              sendAttachmentsHandler={sendAttachmentsHandler}
            />
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  transition: "all 0.5s",
                  color: "white",
                  position: "absolute",
                  p: "0.7rem",
                  left: 0,
                  bottom: 0,
                }}
                onClick={attachFileDialog.openHandler}
                ref={attachFileDialogAnchorEleRef}
              >
                <AttachFile color="gray" />
              </IconButton>
              <StyledChatFormInputBox
                placeholder="Type message"
                value={message}
                onChange={messageChangeHandler}
                onKeyUp={onStopTyping}
              />
              <IconButton
                type="submit"
                sx={{
                  bgcolor: mainBg,
                  "&:hover": { bgcolor: theme.palette.primary.light },
                  transition: "all 0.5s",
                  color: "white",
                  position: "absolute",
                  p: "0.7rem",
                  right: 0,
                  bottom: 0,
                  top: 0,
                }}
              >
                <Send sx={{ rotate: "-25deg" }} />
              </IconButton>
            </Box>
          </StyledChatForm>
        </Stack>
      </StyledChatColumn>
    </>
  );
};

export default AppLayout()(Chat);
