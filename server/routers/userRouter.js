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
} from "../controllers/user.js";
import { authentication } from "../middlewares/authentication.js";
import { loginValidator, signupValidator } from "../validators/user.js";
import { validator } from "../validators/validator.js";

export const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(singleAvatar, signupValidator(), validator, signupUser);

userRouter.route("/login").post(loginValidator(),validator,loginUser);

// Authenticated routing....

userRouter.use(authentication);

userRouter.route("/profile").get(getMyProfile);

userRouter.route("/search").get(searchUsers);

userRouter.route("/send/friend/request").post(sendFreindRequest);

userRouter.route("/notifications").get(getMyNotifications);

userRouter.route("/reply/friend/request/:id").patch(replyfriendRequest);

userRouter.route("/logout").get(logoutUser);
