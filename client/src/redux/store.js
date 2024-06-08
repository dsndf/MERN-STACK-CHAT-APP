import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { api } from "./api/query";
import { userNotificationSlice } from "./slices/userNotificationSlice";
import { chatSlice } from "./slices/chatSlice";
import { useSelector } from "react-redux";
import miscSlice from "./slices/miscSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userNotificationSlice.name]: userNotificationSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
    [miscSlice.name]: miscSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});
export const getUserAuth = () => useSelector((state) => state["auth"]);
