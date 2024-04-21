import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedUsers: [],
  notifications: [],
  notifyCount: 0,
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
  },
});

export const { setSearchedUsers,setUserNotificationLoading } = userNotificationSlice.actions;
