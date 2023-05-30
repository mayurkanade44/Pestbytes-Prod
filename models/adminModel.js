import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    category: { type: String },
    ad: {
      image: { type: String },
      link: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
