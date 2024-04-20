import {  tokenCookieOptions} from "../constants/cookie.js";

export const sendUserResponse = async (user, res, message) => {
  const chatIoToken = await user.generateAuthToken();
  user.password = undefined;

  res.cookie("chatIoToken", chatIoToken).json({
    success: true,
    message,
    user,
  });
};
