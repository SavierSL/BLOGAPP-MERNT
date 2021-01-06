import express, { Router } from "express";
import { Res, Req, Nxt } from "../TS/types";
import { User } from "../models/User";
import { auth } from "../middleware/auth";
import { logInUser } from "../controllers/auth";
const router = express.Router();

//@METHOD post
//@LogIn
//@api /auth
router.post("/login", logInUser);
export default { router };
