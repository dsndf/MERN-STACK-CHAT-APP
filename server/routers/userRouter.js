import express from "express";
import { singleAvatar } from "../middlewares/multer.js";
import {
  loginUser,
  signupUser,
  getMyProfile,
  searchUsers,
  sendFreindRequest,
  getMyNotifications,
  replyfriendRequest,
  logoutUser,
  getMyFriends,
} from "../controllers/user.js";
import { authentication } from "../middlewares/authentication.js";
import {
  getMyFriendsValidator,
  loginValidator,
  replyFriendRequestValidator,
  sendFriendRequestValidator,
  signupValidator,
} from "../validators/user.js";
import { validateHandler } from "../validators/validator.js";

export const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(singleAvatar, signupValidator(), validateHandler, signupUser);

userRouter.route("/login").post(loginValidator(), validateHandler, loginUser);

// Authenticated routing....

userRouter.use(authentication);

userRouter.route("/profile").get(getMyProfile);

userRouter.route("/search").get(searchUsers);

userRouter
  .route("/send/friend/request")
  .post(sendFriendRequestValidator(), validateHandler, sendFreindRequest);

userRouter.route("/notifications").get(getMyNotifications);

userRouter
  .route("/accept/friend/request/:id")
  .put(replyFriendRequestValidator(), validateHandler, replyfriendRequest);

userRouter.route("/logout").get(logoutUser);

userRouter.route("/friends").get(getMyFriends);
