import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const ChatList = ({ chats, activeChatId }) => {
  console.log({ activeChatId });
  return (
    <Box sx={{ width: { xs: "300px", md: "auto" } }}>
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${chat._id}?populate=true`} key={chat?._id}>
              <ChatListItem
                key={chat?._id}
                _id={chat?._id}
                name={chat?.name}
                avatar={chat?.avatar}
                isSelected={Number(activeChatId) === i + 1}
              />
            </Link>
          );
        })}
    </Box>
  );
};

export default memo(ChatList);
