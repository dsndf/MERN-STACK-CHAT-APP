import express from "express";
import {
  addMembers,
  createNewChat,
  createNewGroup,
  getMyChats,
  getMyGroups,
  deleteGroupChat,
  leaveGroup,
  removeMember,
  sendAttachments,
  deleteChat,
  getChatDetails
} from "../controllers/chat.js";
import { authentication } from "../middlewares/authentication.js";
import { multipleFiles } from "../middlewares/multer.js";
export const chatRouter = express.Router();

chatRouter.use(authentication);

chatRouter.route("/new/group").post(createNewGroup);

chatRouter.route("/new").post(createNewChat);

chatRouter.route("/my/chats").get(getMyChats);

chatRouter.route("/my/groups").get(getMyGroups);

chatRouter.route("/add/members/:group_id").patch(addMembers);

chatRouter.route("/remove/members/:group_id").patch(removeMember);

chatRouter.route("/leave/group/:group_id").patch(leaveGroup);

chatRouter.route("/delete/group/:group_id").delete(deleteGroupChat);

chatRouter.route("/send/message/:chat_id").post(multipleFiles,sendAttachments);

chatRouter.route("/:chat_id").get(getChatDetails).delete(deleteChat);

