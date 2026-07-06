const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true
    },
    readTime: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;