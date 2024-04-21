import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../config/settings";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes: ["Chats", "User"],
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({ url: "/chat/my/chats", credentials: "include" }),
      providesTags: ["Chats"],
    }),
    searchUser: builder.query({
      query: (keyword) => ({
        url: `/user/search?keyword=${keyword}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMyChatsQuery ,useLazySearchUserQuery} = api;
