const Blog = require("../models/blog");

// Get All Blogs
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Blog
exports.getBlogPostById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create Blog
exports.createBlogPost = async (req, res) => {
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
      image: req.file ? req.file.path : "",
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

// Update Blog
exports.updateBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    blog.title = req.body.title || blog.title;
    blog.slug = req.body.slug || blog.slug;
    blog.description = req.body.description || blog.description;
    blog.category = req.body.category || blog.category;
    blog.author = req.body.author || blog.author;
    blog.date = req.body.date || blog.date;
    blog.readTime = req.body.readTime || blog.readTime;
    blog.status = req.body.status || blog.status;

    if (req.file) {
      blog.image = req.file.path;
    }

    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Blog
exports.deleteBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};