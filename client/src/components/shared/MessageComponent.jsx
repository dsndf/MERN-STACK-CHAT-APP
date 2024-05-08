import { Box, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector";
import RenderAttachment from "./RenderAttachment";
import { fileFormat } from "../../lib/features";
import { mainBg } from "../../constants/color";

const MessageComponent = ({
  sender,
  content = "",
  attachments = [],
  createdAt,
}) => {
  const {
    state: { user },
  } = useDispatchAndSelector("auth");
  const isMe = sender?._id === user._id;

  return (
    <>
      {" "}
      <Box
        alignSelf={isMe ? "flex-end" : "flex-start"}
        width={"fit-content"}
        p={"10px"}
        sx={{ bgcolor: "white" }}
        borderRadius={"5px"}
      >
        <Typography
          variant="caption"
          sx={{ color: isMe ? mainBg : "black" }}
          fontWeight={500}
        >
          {isMe ? "You" : sender?.name}
        </Typography>
        <Typography variant="body1" fontSize={["16px"]} color="initial">
          {content}
        </Typography>
        <Typography variant="caption">
          {moment(new Date(createdAt)).fromNow()}
        </Typography>
      </Box>
      {attachments.length > 0 &&
        attachments.map(({ url, public_id }) => {
          const file = fileFormat(url);
          return (
            <Box
              key={public_id}
              alignSelf={isMe ? "flex-end" : "flex-start"}
              width={"fit-content"}
              p={"10px"}
              sx={{ bgcolor: "white" }}
              borderRadius={"5px"}
            >
              <Typography
                variant="caption"
                sx={{ color: isMe ? mainBg : "black" }}
                fontWeight={500}
              >
                {isMe ? "You" : sender?.name}
              </Typography>
              <Box>
                {" "}
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{ color: "black" }}
                >
                  <RenderAttachment url={url} file={file} />
                </a>
              </Box>
              <Typography variant="caption">
                {moment(new Date(createdAt)).fromNow()}
              </Typography>
            </Box>
          );
        })}
    </>
  );
};

export default MessageComponent;
