import { getSockets } from "../lib/helper.js";
import { MESSAGE_ALERT, OFFLINE, REFETCH_CHATS } from "./serverEvents.js";

export const emitEvent = (req, eventType, data, messageToClient) => {
  const { users, chatId, chatMessage } = data;
  const sockets = getSockets(users);
  console.log({sockets})
  if (!sockets.length) return;
  if (eventType === MESSAGE_ALERT) {
    req.io.to(sockets).emit(MESSAGE_ALERT, { chatMessage, chatId });
  } else if (eventType === OFFLINE) {
    req.io.to(sockets).emit(OFFLINE);
  } else if (eventType === REFETCH_CHATS) {
    req.io.to(sockets).emit(REFETCH_CHATS, messageToClient);
  }
};
