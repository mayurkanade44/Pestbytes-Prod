import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverPicture: { type: String, require: true },
    comments: [CommentSchema],
    category: [
      {
        value: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
        label: { type: String, required: true },
      },
    ],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
