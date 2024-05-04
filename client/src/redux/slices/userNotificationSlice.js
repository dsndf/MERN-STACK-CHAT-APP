import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedUsers: [],
  notifications: [],
  notifyCount: localStorage.chatIO_NotifyCount
    ? JSON.parse(localStorage.chatIO_NotifyCount)
    : 0,
  loading: false,
};
export const userNotificationSlice = createSlice({
  name: "userNotification",
  initialState,
  reducers: {
    setSearchedUsers(state, action) {
      state.searchedUsers = action.payload;
      state.loading = false;
    },
    setUserNotificationLoading(state, action) {
      state.loading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setNotificationCount(state, action) {
      state.notifyCount = action.payload;
      localStorage.setItem("chatIO_NotifyCount", String(state.notifyCount));
    },
  },
});

export const {
  setNotificationCount,
  setNotifications,
  setSearchedUsers,
  setUserNotificationLoading,
} = userNotificationSlice.actions;
