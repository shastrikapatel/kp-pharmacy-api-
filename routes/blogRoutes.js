const expess = require("express");
const router = expess.Router();
const blogController = require("../controllers/blogController");

const { getAllBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } = blogController;

// Define routes for blog posts
router.get("/", getAllBlogPosts);
router.get("/:id", getBlogPostById);
router.post("/", createBlogPost);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);  

module.exports = router;