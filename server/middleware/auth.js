import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
    }
    await User.findById(userId)
      .select("-password")
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({
              success: false,
              message: "Not authorized, user not found",
            });
        }
        req.user = user;
        next();
      });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};
