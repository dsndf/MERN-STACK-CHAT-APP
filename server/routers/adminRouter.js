import express from "express";
import {
  getAdminStats,
  getAllChats,
  getAllMessages,
  getAllUsers,
} from "../controllers/admin.js";
import { checkAdminAuthorization, validateAdminLogin } from "../validators/user.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";
import { validateHandler } from "../validators/validator.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendAdminResponse } from "../utils/sendAdminResponse.js";

export const adminRouter = express.Router();

adminRouter.route("/stats").get(getAdminStats);
adminRouter.route("/chats").get(getAllChats);
adminRouter.route("/users").get(getAllUsers);
adminRouter.route("/messages").get(authenticateAdmin,getAllMessages);
adminRouter.route("/login").post(validateAdminLogin(),validateHandler,catchAsyncError(async (req,res,next)=>{
const {passkey} = req.body;
if(!passkey === process.env.ADMIN_SECRET_KEY){
 return next(new ErrorHandler("Invalid passkey",400));
}
await sendAdminResponse(res,"Logged in successfully");
}));
