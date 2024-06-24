import {
  Avatar,
  Box,

  Stack,
  Typography,
} from "@mui/material";
import React, { memo} from "react";
import moment from "moment";
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector";
import RenderAttachment from "./RenderAttachment";
import { fileFormat, transformImage } from "../../lib/features";
import { mainBg } from "../../constants/color";
import { motion } from "framer-motion";


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



  const MotionBox = motion(Box);

  return (
    <>
      {!attachments.length && (
        <MotionBox
          initial={{
            x: isMe ? "100%" : "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: "0%",
            opacity: 1,
          }}
          alignSelf={isMe ? "flex-end" : "flex-start"}
          width={"fit-content"}
          p={"10px"}
          sx={{ bgcolor: "white" }}
          borderRadius={"5px"}
          component={"div"}
      
          onContextMenu={(e) => {
            e.preventDefault();
            deleteMenu.openHandler();
          }}
        >
          {" "}
    
          <Stack
            mb={1}
            flexDirection={"row"}
            gap={"0.5rem"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {!isMe && (
              <Avatar
                src={sender?.avatar?.url}
                sx={{ width: 24, height: 24 }}
              />
            )}

            <Typography
              variant="caption"
              sx={{ color: isMe ? mainBg : "black" }}
              fontWeight={500}
            >
              {!isMe && sender?.name}
            </Typography>
          </Stack>
          <Typography variant="body1" fontSize={["16px"]} color="initial">
            {content}
          </Typography>
          <Typography variant="caption">
            {moment(new Date(createdAt)).fromNow()}
          </Typography>
        </MotionBox>
      )}

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
                {!isMe && sender?.name}
              </Typography>
              <Box>
                {" "}
                <a
                  href={transformImage(url)}
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

export default memo(MessageComponent);
