const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogPosts);
router.get("/:id", blogController.getBlogPostById);

router.post(
  "/",
  upload.single("image"),
  blogController.createBlogPost
);

router.put(
  "/:id",
  upload.single("image"),
  blogController.updateBlogPost
);

router.delete("/:id", blogController.deleteBlogPost);

module.exports = router;