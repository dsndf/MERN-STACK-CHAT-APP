import express from "express";
import {
  adminLogin,
  getAdminStats,
  getAllChats,
  getAllMessages,
  getAllUsers,
  adminLogout,
} from "../controllers/admin.js";
import {
  checkAdminAuthorization,
  validateAdminLogin,
} from "../validators/user.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";
import { validateHandler } from "../validators/validator.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendAdminResponse } from "../utils/sendAdminResponse.js";

export const adminRouter = express.Router();

adminRouter.route("/stats").get(getAdminStats);
adminRouter.route("/chats").get(getAllChats);
adminRouter.route("/users").get(getAllUsers);
adminRouter.route("/messages").get(authenticateAdmin, getAllMessages);
adminRouter
  .route("/login")
  .post(validateAdminLogin(), validateHandler, adminLogin);
adminRouter.route("/logout").get(authenticateAdmin, adminLogout);
