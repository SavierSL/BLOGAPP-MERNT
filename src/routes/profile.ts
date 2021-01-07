import express from "express";
import { auth } from "../middleware/auth";
import { ProfileCTRL } from "../controllers/profile";

const router = express.Router();

//@METHOD post
//@Make a Profile
//@api /profile/edit-profile
router.post("/edit-profile", auth, ProfileCTRL);

export default { router };
