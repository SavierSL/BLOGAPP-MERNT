import express from "express";
import { auth } from "../middleware/auth";
import { check } from "express-validator";
import { BlogPostCTRL } from "../controllers/postCtrl";
const router = express.Router();
//@METHOD post
//@Register
//@api /post/blog-post
router.post("/blog-post", [
  auth,
  check("title", "Title is required").not().isEmpty(),
  check("blogContent", "Blog Content is required").not().isEmpty(),
  BlogPostCTRL,
]);

export default { router };
