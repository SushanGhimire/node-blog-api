const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
