import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";
import { scoketIoServer, server } from "../config/settings";
import { useDispatchAndSelector } from "../hooks/useDispatchAndSelector";
import toast from "react-hot-toast";
export const SocketContext = createContext();
const SocketApiContext = ({ children }) => {
  const [socketId, setSocketId] = useState("");
  const {
    state: { isAuth },
  } = useDispatchAndSelector("auth");
  const socket = useMemo(() => {
    return io(scoketIoServer, { withCredentials: true, autoConnect: false });
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      toast.success(socket.id + " connected");
      setSocketId(socket.id);
    });
    socket.on("disconnect", (reason) => {
      toast.success("Disconnected");
    });
    socket.on("connect_error", async (err) => {
      toast.error(err.message);
    });
  }, []);
  useEffect(() => {
    if (isAuth) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [isAuth]);
  return (
    <SocketContext.Provider value={{ socket, setSocketId, socketId }}>
      {children}
    </SocketContext.Provider>
  );
};

export default memo(SocketApiContext);
export const getSocket = () => useContext(SocketContext).socket;
export const getSocketId = () => useContext(SocketApiContext).socketId;
