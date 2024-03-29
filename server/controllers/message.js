import { emitEvent } from "../events/emitEvent";
import { REFETCH_CHAT_DETAILS } from "../events/eventTypes";
import { Chat } from "../models/chat";
import { Message } from "../models/message";
import { catchAsyncError } from "../utils/catchAsyncError";

export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { chatId } = req.query;
  const { members } = await Chat.findById(chatId);
  await Message.deleteOne({ _id: id });
  emitEvent(req, REFETCH_CHAT_DETAILS, { users: members });
  res.json({ success: true, message: "Message deleted successfully." });
});
