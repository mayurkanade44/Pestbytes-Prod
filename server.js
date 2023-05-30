import path from "path";
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import blogRoutes from "./routes/blogRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);

app.listen(port, () => console.log(`Server started on port ${port}`));
