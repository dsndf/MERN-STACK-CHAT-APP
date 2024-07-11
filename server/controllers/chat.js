import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { emitEvent } from "../events/emitEvent.js";
import {
  ALERT,
  DELETE_GROUP_ALERT,
  MESSAGE_ALERT,
  NEW_MESSAGE_COUNT_ALERT,
  REFETCH_CHATS,
  REMOVE_MEMBER_ALERT,
} from "../events/serverEvents.js";
import {
  cloudinaryInstance,
  deleteFromCloudinary,
  getDataUri,
  getFileUrls,
  getOtherMembers,
} from "../lib/helper.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { onlineUsers } from "../server.js";
import { Request } from "../models/request.js";
import mongoose from "mongoose";
import { deleteChatMessagesAttachments } from "../utils/deleteChatMessagesAttachments.js";

export const createNewGroup = catchAsyncError(async (req, res, next) => {
  let { name, members } = req.body;
  const creatorName = req.user?.name;

  members = [...members, req.user._id];
  const newGroup = await Chat.create({
    name,
    isGroup: true,
    members,
    creator: req.user._id,
  });
  emitEvent(req, REFETCH_CHATS, { users: members });
  emitEvent(req, ALERT, {
    users: getOtherMembers(members, req.user._id),
    message: creatorName + " added you in " + name,
  });
  res.status(201).json({
    success: true,
    message: "Group created successfully.",
    newGroup,
  });
});

export const getMyChats = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;
  let chats = await Chat.find({ members: me })
    .populate("members", "name avatar")
    .lean();

  chats = chats.map((chat) => {
    let membersAvatars = chat.members.reduce(
      (acc, member) => [...acc, member.avatar],
      []
    );
    let singleReciever =
      !chat.isGroup &&
      chat.members.find((member) => {
        if (String(member._id) !== String(me)) return member;
      });
    return {
      isGroup: chat.isGroup,
      name: singleReciever ? singleReciever.name : chat.name,
      avatar: singleReciever ? [singleReciever.avatar] : membersAvatars,
      _id: chat._id,
      members: chat.members.map(({ _id }) => {
        if (String(_id) !== String(me)) return _id;
      }),
    };
  });
  res.json({ success: true, chats, onlineUsers: Array.from(onlineUsers) });
});

export const getMyGroups = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  let groups = await Chat.find({
    members: { $in: [user._id] },
    isGroup: true,
    creator: user._id,
  })
    .populate("members", "avatar name")
    .lean();
  groups = groups.map((group) => {
    return {
      ...group,
      avatar: getFileUrls(group.members, "avatar"),
      totalMembers: group.members.length,
    };
  });

  res.json({ success: true, groups });
});

export const createNewChat = catchAsyncError(async (req, res, next) => {
  const { creator, members } = req.body;
  const user = req.user;

  const creatorUser = await User.findById(creator);
  const chat = await Chat.create({ creator, members });

  creatorUser.chats.push(chat._id);
  await creatorUser.save();
  res.json({ success: true, chat });
});

export const addMembers = catchAsyncError(async (req, res, next) => {
  const { members, chat_id } = req.body;
  const numofMembers = members.length;

  const group = await Chat.findOne({
    _id: chat_id,
    members: { $nin: members },
    isGroup: true,
  });

  if (!group) return next(new ErrorHandler("Group not found", 404));
  if (String(req.user._id) !== String(group.creator))
    return next(new ErrorHandler("Only group admin can remove member", 403));
  group.members.push(...members);
  await group.save();

  emitEvent(req, REFETCH_CHATS, {
    users: group.members,
  });

  emitEvent(req, ALERT, {
    users: members,
    message: `You are added into ${group.name}`,
  });

  res.status(200).json({
    success: true,
    message: numofMembers > 1 ? "Members added" : "Member added",
  });
});

export const removeMember = catchAsyncError(async (req, res, next) => {
  const { member, chat_id } = req.body;

  const group = await Chat.findOne({
    _id: chat_id,
    members: member,
    isGroup: true,
  });
  if (!group) return next(new ErrorHandler("Group not found", 404));
  if (!group.isGroup)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (String(req.user._id) !== String(group.creator))
    return next(new ErrorHandler("Only group admin can remove member", 403));
  const remainingMembers = getOtherMembers(group.members, member);

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members.", 422));

  group.members = remainingMembers;

  const [{ name }] = await Promise.all([User.findById(member), group.save()]);
  const message = `${name} has been removed from ${group.name}`;

  emitEvent(req, ALERT, {
    users: [member],
    message: `You are removed from ${group.name}`,
    chatId: chat_id,
    type: REMOVE_MEMBER_ALERT,
  });
  emitEvent(req, REFETCH_CHATS, { users: [...remainingMembers, member] });

  res.json({ success: true, message });
});

