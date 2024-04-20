import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../config/settings";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes:["Chats"],
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({ url: "/chat/my/chats", credentials: "include" }),
      providesTags:["Chats"],
    }),
  }),
});

export const { useGetMyChatsQuery } = api;
