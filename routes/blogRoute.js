import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  editComment,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  searchBlogs,
  updateBlog,
  uploadBlogImages,
} from "../controllers/blogController.js";
const router = express.Router();

router.route("/").post(authenticateUser, createBlog).get(getAllBlogs);
router.route("/search").get(searchBlogs)
router.route("/singleBlog/like/:id").patch(authenticateUser, likeBlog);
router.route("/blogImage").post(uploadBlogImages)

router
  .route("/singleBlog/:id")
  .get(getSingleBlog)
  .delete(authenticateUser, deleteBlog)
  .patch(authenticateUser, updateBlog);

router
  .route("/comment/:id")
  .post(authenticateUser, addComment)
  .patch(authenticateUser, editComment)
  .delete(authenticateUser, deleteComment);


export default router;
