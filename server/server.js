import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { customErrorHandler } from "./middlewares/customErrorHandler.js";
// import { ErrorHandler } from "./utils/ErrorHandler.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routers/userRouter.js";
import { chatRouter } from "./routers/chatRouter.js";
import { adminRouter } from "./routers/adminRouter.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { getOtherMembers, getSockets } from "./lib/helper.js";

import cors from "cors";
import cloudinary from "cloudinary";
import { socketAuthentication } from "./middlewares/socketAuthentication.js";
import {

  OFFLINE,
  ONLINE,
  START_TYPING,
  STOP_TYPING,
} from "./events/serverEvents.js";

// ............SEEDERS...........
// import { createUsers } from "./seeders/users.js";
import { createMessages } from "./seeders/messages.js";
import { Chat } from "./models/chat.js";
// ............**SEEDERS**...........

process.on("uncaughtException", (err) => {
  console.log("👿 " + err.message);
  process.exit(1);
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET"],
    credentials: true,
  },
});
dotenv.config({ path: "./.env" });
cloudinary.v2.config({
  api_key: 335345271554731,
  api_secret: "uy8krMwOc1IT9PCaP8O1S_NBcN8",
  cloud_name: "dt9cg0trl",
});
connectDB(process.env.MONGODB_URI);
//  createMessages(40);

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.DEPLOYED_SERVER_URL,
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/admin", adminRouter);

server.listen(port, () => {
  console.log("node environment is 🌲" + process.env.NODE_ENV);
  console.log("✌ Listening at ", port);
});
// Mapping between user id and socket id .............
export const usersSocket = new Map();
export const onlineUsers = new Set();

io.use((socket, next) => {
  cookieParser()(socket.request, null, async (err) => {
    await socketAuthentication(err, socket, next);
  });
});

io.on("connection", (socket) => {
  const user = socket.request.user;
  const userId = user._id;
  if (user) {
    usersSocket.set(String(user._id), socket.id);
    onlineUsers.add(String(user._id));
    const friendsockets = getSockets(user.friends);
    if (friendsockets.length > 0)
      io.to(friendsockets).emit(ONLINE, {
        onlineUsers: Array.from(onlineUsers),
      });
  }

  socket.on(START_TYPING, ({ chatId, members }) => {
    const otherMemberSockets = getSockets(getOtherMembers(members, userId));
    if(!otherMemberSockets.length) return;
    io.to(otherMemberSockets).emit("TYPING STARTED", { chatId });
  }); 
  socket.on(STOP_TYPING, ({ chatId, members }) => {
    const otherMemberSockets = getSockets(getOtherMembers(members, userId));
    if(!otherMemberSockets.length) return;
    io.to(otherMemberSockets).emit("TYPING STOPPED", { chatId });
  });

  socket.on("disconnect", (reason) => {
    const isDeleted = onlineUsers.delete(String(userId));
    if (isDeleted) console.log("user deleted");
    const friendsockets = getSockets(user.friends);
    if (friendsockets.length > 0) {
      io.to(friendsockets).emit(OFFLINE, {
        onlineUsers: Array.from(onlineUsers),
      });
    }
    console.log(socket.id + " disconnected due to " + reason);
    usersSocket.delete(String(userId));
  });
});

app.use(customErrorHandler); // added custom error handler as last middleware to use.

process.on("unhandledRejection", (err) => {
  server.close(() => {
    usersSocket.clear();
    console.log("🤔 Server closed due to " + err.message);
    process.exit(1);
  });
});
