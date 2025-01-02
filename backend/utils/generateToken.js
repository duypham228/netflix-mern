import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attchs cross-site scripting attacks, make it not accessible via JavaScript
    sameSite: "strict", // CSRF attacks, only allow requests from the same origin
    secure: process.env.NODE_ENV !== "development", // only send cookie over HTTPS in production
  });

  return token;
};
