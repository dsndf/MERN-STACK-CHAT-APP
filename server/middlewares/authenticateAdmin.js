import { catchAsyncError } from "../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const authenticateAdmin = catchAsyncError(async (req, res, next) => {
  const token = req.cookies["chatify-admin-token"];
  if (!token) return next(new ErrorHandler("Session expired", 401));
  console.log(process.env.ADMIN_SECRET_KEY);
  const decodeToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
  if (!decodeToken?.id) return next(new ErrorHandler("Invalid token", 401));
  return next();
});
