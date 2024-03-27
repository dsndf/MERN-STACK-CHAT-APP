import { cookieOptions } from "../constants/cookie.js";

export const sendUserResponse = async (user, res, message) => {
  const chatIoToken = await user.generateAuthToken();
  user.password = undefined;

  res.cookie("chatIoToken", chatIoToken, cookieOptions).json({
    success: true,
    message,
    user,
  });
};
