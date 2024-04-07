import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const getAdminStats = catchAsyncError(async (req, res, next) => {
  const [totalUsers, totalMessages, totalChats, pipelineResult, lastSevenDays] =
    await Promise.all([
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
      Chat.aggregate([
        { $match: { isGroup: true } },
        { $group: { _id: "$isGroup", total: { $sum: 1 } } },
      ]),
      Message.aggregate([
      
        { $group: { _id: { $dayOfWeek: "createdAt" }, count: { $sum: 1 } } },
      ]),
    ]);

  const totalGroupChats = pipelineResult[0].total;
  res.json({
    success: true,
    totalUsers,
    totalMessages,
    totalChats,
    totalGroupChats,
    totalSingleChats: totalChats - totalGroupChats,
    lastSevenDays,
  });
});
