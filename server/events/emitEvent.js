import { getSockets } from "../lib/helper.js";
import { MESSAGE_ALERT, OFFLINE, REFETCH_CHATS } from "./serverEvents.js";

export const emitEvent = (req, eventType, data) => {
  const { users, message } = data;
  const sockets = getSockets(users);
  console.log({ sockets });
  if (!sockets.length) return;
  if (eventType === REFETCH_CHATS) {
    req.io.to(sockets).emit(REFETCH_CHATS, message);
  } else req.io.to(sockets).emit(eventType, data);
};
