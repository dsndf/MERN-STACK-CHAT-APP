import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { api } from "./api/query";
import { userNotificationSlice } from "./slices/userNotificationSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userNotificationSlice.name]: userNotificationSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});
