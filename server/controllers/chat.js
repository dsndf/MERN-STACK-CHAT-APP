import { Types } from "mongoose";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { emitEvent } from "../events/emitEvent.js";

import {
  CHAT_DELETED,
  GROUP_CREATED,
  GROUP_DELETED,
  LEAVE_GROUP,
  MEMBER_REMOVED,
  MESSAGE_SENT,
  REFECTH_CHATS,
} from "../events/eventTypes.js";
import { getOtherMembers } from "../lib/helper.js";
import { Message } from "../models/message.js";
import { createAttachments } from "../seeders/messages.js";

export const createNewGroup = catchAsyncError(async (req, res, next) => {
  let { name, members, isGroup } = req.body;
  members = [...members, req.user._id];
  if (!isGroup)
    return next(new ErrorHandler("Request denied to create group.", 400));
  if (!name) return next(new ErrorHandler("Group name is missing.", 400));

  if (members.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members.", 422));

  const newGroup = await Chat.create({
    name,
    isGroup,
    members,
    creator: req.user._id,
  });

  emitEvent(req, GROUP_CREATED, "Welcome to the" + name);
  emitEvent(req, REFECTH_CHATS, "Refreshed");

  res.status(201).json({
    success: true,
    message: "Group created successfully.",
    newGroup,
  });
});

export const getMyChats = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  let chats = await Chat.find({ members: { $in: [user._id] } }).populate(
    "members",
    "name avatar"
  );

  chats = chats.map((chat) => {
    let membersAvatars = chat.members.reduce(
      (acc, member) => [...acc, member.avatar],
      []
    );

    let singleReciever =
      !chat.isGroup &&
      chat.members.find((member) => {
        if (String(member._id) !== String(user._id)) return member;
      });
    console.log({ singleReciever });
    return {
      isGroup: chat.isGroup,
      name: singleReciever ? singleReciever.name : chat.name,
      avatar: singleReciever ? [singleReciever.avatar] : membersAvatars,
      _id: chat._id,
    };
  });

  res.json({ success: true, chats });
});
export const getMyGroups = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const groups = await Chat.find({
    members: { $in: [user._id] },
    isGroup: true,
  }).populate("members", "name avatar");

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
  const { members } = req.body;
  const numofMembers = members.length;
  const { group_id } = req.params;
  const group = await Chat.findById(group_id);
  if (!group) return next(new ErrorHandler("Group not found", 404));
  group.members.push(...members);
  group.save();
  res.status(201).json({
    success: true,
    message: numofMembers > 1 ? "members added" : "member added",
  });
});

export const removeMember = catchAsyncError(async (req, res, next) => {
  const { group_id } = req.params;
  const { member } = req.body;

  const group = await Chat.findById(group_id);
  if (!group) return next(new ErrorHandler("Group not found", 404));
  if (!group.isGroup)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (req.user._id !== group.creator)
    return next(new ErrorHandler("Only group admin can remove member", 403));
  const remainingMembers = getOtherMembers(chat.members, member);

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members.", 422));

  group.members = remainingMembers;

  const [{ name }] = await Promise.all([User.findById(member), group.save()]);
  const message = `${name} has been removed from ${group.name}`;

  emitEvent(req, MEMBER_REMOVED, `You are removed from ${group.name}`, {
    member,
  });

  res.json({ success: true, message });
});

export const leaveGroup = catchAsyncError(async (req, res, next) => {
  const { group_id } = req.params;
  const group = await Chat.findById(group_id);

  if (!group) return next(new ErrorHandler("Group not found", 404));
  if (!group.isGroup)
    return next(new ErrorHandler("This is not a group chat", 400));

  const remainingMembers = getOtherMembers(group.members, req.user._id);

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members.", 422));

  if (req.user._id === group.creator) {
    group.creator = remainingMembers[0];
  }

  group.members = remainingMembers;
  await group.save();

  emitEvent(req, LEAVE_GROUP, `${req.user.name} left the ${group.name}`, {
    remainingMembers,
  });

  res.json({ success: true, message: "Leaved Successfully" });
});

export const deleteChat = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const chat = await Chat.findById(chat_id);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (String(chat.creator) !== String(req.user._id_))
    return next(new ErrorHandler("You can't delete this chat.", 403));
  const otherMember = getOtherMembers(chat.members, req.user._id)[0];

  await Chat.findByIdAndDelete(chat_id);

  emitEvent(req, CHAT_DELETED, `${req.user.name} has been deleted the chat.`, {
    member: otherMember,
  });

  res.json({ success: true, message: "Leaved Successfully" });
});

export const sendAttachments = catchAsyncError(async (req, res, next) => {
  const files = req.files;
  const { content } = req.body;

  const { chat_id } = req.params;

  const chat = await Chat.findById(chat_id);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const attachments = createAttachments(5);
  const chatName = chat.isGroup
    ? chat.name
    : getOtherMembers(chat.members, req.user._id)[0];

  const genrateMessageOFAttachmentsForRealTime = {
    sender: { name: req.user.name, _id: req.user._id },
    attachments,
    chat: chat_id,
    content,
    createdAt: new Date(),
  };
  emitEvent(req, MESSAGE_SENT, `Message sent for chat ${chat}`, {
    members: chat.members,
  });

  const genrateMessageOFAttachmentsForDB = await Message.create({
    sender: req.user._id,
    attachments,
    chat: chat_id,
    content,
  });
  res.status(201).json({ success: true, message: "sent successfully" });
});

export const deleteGroupChat = catchAsyncError(async (req, res, next) => {
  const { group_id } = req.params;
  const chat = await Chat.findById(group_id);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.isGroup)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (String(chat.creator) !== String(req.user._id))
    return next(new ErrorHandler("You can't delete this chat.", 403));

  const otherMembers = getOtherMembers(chat.members, req.user._id);
  const groupName = chat.name;
  await Chat.findOneAndDelete({_id:group_id});
  emitEvent(req, GROUP_DELETED, `${groupName} has been deleted`, {
    members: otherMembers,
  });
  res.json({ success: true, message: "Group deleted successfully" });
});
