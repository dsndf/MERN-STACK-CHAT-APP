import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { configureCookie, getFileUrls } from "../lib/helper.js";
import { sendAdminResponse } from "../utils/sendAdminResponse.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const adminLogin = catchAsyncError((req, res, next) => {
  const {
    passkey: { value },
  } = req.body;
  console.log({ value });
  if (value !== process.env.ADMIN_SECRET_KEY) {
    return next(new ErrorHandler("Invalid passkey", 400));
  }
  sendAdminResponse(res, "Logged in successfully");
});

export const adminLogout = catchAsyncError((req, res, next) => {
  res.clearCookie("chatify-admin-token", configureCookie(0, "none"));
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getAdminStats = catchAsyncError(async (req, res, next) => {
  const currentDay = new Date();
  const dayBeforeSevethDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [users, messages, singleChats, groupChats, messagesInLastSevenDays] =
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
            totalMessageCount: { $sum: 1 },
          },
        },
      ]),
    ]);
  let messagesPerDay = [];
  for (let i = 0; i < 7; i++) {
    messagesPerDay.push(messagesInLastSevenDays[i]?.totalMessageCount || 0);
  }
  res.json({
    success: true,
    users,
    messages,
    chats: singleChats + groupChats,
    singleChats,
    groupChats,
    messagesInLastSevenDays: messagesPerDay.reverse(),
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
      totalMembers: chat.members.length,
      totalMessages,
    };
  });
  const allChats = await Promise.all(allPromises);
  res.json({ success: true, allChats });
});
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const [users] = await Promise.all([User.find().lean()]);
  const allUsers = await Promise.all(
    users.map(async (user) => {
      console.log({user})
      const friendsData = user.friends?.map((id) =>
        User.findById(id).select("avatar")
      ) || [];
      const totalGroups = await Chat.countDocuments({
        $and: [{ isGroup: true }, { members: user._id }],
      });
      const friends = await Promise.all(friendsData);
      return {
        ...user,
        totalGroups,
        friends,
      };
    })
  );
  res.json({ success: true, allUsers });
});
export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find()
    .populate("sender", "name avatar")
    .lean();
  res.json({ success: true, messages });
});

export const adminVerifyAuth = catchAsyncError((req, res, next) => {
  const token = req.cookies["chatIO-admin-token"];
  if (!token)
    res.json({
      success: false,
      message: "Please login to go to dashboard.",
    });
  res.json({
    success: true,
  });
});
