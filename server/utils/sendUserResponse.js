import { configureCookie } from "../lib/helper.js";

export const sendUserResponse = async (user, res, message) => {
  const chatifyToken = await user.generateAuthToken();
  user.password = undefined;
  res
    .cookie(
      "chatifyToken",
      chatifyToken,
      configureCookie(process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000, "none")
    )
    .json({
      success: true,
      message,
      user,
    });
};
