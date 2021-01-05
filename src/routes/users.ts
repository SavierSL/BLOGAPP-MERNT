import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { registerUser } from "../controllers/users";

const router = express.Router();

//@METHOD post
//@Register
//@api /users/register
router.post(
  "/register",
  [
    check("name", "Text is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required and must be 6 chars")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
  registerUser
);

export default { router };
