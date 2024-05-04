import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../config/settings";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes: ["Chats", "User", "Friends", "Chat_Details", "Messages"],
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
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/send/friend/request",
        method: "POST",
        body: { userId: data },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getFriends: builder.query({
      query: ({ chatId, keyword }) => ({
        url: `/user/friends?keyword=${keyword}&chatId=${chatId}`,
        credentials: "include",
      }),
      providesTags: ["Friends"],
    }),
    createNewGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/new/group",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getNotifications: builder.query({
      query: () => ({ url: "/user/notifications", credentials: "include" }),
    }),
    getChatDetails: builder.query({
      query: ({ chatId, populate }) => ({
        url: `${server}/chat/${chatId}?populate=${populate}`,
        credentials: "include",
      }),
      providesTags: ["Chat_Details"],
    }),
    getChatMessages: builder.query({
      query: ({ chatId }) => ({
        url: server + "/chat/messages/" + chatId,
        credentials: "include",
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useLazyGetFriendsQuery,
  useCreateNewGroupMutation,
  useLazyGetNotificationsQuery,
  useGetChatDetailsQuery,
  useGetChatMessagesQuery
} = api;
