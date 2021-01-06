import { RequestHandler } from "express";
import { BlogPost, IBlogPost } from "../models/BlogPost";
import { User, IUser } from "../models/User";
import { validationResult } from "express-validator";
import { Req, Res, Nxt } from "../TS/types";
import { ObjectID } from "mongodb";

export const BlogPostCTRL: RequestHandler = async (req: Req, res: Res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const title = (req.body as { title: string }).title;
  const blogContent = (req.body as { blogContent: string }).blogContent;
  const userID = ((req as any).user as { id: string }).id;
  try {
    const user: IUser | null = await User.findById(userID).select("-password");
    console.log(userID);

    if (!user) {
      return res.status(400).json({ msg: "Can't find user" });
    }
    const post = {
      user: user,
      name: user.name,
      title: title,
      blogContent: blogContent,
    };
    const newPost: IBlogPost = new BlogPost(post);
    newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const BlogPostDeleteCTRL: RequestHandler = async (
  req: Req,
  res: Res
) => {
  const blogPostID = (req.params as { post_id: string }).post_id;
  try {
    const postToDelete: IBlogPost | null = await BlogPost.findByIdAndDelete(
      blogPostID
    );
    if (!postToDelete) {
      return res.status(400).json({ msg: "There is no post to delete" });
    }
    res.json({ msg: "Deleted", deleted: postToDelete });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const BlogPostLikeCTRL: RequestHandler = async (req: Req, res: Res) => {
  const blogPostID = req.params.post_id;
  const userID = ((req as any).user as { id: string }).id;
  try {
    let post: IBlogPost | null = await BlogPost.findOne({ _id: blogPostID });
    const user: IUser | null = await User.findOne({ _id: userID }).select(
      "-password"
    );
    if (!post) {
      return res.status(400).json({ msg: "Invalid psot ID" });
    }
    post.likes?.push(user!);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
