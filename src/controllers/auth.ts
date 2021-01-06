import { Res, Req, Nxt } from "../TS/types";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { settings } from "../config/settings";

export const logInUser: RequestHandler = async (req: Req, res: Res) => {
  const password = (req.body as { password: string }).password;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials / Password is wrong" });
    }
    //return jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, settings.jwtSecret, { expiresIn: 40000 }, (e, token) => {
      if (e) {
        throw e;
      } else {
        res.json({ token: token });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
