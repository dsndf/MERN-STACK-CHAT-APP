import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onlineUsers: [],
};

export const chatSlice = createSlice({
  initialState,
  name: "chat",
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});
export const { setOnlineUsers } = chatSlice.actions;
