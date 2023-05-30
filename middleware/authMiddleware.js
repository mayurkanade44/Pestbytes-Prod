import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "Authentication Invalid" });

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Authentication Invalid" });
    }
  } else {
    res.status(401).json({ msg: "Authentication Invalid" });
  }
};