export const leaveGroup = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const group = await Chat.findOne({ _id: chat_id, isGroup: true });

  if (!group) return next(new ErrorHandler("Group not found", 404));

  const remainingMembers = getOtherMembers(group.members, req.user._id);
  console.log({ remainingMembers });
  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members.", 422));

  if (String(req.user._id) === String(group.creator)) {
    let randomMember = Math.floor(Math.random() * remainingMembers.length);
    group.creator = remainingMembers[randomMember];
  }

  group.members = remainingMembers;
  await group.save();
  emitEvent(req, ALERT, {
    users: remainingMembers,
    message: `${req.user.name} left the ${group.name}`,
  });

  const newAdmin = await User.findById(group.creator).select("name");
  if (!newAdmin)
    return next(new ErrorHandler("New Admin Member not found", 404));
  let messageForRealTime = {
    sender: {
      name: "Chatapp",
      _id: new mongoose.Types.ObjectId(),
      avatar: null,
    },
    content: newAdmin.name + " is now new group admin.",
    createdAt: new Date(),
  };

  await Message.create({
    sender: messageForRealTime.sender._id,
    content: messageForRealTime.content,
    chat: group._id,
  });

  emitEvent(req, MESSAGE_ALERT, {
    chatMessage: messageForRealTime,
    users: remainingMembers,
    chatId: group._id,
  });
  emitEvent(req, NEW_MESSAGE_COUNT_ALERT, {
    users: remainingMembers,
    chatId: group._id,
  });

  emitEvent(req, REFETCH_CHATS, {
    users: remainingMembers,
  });
  res.json({ success: true, message: "Leaved Successfully", remainingMembers });
});

export const deleteChat = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const chat = await Chat.findById(chat_id);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  // if (String(chat.creator) !== String(req.user._id_))
  //   return next(new ErrorHandler("You can't delete this chat.", 403));
  const otherMember = getOtherMembers(chat.members, req.user._id);
  //deleting comman Request between both useres
  await Request.findOneAndDelete({
    $or: [
      { sender: req.user._id, reciever: otherMember[0] },
      { reciever: req.user._id, sender: otherMember[0] },
    ],
  });
  await Chat.findByIdAndDelete(chat_id);
  await deleteChatMessagesAttachments(chat_id);
  await Message.deleteMany({ chat: chat_id });

  const promises = [];
  req.user.friends = req.user.friends.filter(
    (friend) => String(friend) !== String(otherMember[0])
  );
  const otherUser = await User.findById(otherMember[0]);
  otherUser.friends = otherUser.friends.filter(
    (friend) => String(friend) !== String(req.user._id)
  );

  promises.push(req.user.save(), otherUser.save());
  await Promise.all(promises);
  emitEvent(req, ALERT, {
    users: otherMember,
    message: `${req.user.name} has been deleted the chat.`,
  });
  emitEvent(req, REFETCH_CHATS, {
    users: [...otherMember],
  });

  res.json({ success: true, message: "Chat deleted successfully" });
});

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const files = req.files; // will use this during cloudinary config

  const { content } = req.body;

  const { chat_id } = req.params;

  const chat = await Chat.findById(chat_id).populate("members", "name");
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const chatName = chat.isGroup
    ? chat.name
    : getOtherMembers(chat.members, req.user._id, true)[0].name;

  const messageOFAttachmentsForDB = await Message.create({
    sender: req.user._id,
    chat: chat._id,
    content,
  });

  const messageOFAttachmentsForRealTime = {
    sender: { name: req.user.name, _id: req.user._id, avatar: req.user.avatar },
    chat: chat._id,
    content,
    createdAt: messageOFAttachmentsForDB.createdAt,
  };
  console.log(
    "message alert to ",
    chat.members.map((member) => member._id)
  );
  emitEvent(req, MESSAGE_ALERT, {
    users: chat.members.map((member) => member._id),
    chatMessage: messageOFAttachmentsForRealTime,
    chatId: chat._id,
  });
  emitEvent(req, NEW_MESSAGE_COUNT_ALERT, {
    users: getOtherMembers(
      chat.members.map((member) => member._id),
      req.user._id
    ),
    chatId: chat._id,
  });
  res.status(201).json({
    success: true,
    message: "sent successfully",
  });
});

