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
import { listenSocketEvent, emitSocketEvent } from "./lib/helper.js";
import { faker } from "@faker-js/faker";
import cors from "cors";
import cloudinary from "cloudinary";

// ............SEEDERS...........
// import { createUsers } from "./seeders/users.js";
// import { createMessages } from "./seeders/messages.js";
// ............**SEEDERS**...........

process.on("uncaughtException", (err) => {
  console.log("👿 " + err.message);
  process.exit(1);
});

const app = express();
dotenv.config({ path: "./.env" });
cloudinary.v2.config({
  api_key: 335345271554731,
  api_secret: "uy8krMwOc1IT9PCaP8O1S_NBcN8",
  cloud_name: "dt9cg0trl",
});
connectDB(process.env.MONGODB_URI);

// createUsers(10);
// createMessages(15);
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

app.get("/", async (req, res, next) => {
  res.json({ success: true });
  
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/admin", adminRouter);
const server = createServer(app);
const io = new Server(server);
server.listen(port, () => {
  console.log("node environment is 🌲" + process.env.NODE_ENV);
  console.log("✌ Listening at ", port);
});
// Mapping between user id and socket id .............
const usersSocket = new Map();

// ESTABLISHING IO CONNECTION
io.use((socket, next) => {});
io.on("connection", (socket) => {
  console.log("Socket client user " + socket.id + " connected");
  const user = {
    _id: faker.internet.userName({}).slice(0, 3),
    name: "Gaurav jain",
  };
  console.log(user);
  usersSocket.set(user._id, socket.id);
  listenSocketEvent(
    socket,
    "MESSAGE",
    async ({ sender, content, members, chatId }) => {
      const messageForRealTime = {
        sender,
        content,
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      console.log({ members });
      const socketsId = members.map((id) => usersSocket.get(id));

      emitSocketEvent(socket, "RECIEVE_MESSAGE", messageForRealTime, {
        multipleUser: true,
        socketsId: socketsId,
      });
    }
  );

  listenSocketEvent(socket, "connected-message", (clientData) => {
    console.log(clientData);
    emitSocketEvent(socket, "WISH", "Welcome to chat app " + clientData, {});
  });

  socket.on("connected-message", (name) => {});
  socket.on("disconnect", (reason) => {
    console.log(socket.id + " disconnected due to " + reason);
  });
});

app.use(customErrorHandler); // added custom error handler as last middleware to use.

process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("🤔 Server closed due to " + err.message);
    process.exit(1);
  });
});
