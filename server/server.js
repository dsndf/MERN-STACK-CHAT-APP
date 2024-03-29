import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { customErrorHandler } from "./middlewares/customErrorHandler.js";
import { ErrorHandler } from "./utils/ErrorHandler.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routers/userRouter.js";
import { chatRouter } from "./routers/chatRouter.js";
import { createUsers } from "./seeders/users.js";

process.on("uncaughtException", (err) => {
  console.log("👿 " + err.message);
  process.exit(1);
});

const app = express();
dotenv.config({ path: "./.env" });

connectDB(process.env.MONGODB_URI);
// createUsers(10);

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res, next) => {
  res.json({ success: true });
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
const server = app.listen(port, () => {
  console.log("node environment is 🌲" + process.env.NODE_ENV);
  console.log("✌ Listening at ", port);
});

app.use(customErrorHandler); // added custom error handler as last middleware to use.

process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("🤔 Server closed due to " + err.message);
    process.exit(1);
  });
});
