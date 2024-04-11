import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { getFileUrls } from "../lib/helper.js";

export const getAdminStats = catchAsyncError(async (req, res, next) => {
  const currentDay = new Date();
  const dayBeforeSevethDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [users, messages, singleChats, GroupChats, messagesInLastSevenDays] =
    await Promise.all([
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments({ isGroup: false }),
      Chat.countDocuments({ isGroup: true }),
      Message.aggregate([
        {
          $match: {
            createdAt: {
              $gt: dayBeforeSevethDay,
              $lte: currentDay,
            },
          },
        },
        {
          $group: {
            _id: {
              $dayOfWeek: "$createdAt",
            },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);
  res.json({
    success: true,
    users,
    messages,
    chats: singleChats + GroupChats,
    singleChats,
    GroupChats,
    messagesInLastSevenDays,
  });
});

export const getAllChats = catchAsyncError(async (req, res, next) => {
  const [chats] = await Promise.all([
    Chat.find()
      .populate("members", "avatar")
      .populate("creator", "name avatar")
      .lean(),
  ]);
  const allPromises = chats.map(async (chat) => {
    const totalMessages = await Message.countDocuments({ chat: chat._id });
    const avatar = getFileUrls(chat.members, "avatar");
    return {
      ...chat,
      avatar,
      totolMembers: chat.members.length,
      totalMessages,
    };
  });
  const allChats = await Promise.all(allPromises);
  res.json({ success: true, allChats });
});
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const [users] = await Promise.all([User.find().lean()]);
  const allPromises = users.map(async (user) => {
    const totalGroups = await Chat.countDocuments({
      $and: [{ isGroup: true }, { members: user._id }],
    });
    return {
      ...user,
      totalGroups,
    };
  });
  const allUsers = await Promise.all(allPromises);
  res.json({ success: true, allUsers });
});
export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find()
    .populate("sender", "name avatar")
    .lean();
  res.json({ success: true, messages });
});
