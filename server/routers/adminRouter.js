import express from "express";
import {
  adminLogin,
  getAdminStats,
  getAllChats,
  getAllMessages,
  getAllUsers,
  adminLogout,
} from "../controllers/admin.js";
import { validateAdminLogin } from "../validators/user.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";
import { validateHandler } from "../validators/validator.js";

export const adminRouter = express.Router();
adminRouter
  .route("/login")
  .post(validateAdminLogin(), validateHandler, adminLogin);

adminRouter.use(authenticateAdmin);

adminRouter.route('/verify/auth').get()
adminRouter.route("/logout").get(adminLogout);
adminRouter.route("/stats").get(getAdminStats);
adminRouter.route("/chats").get(getAllChats);
adminRouter.route("/users").get(getAllUsers);
adminRouter.route("/messages").get(authenticateAdmin, getAllMessages);
