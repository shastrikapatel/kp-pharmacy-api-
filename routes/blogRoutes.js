const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} = require("../controllers/blogController");

router.get("/", getAllBlogPosts);

router.get("/:id", getBlogPostById);

router.post("/", upload.single("image"), createBlogPost);

router.put("/:id", upload.single("image"), updateBlogPost);

router.delete("/:id", deleteBlogPost);

module.exports = router;