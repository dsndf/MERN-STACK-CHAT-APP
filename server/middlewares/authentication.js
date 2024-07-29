import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const authentication = catchAsyncError(async (req, res, next) => {
  const { chatifyToken } = req.cookies;
  console.log({ chatifyToken });
  if (!chatifyToken) return next(new ErrorHandler("Session Expired.", 401));

  const decodeToken = jwt.verify(chatifyToken, process.env.SECRET_KEY);
  if (!decodeToken?._id)
    return next(
      new ErrorHandler("Invalid Token or Token has been expired.", 401)
    );
  req.user = await User.findById(decodeToken._id);
  if (!req.user) return next(new ErrorHandler("Invalid Token", 401));
  next();
});
