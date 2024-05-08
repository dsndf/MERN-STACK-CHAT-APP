import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  StyledChatColumn,
  StyledChatForm,
  StyledChatFormInputBox,
} from "../components/style/StyleComponent";
import Title from "../components/shared/Title";
import AppLayout from "../components/layouts/AppLayout";
import { Box, IconButton, Stack } from "@mui/material";
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
import { useParams, useSearchParams } from "react-router-dom";
import { useInfiniteScrollTop, useInputValidation } from "6pp";
import { useDispatchAndSelector } from "../hooks/useDispatchAndSelector.js";
import { useAddEvents } from "../hooks/useAddEvents.js";
import { getSocket } from "../context/SocketApiContext.jsx";
import toast from "react-hot-toast";
import { useMutation } from "../hooks/useMutation.js";

const Chat = () => {
  const { id: chatId } = useParams();
  const [page, setPage] = useState(1);
  const populate = useSearchParams()[0].get("populate");
  const attachFileDialogAnchorEleRef = useRef();
  const messageToSend = useInputValidation("");
  const socket = getSocket();

  //.... ref....
  const containerRef = useRef(null);
  const containerBottomRef = useRef(null);

  const scrollDownOnMessage = (eleRef) => {
    eleRef?.current?.scrollIntoView();
  };

  const {
    state: { user },
  } = useDispatchAndSelector("auth");
  const attachFileDialog = useDialog({});
  const [newMessages, setNewMessages] = useState([]);

  //MUTATIONS
  const executeSendMessageMutation = useMutation({
    hook: useSendMessageMutation,
  });
  const exceuteSendAttachmentMutation = useMutation({
    hook: useSendAttachmentsMutation,
  });
  //QUERIES
  const chatDetails = useGetChatDetailsQuery({ chatId, populate });
  const oldMessagesChunks = useGetChatMessagesQuery(
    { chatId, page },
    { skip: !chatId }
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

  console.log({ oldMessages, newMessages });

  const MessageAlert = {
    event: "message-alert",
    eventHandler: (message) => {
      setNewMessages((prev) => [...prev, message]);
    },
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();

    executeSendMessageMutation({ chatId, message: messageToSend.value });
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
  };
  const allMessages = [...oldMessages, ...newMessages];

  useAddEvents(MessageAlert);
  useEffect(() => {
    scrollDownOnMessage(containerBottomRef);
  }, [newMessages]);

  return (
    <>
      <Title title={"Chat"} description={"User Chat"} />
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
            sx={{ overflowY: "scroll" }}
          >
            {allMessages &&
              allMessages.map(
                ({ sender, attachments, content, createdAt, _id }) => {
                  return (
                    <Fragment key={_id}>
                      <MessageComponent
                        attachments={attachments}
                        sender={sender}
                        content={content}
                        createdAt={createdAt}
                      />
                    </Fragment>
                  );
                }
              )}
            <Box visibility={"hidden"} ref={containerBottomRef}></Box>
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
                value={messageToSend.value}
                onChange={messageToSend.changeHandler}
              />
              <IconButton
                type="submit"
                sx={{
                  bgcolor: mainBg,
                  "&:hover": { bgcolor: hoverMainBg },
                  transition: "all 0.5s",
                  color: "white",
                  position: "absolute",
                  p: "0.7rem",
                  right: 0,
                  bottom: 0,
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
