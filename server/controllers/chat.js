import { Error, Types } from "mongoose";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { emitEvent } from "../events/emitEvent.js";

import { ALERT, MESSAGE_SENT, REFECTH_CHATS } from "../events/eventTypes.js";
import { getFileUrls, getOtherMembers } from "../lib/helper.js";
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

  emitEvent(req, ALERT, { users: members }, "Welcome to the" + name);
  emitEvent(req, REFECTH_CHATS, { users: members });

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
  let groups = await Chat.find({
    members: { $in: [user._id] },
    isGroup: true,
    creator: req.user._id,
  })
    .populate("members", "name avatar")
    .lean();
  groups = groups.map((group) => {
    return { ...group, avatar: getFileUrls(group.members, "avatar") };
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
  const { members } = req.body;
  const numofMembers = members.length;
  const { group_id } = req.params;
  const group = await Chat.findById(group_id);
  if (!group) return next(new ErrorHandler("Group not found", 404));
  group.members.push(...members);
  group.save();

  emitEvent(req, ALERT, { users: members }, `You are added into ${group.name}`);
  emitEvent(req, REFECTH_CHATS, { user: members });

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

  emitEvent(
    req,
    ALERT,
    {
      user: member,
    },
    `You are removed from ${group.name}`
  );
  emitEvent(req, REFECTH_CHATS, { user: member });

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
  emitEvent(
    req,
    ALERT,
    { users: remainingMembers },
    `${req.user.name} left the ${group.name}`
  );
  res.json({ success: true, message: "Leaved Successfully" });
});

export const deleteChat = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const chat = await Chat.findById(chat_id);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (String(chat.creator) !== String(req.user._id_))
    return next(new ErrorHandler("You can't delete this chat.", 403));
  const otherMember = getOtherMembers(chat.members, req.user._id);

  await Chat.findByIdAndDelete(chat_id);

  emitEvent(req, ALERT, `${req.user.name} has been deleted the chat.`, {
    users: otherMember,
  });
  emitEvent(req, REFECTH_CHATS, {
    users: [otherMember, req.user._id],
  });

  res.json({ success: true, message: "Leaved Successfully" });
});

export const sendAttachments = catchAsyncError(async (req, res, next) => {
  const files = req.files; // will use this during cloudinary config

  const { content } = req.body;

  const { chat_id } = req.params;

  const chat = await Chat.findById(chat_id);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const attachments = createAttachments(5);
  const chatName = chat.isGroup
    ? chat.name
    : getOtherMembers(chat.members, req.user._id)[0];

  const messageOFAttachmentsForRealTime = {
    sender: { name: req.user.name, _id: req.user._id },
    attachments: getFileUrls(attachments),
    chat: chat_id,
    content,
    createdAt: new Date(),
  };
  emitEvent(req, MESSAGE_SENT, `Message sent for chat ${chatName}`, {
    users: chat.members,
    message: messageOFAttachmentsForRealTime,
  });

  const messageOFAttachmentsForDB = await Message.create({
    sender: req.user._id,
    attachments,
    chat: chat_id,
    content,
  });
  res.status(201).json({
    success: true,
    message: "sent successfully",
    messageOFAttachmentsForDB,
  });
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
  await Chat.findOneAndDelete({ _id: group_id });
  emitEvent(req, ALERT, `${groupName} has been deleted`, {
    members: otherMembers,
  });
  emitEvent(req, REFECTH_CHATS, {
    users: [...otherMembers, req.user._id],
  });
  res.json({ success: true, message: "Group deleted successfully" });
});

export const getChatDetails = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const populate = req.query.populate;
  let query = Chat.findById(chat_id);

  let { members } = await query.select("+members");

  if (!members.includes(String(req.user._id))) {
    return next(new ErrorHandler("You are not the member of this chat.", 403));
  }

  if (populate === "true") {
    query = query.clone().populate("members", "name avatar").lean();
  }
  let chat = await query;

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  res.json({ success: true, chat });
});

export const editGroupName = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const { group_id } = req.params;
  const myId = req.user._id;
  const group = await Chat.findById(group_id);
  if (!group) return next(new ErrorHandler("Group not found.", 404));
  if (String(group.creator) !== String(myId))
    return next(new ErrorHandler("Only group admin is allowed.", 403));
  group.name = name;
  await group.save();
  emitEvent(req, REFECTH_CHATS, {
    users: group.members,
  });
  res.json({ success: true, message: "Group name changed successfully" });
});

export const getMessages = catchAsyncError(async (req, res, next) => {
  const { chat_id } = req.params;
  const me= req.user._id;

  const chat = await Chat.findById(chat_id);
  if (!chat.members.includes(me)) {
    return next(new ErrorHandler("You don't have access to this chat", 403));
  }
  const messages = await Message.find({ chat: chat_id });
  const totalMessages = messages.length;
  res.json({ success: true,totalMessages, messages });
});
