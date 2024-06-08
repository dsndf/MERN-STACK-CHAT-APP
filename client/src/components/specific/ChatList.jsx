import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { checkIsOnline } from "../../lib/features";
import { useSelector } from "react-redux";

const ChatList = ({ chats, activeChatId, onlineUsers = [] }) => {
  const { newMessageCount } = useSelector((state) => state.chat);
  return (
    <Box sx={{ width: { xs: "300px", md: "auto" } }}>
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${chat._id}`} key={chat?._id}>
              <ChatListItem
                key={chat?._id}
                _id={chat?._id}
                name={chat?.name}
                avatar={chat?.avatar}
                isSelected={activeChatId === chat?._id}
                isOnline={checkIsOnline(onlineUsers, chat?.members)}
                count={
                  newMessageCount?.find((e) => e.chat === chat?._id)?.count
                }
              />
            </Link>
          );
        })}
    </Box>
  );
};

export default memo(ChatList);
