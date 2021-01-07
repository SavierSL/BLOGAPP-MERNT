import mongoose, { model, Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface IProfile extends Document {
  hobbies?: string[];
  favourites?: string[];
  feautredBlogs?: object[];
  followers?: object[];
  following?: object[];
  blogs?: object[];
}

const BlogPostProfileSchema: Schema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  hobbies: {
    type: Array,
  },
  favourites: {
    type: Array,
  },
  featuredBlogs: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  followeing: {
    type: Array,
  },
  blogs: {
    type: Array,
  },
});

export const Profile: Model<IProfile> = model("profile", BlogPostProfileSchema);
