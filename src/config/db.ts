import mongoose from "mongoose";
import { settings } from "./settings";
const db: any = settings.mongoURI;

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1); //to process with failure
  }
};
