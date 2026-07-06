const Blog = require("../models/blog");

// Get all blog posts   
const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.find();
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await Blog.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog post
const createBlogPost = async (req, res) => {
    const { title, image, category, date, readTime } = req.body;
    const newBlogPost = new Blog({ title, image, category, date, readTime });
    try {
        const savedBlogPost = await newBlogPost.save();
        res.status(201).json(savedBlogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing blog post by ID
const updateBlogPost = async (req, res) => {
    try {
        const updatedBlogPost = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(updatedBlogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {
    try {
        const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export the controller functions
module.exports = {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
};