import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { checkIsOnline } from "../../lib/features";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Search } from "@mui/icons-material";

const ChatList = ({ chats=[], activeChatId, onlineUsers = [] }) => {
  const { newMessageCount } = useSelector((state) => state.chat);
  return (
    <Box sx={{ width: { xs: "300px", md: "auto" } }}>
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${chat._id}`} key={chat?._id}>
              <motion.div
                initial={{ y: "-10%", opacity: 0 }}
                whileInView={{
                  y: "0%",
                  opacity: 1,
                  transition: { delay: (i + 1) / 10 },
                }}
              >
                <ChatListItem
                  key={chat?._id}
                  _id={chat?._id}
                  name={chat?.name}
                  avatar={chat?.avatar}
                  groupChat={chat?.isGroup}
                  isSelected={activeChatId === chat?._id}
                  isOnline={checkIsOnline(onlineUsers, chat?.members)}
                  count={
                    newMessageCount?.find((e) => e.chat === chat?._id)?.count
                  }
                />
              </motion.div>
            </Link>
          );
        })}
      {!chats.length && (
        <Box>
          <Typography textAlign={"center"} fontSize={"20px"} p={"2rem"}>
            No Chats!
          </Typography>
          <Typography component={'p'} px={"0.5rem"} display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} variant="body1"  >
            Go to search <Search/> and create new chats 
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(ChatList);
