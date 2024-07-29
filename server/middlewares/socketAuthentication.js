import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { User } from "../models/user.js";
export const socketAuthentication = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const req = socket.request;
    const token = req.cookies["chatifyToken"];
    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken?._id) return next(new ErrorHandler("Invalid token", 401));
    const user = await User.findById(decodeToken._id);
    if (!user) return next(new ErrorHandler("Invalid token", 401));
    socket.request.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
