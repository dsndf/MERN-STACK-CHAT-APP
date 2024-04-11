import jwt from "jsonwebtoken";
import crypto from "crypto";
import { tokenCookieOptions } from "../constants/cookie.js";
export const sendAdminResponse = async (res, message) => {
  const randomId = crypto.randomBytes(4).toString("hex");
  const token = jwt.sign({ id: randomId }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: process.env.ADMIN_TOKEN_EXPIRY, 
  });
  res.cookie("chatIO-admin-token", token ,tokenCookieOptions);
  res.json({ success: true, message });
};