export const deleteGroupChat = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const chat = await Chat.findById(chat_id);

  if (!chat || !chat.isGroup)
    return next(new ErrorHandler("Chat not found", 404));

  if (String(chat.creator) !== String(req.user._id))
    return next(
      new ErrorHandler("Only group creator can delete this group chat", 403)
    );

  const otherMembers = getOtherMembers(chat.members, req.user._id);
  const groupName = chat.name;
  await Chat.findOneAndDelete({ _id: chat_id });
  await deleteChatMessagesAttachments(chat_id);

  await Message.deleteMany({ chat: chat_id });

  emitEvent(req, ALERT, {
    users: otherMembers,
    message: `${groupName} has been deleted`,
    chatId: chat_id,
    type: DELETE_GROUP_ALERT,
  });
  emitEvent(req, REFETCH_CHATS, {
    users: [...otherMembers, req.user._id],
  });
  res.json({ success: true, message: "Group deleted successfully" });
});

export const getChatDetails = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const populate = req.query.populate;
  const me = req.user._id;
  let query = Chat.findById(chat_id);
  let chat = await query;
  if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
  const { members } = chat;
  if (!members.includes(String(req.user._id))) {
    return next(new ErrorHandler("You don't have access to this chat.", 401));
  }

  if (populate === "true") {
    query = query.clone().populate("members", "name avatar").lean();
    chat = await query;
    if (!chat.isGroup) {
      chat.name = getOtherMembers(chat.members, me, true)?.[0]?.name;
    }
  }
  res.json({ success: true, chat });
});

export const editGroupName = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  console.log({ name });
  const { chat_id } = req.params;
  const myId = req.user._id;
  const group = await Chat.findOne({ _id: chat_id, isGroup: true });
  if (!group) return next(new ErrorHandler("Group not found.", 404));
  if (String(group.creator) !== String(myId))
    return next(new ErrorHandler("Only group admin is allowed.", 403));
  group.name = name;
  await group.save();
  emitEvent(req, REFETCH_CHATS, {
    users: group.members,
  });
  res.json({ success: true, message: "Group name changed successfully" });
});

export const getMessages = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  console.log("gettmessage called");
  const me = req.user._id;
  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;
  const chat = await Chat.findById(chat_id);
  if (!chat) {
    return next(new ErrorHandler("Chat Not Found", 404));
  }
  if (!chat.members.includes(String(me))) {
    return next(new ErrorHandler("You don't have access to this chat", 401));
  }

  const dbQuery = Message.find({ chat: chat_id }).sort({ createdAt: -1 });

  const messagesCount = (await dbQuery).length;
  const totalPages = Math.ceil(messagesCount / limit);
  const totalMessages = messagesCount;

  const messages = (
    await dbQuery
      .clone()
      .populate("sender", "avatar name")
      .skip(skip)
      .limit(limit)
  ).reverse();

  res.json({
    success: true,
    totalMessages,
    messages,
    paginatedCount: messages.length,
    totalPages,
  });
});

export const sendAttachments = catchAsyncError(async (req, res, next) => {
  const files = req.files;
  const me = req.user._id;
  if (!files) return next(new ErrorHandler("Please provide attachments", 400));
  const { chat_id } = req.params;

  const chat = await Chat.findById(chat_id);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  let filesUri = files.map((file) => getDataUri(file));
  let attachments = [];
  for (let i of filesUri) {
    const myCloud = await cloudinaryInstance.v2.uploader.upload(i?.content, {
      folder: "Chat App Attachments",
      resource_type: "auto",
    });
    attachments.push({ url: myCloud.secure_url, public_id: myCloud.public_id });
  }
  let messageForDb = {
    chat: chat_id,
    attachments,
    sender: me,
    content: "",
  };

  const message = await Message.create(messageForDb);
  let messageForRealTime = {
    sender: { name: req.user.name, _id: req.user._id, avatar: req.user.avatar },
    attachments,
    createdAt: message.createdAt,
  };
  emitEvent(req, MESSAGE_ALERT, {
    chatMessage: messageForRealTime,
    users: chat.members,
    chatId: chat._id,
  });
  emitEvent(req, NEW_MESSAGE_COUNT_ALERT, {
    users: getOtherMembers(
      chat.members.map((member) => member._id),
      req.user._id
    ),
    chatId: chat._id,
  });
  res.json({ success: true, message: "Sent" });
});
