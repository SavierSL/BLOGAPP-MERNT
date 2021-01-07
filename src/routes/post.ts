import express from "express";
import { auth } from "../middleware/auth";
import { check } from "express-validator";
import {
  BlogPostCTRL,
  BlogPostDeleteCTRL,
  BlogPostLikeCTRL,
  BlogPostCommentCTRL,
  BlogPostDeleteCommentCTRL,
} from "../controllers/postCtrl";
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

//@METHOD post
//@Delete Post
//@api /post/blog-post/:post_id
router.delete("/blog-post/:post_id", auth, BlogPostDeleteCTRL);

//@METHOD post
//@Like Post
//@api
router.patch("/blog-post/:post_id", auth, BlogPostLikeCTRL);

//@METHOD post
//@Comment in Post
//@api /post/blog-post/comment/:post_id
router.post(
  "/blog-post/comment/:post_id",
  [auth, check("comment", "Comment should not be empty").not().isEmpty()],
  BlogPostCommentCTRL
);

//@METHOD delete
//@Delete a comment in Post
//@api /post/blog-post/comment/:post_id/:comment_id
router.delete(
  "/blog-post/comment/:post_id/:comment_id",
  auth,
  BlogPostDeleteCommentCTRL
);

export default { router };
