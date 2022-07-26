const express = require("express");
const router = express.Router();
const { verifyToken } = require("./verifyToken");
const Blog = require("../models/blogs");

router.get("/", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    publish: req.body.publish,
  });
  try {
    const b1 = await blog.save();
    res.json(b1);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.author = req.body.author;
    blog.publish = req.body.publish;
    const b1 = await blog.save();
    res.json(b1);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const b1 = await blog.remove();
    res.json(b1);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
