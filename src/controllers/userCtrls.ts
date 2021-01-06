import { Request, Response, NextFunction, RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Req, Res, Nxt } from "../TS/types";
import { settings } from "../config/settings";
import { IUser } from "../models/User";

export const registerUserCTRL: RequestHandler = async (req: Req, res: Res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ msg: errors.array() });
  }
  const email = (req.body as { email: string }).email;
  const password = (req.body as { password: string }).password;
  const name = (req.body as { name: string }).name;
  const date = (req.body as { date: string }).date;
  try {
    let user: IUser | null = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    //Get users gravatar
    const avatar = gravatar.url(email, {
      s: "200", // size
      r: "pg", // rating to pg so no naked people
      d: "mm", // there is a default if no image
    });
    user = new User({
      name,
      email,
      password,
      avatar,
      date,
    });
    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //Return the jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    //token
    jwt.sign(payload, settings.jwtSecret, { expiresIn: 400000 }, (e, token) => {
      if (e) {
        throw e;
      } else {
        res.json(token);
      }
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
