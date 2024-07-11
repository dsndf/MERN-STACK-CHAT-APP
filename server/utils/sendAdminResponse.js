import jwt from "jsonwebtoken";
import crypto from "crypto";
import { configureCookie } from "../lib/helper.js";

export const sendAdminResponse = (res, message) => {
  const uniqueId = crypto.randomUUID();
  const token = jwt.sign({ id: uniqueId }, process.env.ADMIN_SECRET_KEY);
  res.cookie(
    "chatIO-admin-token",
    token,
    configureCookie(process.env.ADMIN_TOKEN_EXPIRY * 24 * 3600000, "none")
  );
  res.json({ success: true, message });
};
