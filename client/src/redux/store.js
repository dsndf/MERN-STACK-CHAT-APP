import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { api } from "./api/query";
import { userNotificationSlice } from "./slices/userNotificationSlice";
import { chatSlice } from "./slices/chatSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userNotificationSlice.name]: userNotificationSlice.reducer,
    [api.reducerPath]: api.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});
export const getUserAuth = ()=>useSelector((state)=>state["auth"]);