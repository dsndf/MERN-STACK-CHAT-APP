import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { sendUserResponse } from "../utils/sendUserResponse.js";
import { validatePassword } from "../utils/validatePassword.js";

export const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, username, bio, password } = req.body;
  const file = req.file;
  console.log(Object.keys(file));

  const isExist = await User.findOne({ username });

  if (isExist) next(new ErrorHandler("User already exists.", 409));

  const user = await User.create({ name, username, bio, password });
  res.statusCode = 201;

  sendUserResponse(user, res, "Signed up seccessfully");
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Username", 400));
  if (!(await validatePassword(user.password, password)))
    return next(new ErrorHandler("Invalid Password", 400));
  sendUserResponse(user, res, "Logged in successfully");
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;

  const profile = await User.findById(me);
  if (!profile) {
    return next(new ErrorHandler("Profile not found", 404));
  }

  res.json({ success: true, profile });
});
