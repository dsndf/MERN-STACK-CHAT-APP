import { useEffect } from "react";
import { getSocket } from "../context/SocketApiContext";

export const useAddEvents = (...listeners) => {
  const socket = getSocket();
  useEffect(() => {
    for (let { event, eventHandler } of listeners) {
      socket.on(event, eventHandler);
    }
    return () => {
      for (let { event, eventHandler } of listeners) {
        socket.off(event, eventHandler);
      }
    };
  }, []);
};
