import { RequestHandler } from "express";
import { BlogPost, IBlogPost } from "../models/BlogPost";
import { User, IUser } from "../models/User";
import { validationResult } from "express-validator";
import { Req, Res, Nxt } from "../TS/types";
import { ObjectID } from "mongodb";

//POST A BLOGPOST
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

//DELETE POST
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

//LIKE
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
    let newLikes = [];
    const isLiked = post.likes!.filter((like) => {
      const likeID: string = (like as any)._id.toString();
      return likeID === userID;
    });

    if (isLiked?.length !== 0) {
      newLikes = post.likes!.filter((like) => {
        const likeID = (like as any)._id.toString();
        return likeID !== userID;
      });
      post.likes = newLikes;
      await post.save();
      return res.json(post);
    }
    (post as any).likes?.push(user);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//COMMENT IN POST
export const BlogPostCommentCTRL: RequestHandler = async (
  req: Req,
  res: Res
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const postID = (req.params as { post_id: string }).post_id;
  const userID = (req as any).user.id;
  try {
    let post: IBlogPost | null = await BlogPost.findByIdAndUpdate(postID);
    const user: IUser | null = await User.findOne({ _id: userID }).select(
      "-password"
    );
    if (!post) {
      return res.status(400).json({ msg: "Can't find post" });
    }
    const newComment = {
      id: new ObjectID(),
      name: user!.name,
      avatar: user!.avatar,
      user: userID,
      date: new Date().toISOString(),
      likes: [],
      ...req.body,
    };
    (post as any).comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//DELETE A COMMENT
export const BlogPostDeleteCommentCTRL = async (req: Req, res: Res) => {
  const postID = (req.params as { post_id: string }).post_id;
  const commentIDtoDelete = (req.params as { comment_id: string }).comment_id;
  try {
    let post = await BlogPost.findByIdAndUpdate(postID);
    if (!post) {
      return res.status(400).json({ msg: "Can't find post ID" });
    }
    const newComments = post!.comments!.filter((comment) => {
      const commentID = (comment as any).id.toString();
      return commentID !== commentIDtoDelete;
    });
    post.comments = newComments;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
