import { Box, Typography } from "@mui/material";
import React from "react";
import moment from 'moment'

const MessageComponent = ({
  sender,
  content = "",
  attachments = [],
  createdAt,
  children,
}) => {
  const user = { _id: "SAd" };
  const isMe = sender._id === user._id;

  return (
    <Box
      alignSelf={isMe ? "flex-end" : "flex-start"}
      width={"fit-content"}
      p={"10px"}
      sx={{ bgcolor: "white" }}
      borderRadius={"5px"}
    >
     <Typography variant="caption" color="primary">{isMe?"You":sender?.name}</Typography>   
    <Typography variant="body1" color="initial">Hii evrybody</Typography>
    <Typography variant="caption" >{moment(new Date(createdAt)).fromNow()}</Typography>   

    </Box>
  );
};

export default MessageComponent;
