import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onlineUsers: [],
  newMessageCount: localStorage.getItem("chatNewMessageCount")
    ? JSON.parse(localStorage.getItem("chatNewMessageCount"))
    : [],
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
  },
});
export const { clearNewMessageCount, setOnlineUsers, setNewMessageCount } =
  chatSlice.actions;
