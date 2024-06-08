import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifyCount: localStorage.chatIO_NotifyCount
    ? JSON.parse(localStorage.chatIO_NotifyCount)
    : 0,
  loading: false,
  isNotified: false,
};
export const userNotificationSlice = createSlice({
  name: "userNotification",
  initialState,
  reducers: {
    setUserNotificationLoading(state, action) {
      state.loading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    incrementNotificationCount(state, action) {
      state.notifyCount++;
      localStorage.setItem("chatIO_NotifyCount", String(state.notifyCount));
    },
    resetNotificationCount(state, action) {
      state.notifyCount = 0;
      localStorage.setItem("chatIO_NotifyCount", String(state.notifyCount));
    },
    setIsNotified(state, action) {
      state.isNotified = action.payload;
    },
  },
});

export const {
incrementNotificationCount,
resetNotificationCount,
  setNotifications,
  setUserNotificationLoading,
  setIsNotified,
} = userNotificationSlice.actions;
