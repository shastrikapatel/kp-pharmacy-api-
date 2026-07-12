const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");


// Create Product
router.post(
  "/",
  upload.array("images", 5),
  createProduct
);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getSingleProduct);

// Update Product
router.put(
  "/:id",
  upload.array("images", 5),
  updateProduct
);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;