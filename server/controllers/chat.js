import { Types } from "mongoose";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const createNewGroup = catchAsyncError(async (req, res, next) => {
  const { name, members, isGroup } = req.body;
  if (!isGroup)
    return next(new ErrorHandler("Request denied to create group.", 400));
  if (!name) return next(new ErrorHandler("Group name is missing.", 400));
 
  const newGroup = await Chat.create({
    name ,
    isGroup,
    members,
    creator: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Group created successfully.",
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
