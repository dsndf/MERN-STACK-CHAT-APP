import { useEffect } from "react";
import { getSocket } from "../context/SocketApiContext";

export const useAddEvents = (...listeners) => {
  useEffect(() => {
    const socket = getSocket();
    for (let { event, eventHandler } of listeners) {
      socket.on(event, eventHandler);
    }
  }, []);
};
