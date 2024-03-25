import express from "express";
import {
  createNewChat,
  createNewGroup,
  getMyChats,
  getMyGroups,
} from "../controllers/chat.js";
import { authentication } from "../middlewares/authentication.js";
export const chatRouter = express.Router();


chatRouter.use(authentication);

chatRouter.route("/new/group").post(createNewGroup);

chatRouter.route("/new/chat").post(createNewChat);

chatRouter.route("/my/chats").get(getMyChats);

chatRouter.route("/my/groups").get(getMyGroups);
