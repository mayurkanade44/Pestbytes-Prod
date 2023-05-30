import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/djc8opvcg/image/upload/v1683786516/Pestbytes/Avatar/profile_lqcjqg.png",
    },
    aboutMe: { type: String },
    socialLinks: { type: Object },
    verificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true, toObject: { virtuals: true } }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.virtual("blogs", {
  ref: "Blog",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("likes", {
  ref: "Blog",
  localField: "_id",
  foreignField: "likes",
});

export default mongoose.model("User", UserSchema);
