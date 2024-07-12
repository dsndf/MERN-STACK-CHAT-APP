import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onlineUsers: [],
  newMessageCount: localStorage.getItem("chatNewMessageCount")
    ? JSON.parse(localStorage.getItem("chatNewMessageCount"))
    : [],
  lastChatMessage: localStorage.getItem("lastChatMessage")
    ? JSON.parse(localStorage.getItem("lastChatMessage"))
    : {},
};

export const chatSlice = createSlice({
  initialState,
  name: "chat",
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setNewMessageCount(state, action) {
      const data = state.newMessageCount;
      const chat = action.payload;
      if (!data.length) {
        state.newMessageCount = [{ chat, count: 1 }];
        return;
      }
      const isChatExist = data.find((e) => e.chat === chat);
      console.log({ isChatExist });
      if (isChatExist) {
        isChatExist.count++;
      } else {
        state.newMessageCount = [...data, { chat, count: 1 }];
      }
      localStorage.setItem(
        "chatNewMessageCount",
        JSON.stringify(state.newMessageCount)
      );
    },
    clearNewMessageCount(state, action) {
      const chat = action.payload;
      state.newMessageCount = state.newMessageCount.filter(
        (e) => e.chat !== chat
      );
      localStorage.setItem(
        "chatNewMessageCount",
        JSON.stringify(state.newMessageCount)
      );
    },
    setLastChatMessage(state, action) {
      let data = state.lastChatMessage;
      const { chat, lastMessage } = action.payload;
      if (!data) {
        data = { [chat]: lastMessage };
      } else {
        const currentChatData = data[chat];
        if (!currentChatData) data = { ...data, [chat]: lastMessage };
        if (currentChatData) data[chat] = lastMessage;
      }
      state.lastChatMessage = data;
      localStorage.setItem("lastChatMessage", JSON.stringify(data));
    },
  },
});
export const {
  setLastChatMessage,
  clearNewMessageCount,
  setOnlineUsers,
  setNewMessageCount,
} = chatSlice.actions;
