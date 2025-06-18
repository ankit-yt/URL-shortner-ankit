import { verifyToken } from "../utility/helper.js";
import { findUserById } from "../dao/user.dao.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decode = verifyToken(token);
    const user = await findUserById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return next();

    const decode = verifyToken(token);
    const user = await findUserById(decode.id);

    if (user) {
      req.user = user;
    }

    next();
  } catch (err) {
    next();
  }
};
