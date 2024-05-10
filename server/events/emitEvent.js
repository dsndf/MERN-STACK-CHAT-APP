import { usersSocket } from "../server.js";
import { MESSAGE_ALERT, OFFLINE, REFECTH_CHATS } from "./eventTypes.js";

export const emitEvent = (req, eventType, data, message) => {
  const { users, chatId, message: chatMessage } = data;
  const sockets = [];
  for (let id of users) {
    let socketId = usersSocket.get(String(id));
    if (socketId) sockets.push(socketId);
  }
  if (eventType === MESSAGE_ALERT) {
    req.io.to(sockets).emit(MESSAGE_ALERT, chatMessage);
  } else if (eventType === OFFLINE) {
    req.io.to(sockets).emit(OFFLINE);
  } else if (eventType === REFECTH_CHATS) {
    req.io.to(sockets).emit(REFECTH_CHATS,message);
  }
};
