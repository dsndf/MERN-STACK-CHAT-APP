import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { api } from "./api/query";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});
