const Blog = require("../models/blog");

// Get All Blogs

const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Blog By Id

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

// Create Blog

const createBlogPost = async (req, res) => {
  try {
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const blog = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      image,
      category: req.body.category,
      author: req.body.author,
      date: req.body.date,
      readTime: req.body.readTime,
      status: req.body.status,
    });

    const saved = await blog.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Blog

const updateBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    blog.title = req.body.title;
    blog.slug = req.body.slug;
    blog.description = req.body.description;
    blog.category = req.body.category;
    blog.author = req.body.author;
    blog.date = req.body.date;
    blog.readTime = req.body.readTime;
    blog.status = req.body.status;

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    const updated = await blog.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Blog

const deleteBlogPost = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json({
      message: "Blog deleted successfully",
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