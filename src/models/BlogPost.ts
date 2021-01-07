import mongoose, { model, Schema, Model, Document } from "mongoose";
import { ObjectID } from "mongodb";

export interface IBlogPost extends Document {
  user: ObjectID;
  name: string;
  title: string;
  blogContent: string;
  comments?: object[];
  likes?: object[];
  date: string;
  img: string;
}
const BlogPostSchema: Schema = new mongoose.Schema({
  user: {
    type: ObjectID,
    ref: "user",
  },
  name: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  blogContent: {
    type: String,
    required: true,
    trimg: true,
  },
  img: {
    type: String,
    default: "",
  },
  comments: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  date: {
    type: Date,
    default: new Date().toISOString(),
  },
});

export const BlogPost: Model<IBlogPost> = model("blogpost", BlogPostSchema);
