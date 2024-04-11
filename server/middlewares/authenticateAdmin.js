import { catchAsyncError } from "../utils/catchAsyncError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const authenticateAdmin = catchAsyncError(async (req, res, next) => {
  const token = req.cookies["chatIO-admin-token"];
  if (!token) return next(new ErrorHandler("Session expired", 401));
  const decodeToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
  if (!decodeToken?.id) return next(new ErrorHandler("Invalid token", 401));
  next();
});
