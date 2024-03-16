import React, { Fragment, useRef } from "react";
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
import { fileFormat } from "../lib/features.js";
import RenderAttachment from "../components/shared/RenderAttachment.jsx";

const Chat = ({ chatId }) => {
  const attachFileDialogAnchorEleRef = useRef(null);
  const attachFileDialog = useDialog({});

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
          >
            {sampleMessages &&
              sampleMessages.map(
                ({ sender, attachments, content, createdAt }) => {
                  console.log({attachments})
                  return (
                    <Fragment>
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
                          sender={sender}
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
              <StyledChatFormInputBox placeholder="Type message" />
              <IconButton
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
