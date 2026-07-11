const Blog = require("../models/blog");

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
    const blog = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      date: req.body.date,
      readTime: req.body.readTime,
      status: req.body.status,

      // Cloudinary Image URL
      image: req.file ? req.file.path : "",
    });

    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update blog
const updateBlogPost = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      readTime: req.body.readTime,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

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