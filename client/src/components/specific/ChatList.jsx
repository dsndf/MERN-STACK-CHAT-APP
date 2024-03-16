import React, { memo, useState } from "react";
import ChatListItem from "../shared/ChatListItem";
import { Link } from "react-router-dom";

const ChatList = ({ chats = [1, 2, 3, 4,5,6,7,8,9], activeChatId }) => {
  console.log({ activeChatId });
  return (
    <> 
      {chats &&
        chats.map((chat, i) => {
          return (
            <Link to={`/chat/${i + 1}`} key={i}>
              <ChatListItem isSelected={Number(activeChatId) === i + 1} />
            </Link>
          );
        })}
    </>
  );
};

export default memo(ChatList);
