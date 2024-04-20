import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";

const ChatList = ({ chats = [1, 2, 3, 4, 5, 6, 7, 8, 9], activeChatId }) => {
  console.log({ activeChatId });
  return (
    <>
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${chat._id}`} key={i}>
              <ChatListItem _id={chat?._id} name={chat?.name} avatar={chat?.avatar} isSelected={Number(activeChatId) === i + 1} />
            </Link>
          );
        })}
    </>
  );
};

export default memo(ChatList);
