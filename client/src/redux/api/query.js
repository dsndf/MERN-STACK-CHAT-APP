import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../config/settings";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes: [
    "Chats",
    "User",
    "Friends",
    "Chat_Details",
    "Messages",
    "Notifications",
    "MyGroups",
  ],
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
      query: (userId) => ({
        url: "user/send/friend/request",
        method: "POST",
        body: { userId },
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
      keepUnusedDataFor: 0,
      providesTags: ["Notifications"],
    }),
    getChatDetails: builder.query({
      query: ({ chatId, populate }) => ({
        url: `${server}/chat/${chatId}?populate=${populate}`,
        credentials: "include",
      }),
      providesTags: ["Chat_Details"],
    }),
    getChatMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: server + "/chat/messages/" + chatId + "?page=" + page,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, message }) => ({
        url: "/chat/send/message/" + chatId,
        method: "POST",
        body: { content: message },
        credentials: "include",
      }),
    }),
    sendAttachments: builder.mutation({
      query: ({ formData, chatId }) => ({
        url: "/chat/send/attachments" + "/" + chatId,
        credentials: "include",
        method: "POST",
        body: formData,
      }),
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ reqId, accepted }) => ({
        url: "/user/accept/friend/request/" + reqId,
        method: "PUT",
        body: { accepted },
        credentials: "include",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getMyGroups: builder.query({
      query: () => ({ url: "/chat/my/groups", credentials: "include" }),
      providesTags: ["MyGroups"],
      keepUnusedDataFor: 0,
    }),

    editGroupName: builder.mutation({
      query: ({ name, chatId }) => ({
        url: "/chat/edit/group/name/" + chatId,
        credentials: "include",
        method: "PUT",
        body: { name },
      }),
    }),
    addMembers: builder.mutation({
      query: ({ members, chatId: chat_id }) => ({
        url: "/chat/add/members",
        method: "PUT",
        credentials: "include",
        body: { members, chat_id },
      }),
      invalidatesTags: ["MyGroups","Chat_Details"],
    }),
    removeMember: builder.mutation({
      query: ({ chatId: chat_id, member }) => ({
        url: "/chat/remove/member",
        method: "PUT",
        credentials: "include",
        body: { chat_id, member },
      }),
      
      invalidatesTags: ["MyGroups", "Chat_Details"],
    }),
    deleteGroup: builder.mutation({
      query: ({ chatId: chat_id }) => ({
        url: "/chat/delete/group/" + chat_id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["MyGroups"],
    }),
    leaveGroup:builder.mutation({
      query:({chatId:chat_id})=>({
        url:"/chat/leave/group/"+chat_id,
        method:"PUT",
        credentials:"include",
      }),
      invalidatesTags:['Chats']
    }),
    deleteChat:builder.mutation({
      query:({chatId:chat_id})=>({
        url:"/chat/"+chat_id,
        method:"DELETE",
        credentials:"include",
      }),
      invalidatesTags:['Chats']
    })
  }),
});

export const {
  useGetMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useLazyGetFriendsQuery,
  useCreateNewGroupMutation,
  useGetNotificationsQuery,
  useGetChatDetailsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useSendAttachmentsMutation,
  useAcceptFriendRequestMutation,
  useGetMyGroupsQuery,
  useEditGroupNameMutation,
  useAddMembersMutation,
  useDeleteGroupMutation,
  useRemoveMemberMutation,
  useLazyGetChatDetailsQuery,
  useLeaveGroupMutation,
  useDeleteChatMutation
} = api;
