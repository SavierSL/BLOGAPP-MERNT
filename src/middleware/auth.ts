import jwt from "jsonwebtoken";
import { settings } from "../config/settings";
import { Res, Req, Nxt } from "../TS/types";

export const auth = (req: Req, res: Res, next: Nxt) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ msg: "There is no valid token" });
  }
  try {
    const decoded = jwt.verify(token, settings.jwtSecret);
    (req as any).user = (decoded as any).user;
    next();
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
