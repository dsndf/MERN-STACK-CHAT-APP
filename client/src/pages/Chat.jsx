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
import { sampleMessages } from "../constants/sampleData.js";
import { fileFormat, getMessageSenderData } from "../lib/features.js";
import RenderAttachment from "../components/shared/RenderAttachment.jsx";
import {
  useGetChatDetailsQuery,
  useGetChatMessagesQuery,
} from "../redux/api/query.js";
import { useResponseSuccessError } from "../hooks/useResponseSuccessError.js";
import { useParams, useSearchParams } from "react-router-dom";
import { useInputValidation } from "6pp";
import { useDispatchAndSelector } from "../hooks/useDispatchAndSelector.js";
import { useAddEvents } from "../hooks/useAddEvents.js";
import { getSocket } from "../context/SocketApiContext.jsx";

const Chat = () => {
  const { id: chatId } = useParams();
  const populate = useSearchParams()[0].get("populate");
  const attachFileDialogAnchorEleRef = useRef();
  const messageToSend = useInputValidation("");
  const socket = getSocket();
  const {
    state: { user },
  } = useDispatchAndSelector("auth");
  const attachFileDialog = useDialog({ value: true });
  const [oldMessages, setOldMessages] = useState([]);
  const chatDetails = useGetChatDetailsQuery({ chatId, populate });
  const oldMessagesChunks = useGetChatMessagesQuery({ chatId });
  const oldMessagesChunksData = oldMessagesChunks.data;
  const chatDetailsData = chatDetails.data;
  useResponseSuccessError(chatDetails, oldMessagesChunks);
  console.log({
    CHAT_DETAILS: chatDetailsData?.chat,
    messages: oldMessagesChunksData?.messages,
  });
  const MessageAlert = {
    event: "message-alert",
    eventHandler: (message) => {
      setOldMessages((prev) => [...prev, message]);
    },
  };

  const sendMessageHanlder = () => {
    const messageForRealTime = {
      sender: user?._id,
      createdAt: new Date(),
      content: messageToSend.value,
      attachments: [],
    };
    console.log({ messageForRealTime });

    setOldMessages((prev) => [...prev, messageForRealTime]);
  };

  useEffect(() => {
    if (oldMessagesChunksData?.messages)
      setOldMessages((prev) => [...oldMessagesChunksData.messages, ...prev]);
  }, [oldMessagesChunksData]);

  useEffect(() => {
    setOldMessages([]);
  }, [chatId]);

  useAddEvents(MessageAlert);

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
            p={"1rem"}
            direction={"column"}
            position={"absolute"}
            top={"0px"}
            width={"100%"}
            spacing={"0.5rem"}
            height={"calc(100% - 4rem)"}
            sx={{ overflowY: "scroll" }}
          >
            {oldMessages &&
              oldMessages.map(
                ({ sender, attachments, content, createdAt, _id }) => {
                  console.log({ attachments });
                  return (
                    <Fragment key={_id}>
                      {attachments.length > 0 &&
                        attachments.map(({ url, public_id }) => {
                          const file = fileFormat(url);
                          return (
                            <Box key={public_id}>
                              <a
                                href={url}
                                target="_blank"
                                download
                                style={{ color: "black" }}
                              >
                                <RenderAttachment url={url} file={file} />
                              </a>
                            </Box>
                          );
                        })}
                      {content && (
                        <MessageComponent
                          sender={getMessageSenderData(
                            chatDetailsData?.chat?.members,
                            sender
                          )}
                          content={content}
                          createdAt={createdAt}
                        />
                      )}
                    </Fragment>
                  );
                }
              )}
          </Stack>
          <StyledChatForm>
            <AttachFileMenu
              open={attachFileDialog.open}
              closeHandler={attachFileDialog.closeHandler}
              anchorEle={attachFileDialogAnchorEleRef.current}
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
                onClick={sendMessageHanlder}
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
