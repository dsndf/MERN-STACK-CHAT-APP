import express from "express";
import {
  addMembers,
  createNewGroup,
  getMyChats,
  getMyGroups,
  deleteGroupChat,
  leaveGroup,
  removeMember,
  sendMessage,
  deleteChat,
  getChatDetails,
  editGroupName,
  getMessages,
  sendAttachments,
} from "../controllers/chat.js";

import { authentication } from "../middlewares/authentication.js";
import { multipleFiles } from "../middlewares/multer.js";

import {
  addMembersValidator,
  chatIdValidator,
  createGroupValidator,
  editGroupNameValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  sendMessageValidator,
} from "../validators/chat.js";

import { validateHandler } from "../validators/validator.js";
export const chatRouter = express.Router();

chatRouter.use(authentication);
chatRouter
  .route("/new/group")
  .post(createGroupValidator(), validateHandler, createNewGroup);
// chatRouter.route("/new").post(createNewChat); // need a look
chatRouter.route("/my/chats").get(getMyChats);
chatRouter.route("/my/groups").get(getMyGroups);
chatRouter
  .route("/add/members")
  .put(addMembersValidator(), validateHandler, addMembers);
chatRouter
  .route("/remove/member")
  .put(removeMemberValidator(), validateHandler, removeMember);
chatRouter
  .route("/send/message/:chat_id")
  .post(sendMessageValidator(), validateHandler, sendMessage);
chatRouter
  .route("/edit/group/name/:chat_id")
  .put(editGroupNameValidator(), validateHandler, editGroupName);
chatRouter
  .route("/:chat_id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .delete(chatIdValidator(), validateHandler, deleteChat);
chatRouter
  .route("/leave/group/:chat_id")
  .put(chatIdValidator(), validateHandler, leaveGroup);
chatRouter
  .route("/delete/group/:chat_id")
  .delete(chatIdValidator(), validateHandler, deleteGroupChat);
chatRouter
  .route("/messages/:chat_id")
  .get(chatIdValidator(), validateHandler, getMessages);

chatRouter
  .route("/send/attachments/:chat_id")
  .post(
    multipleFiles,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
  );
