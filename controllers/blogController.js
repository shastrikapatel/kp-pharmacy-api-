const Blog = require("../models/blog");
// const Blog = require("../models/blog");
const cloudinary = require("../config/cloudinary");

// Get all blogs
const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single blog
const getBlogPostById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create blog
const createBlogPost = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "kp-pharmacy/blogs",
      });

      imageUrl = uploaded.secure_url;
    }

    const blog = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      date: req.body.date,
      readTime: req.body.readTime,
      status: req.body.status,
      image: imageUrl,
    });

    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Update blog
const updateBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "kp-pharmacy/blogs",
      });

      blog.image = uploaded.secure_url;
    }

    blog.title = req.body.title;
    blog.slug = req.body.slug;
    blog.description = req.body.description;
    blog.category = req.body.category;
    blog.author = req.body.author;
    blog.date = req.body.date;
    blog.readTime = req.body.readTime;
    blog.status = req.body.status;

    const updated = await blog.save();

    res.json(updated);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete blog
const deleteBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};