const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create new post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  await newPost.save();
  res.status(201).json(newPost);
});

// Update post
router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body;
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, author },
    { new: true }
  );
  res.json(updated);
});

// Delete post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Add comment
router.post("/:id/comments", async (req, res) => {
  const { name, text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ name, text });
  await post.save();
  res.status(201).json(post);
});

module.exports = router; 
