import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const ChatList = ({ chats = [1, 2, 3, 4, 5, 6, 7, 8, 9], activeChatId }) => {
  console.log({ activeChatId });
  return (
    <Box  sx={{width:{xs:"300px",md:"auto"}}}>
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${chat._id}`} key={chat?._id}>
              <ChatListItem
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
