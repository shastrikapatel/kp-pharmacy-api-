const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Skin Care",
        "Health",
        "Medicine",
        "Wellness",
        "Nutrition",
        "Fitness",
        "General",
      ],
    },

    author: {
      type: String,
      default: "KP Pharmacy",
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    readTime: {
      type: String,
      required: [true, "Read time is required"],
      trim: true,
      default: "5 min read",
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);