import mongoose from "mongoose";
import Blog from "../models/blogModel.js";
import { capitalLetter, uploadImage } from "../utils/helpers.js";

export const createBlog = async (req, res) => {
  const { title, body, category } = req.body;
  try {
    if (!title || !body || !category)
      return res.status(400).json({ msg: "Please provide all values" });

    let link;
    if (req.files) {
      link = await uploadImage(req.files.coverPic.tempFilePath);

      if (!link)
        return res
          .status(500)
          .json({ msg: "Image upload error, try again later." });
    }

    const blog = new Blog({
      title: capitalLetter(title),
      body,
      coverPicture: link,
      category: JSON.parse(category),
      user: req.user._id,
    });

    const newBlog = await blog.save();
    return res
      .status(201)
      .json({ newBlog, msg: "Congratulation, your blog has been posted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id)
      .populate([
        {
          path: "user",
          select: "name avatar",
        },
        {
          path: "comments.user",
          select: "name avatar",
        },
      ])
      .select("-category._id");

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    blog.viewCount += 2;
    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const updateBlog = async (req, res) => {
  const { title, body, category } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.user.toString() !== req.user._id.toString())
      return res.status(401).json({ msg: "Access denied" });

    if (req.files) {
      const link = await uploadImage(req.files.coverPic.tempFilePath);
      blog.coverPicture = link;

      if (!link)
        return res
          .status(500)
          .json({ msg: "Image upload error, try again later." });
    }

    blog.title = title;
    blog.body = body;

    await blog.save();

    return res.json({ msg: "Blog updated", newBlog: blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    await Blog.deleteOne({ _id: blog._id });
    return res.json({ msg: "Blog removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate({
        path: "user",
        select: "name avatar createdAt",
      })
      .sort("-createdAt")
      .limit(8);

    const topCategories = [
      "646c954d0053b184c58edec6",
      "646b40162ce0bb21a57968fa",
      "646c95090053b184c58edebe",
      "646c95240053b184c58edec0",
    ];

    const topCategoriesBlogs = [];

    for (let top of topCategories) {
      const blogs = await Blog.find({
        category: {
          $elemMatch: {
            value: new mongoose.Types.ObjectId(top),
          },
        },
      })
        .populate({
          path: "user",
          select: "name avatar createdAt",
        })
        .sort("-createdAt")
        .select("-body -comments -likes")
        .limit(8);

      topCategoriesBlogs.push(blogs);
    }

    res.json({
      blogs,
      rodent: topCategoriesBlogs[0],
      cockroach: topCategoriesBlogs[1],
      mosquito: topCategoriesBlogs[2],
      termite: topCategoriesBlogs[3],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    if (!comment)
      return res.status(400).json({ msg: "Please provide valid comment" });

    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const alreadyCommented = blog.comments.find(
      (c) => c.user.toString() === req.user._id.toString()
    );

    if (alreadyCommented)
      return res
        .status(400)
        .json({ msg: "You have already commented on this blog" });

    const newComment = {
      comment: comment,
      user: req.user._id,
    };

    blog.comments.push(newComment);

    await blog.save();

    return res.status(201).json({ msg: "Comment added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const editComment = async (req, res) => {
  const { comment } = req.body;
  try {
    if (!comment)
      return res.status(400).json({ msg: "Please provide valid comment" });

    const ids = req.params.id.split("_");

    const blog = await Blog.findById(ids[0]);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    for (let com of blog.comments) {
      if (com._id.toString() === ids[1]) {
        com.comment = comment;
      }
    }

    await blog.save();
    return res.json({ msg: "Comment updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const ids = id.split("_");

    const blog = await Blog.findById(ids[0]);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const comments = blog.comments.filter((c) => c._id.toString() !== ids[1]);
    blog.comments = comments;
    await blog.save();

    return res.json({ msg: "comment removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.json(404).json({ msg: "Blog not found" });

    const userId = req.user._id;

    const alreadyLiked = blog.likes.find(
      (id) => id.toString() === userId.toString()
    );
    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else blog.likes.push(userId.toString());

    await blog.save();
    return res.json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const searchBlogs = async (req, res) => {
  const { search, category } = req.query;
  const query = {};
  try {
    if (search) query.title = { $regex: search, $options: "i" };
    if (category)
      query.category = {
        $elemMatch: {
          value: new mongoose.Types.ObjectId(category),
        },
      };

    const page = Number(req.query.page) || 1;

    const count = await Blog.countDocuments({ ...query });
    const blogs = await Blog.find(query)
      .populate([
        {
          path: "user",
          select: "name avatar",
        },
        {
          path: "category",
          select: "category",
        },
      ])
      .select("title coverPicture body createdAt")
      .sort("-createdAt")
      .limit(5)
      .skip(5 * (page - 1));

    res.json({ blogs, pages: Math.ceil(count / 5) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const uploadBlogImages = async (req, res) => {
  try {
    if (req.files) {
      const link = await uploadImage(req.files.image.tempFilePath);
      if (link) return res.json(link);
    }
    res.status(400).json({ msg: "Image upload error, trg again later" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};
