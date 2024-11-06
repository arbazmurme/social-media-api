const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a post
router.post('/', async (req, res) => {
  const { userId, text } = req.body;
  const post = new Post({ user: userId, text });
  await post.save();
  res.json(post);
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('user', ['username']);
  res.json(posts);
});

module.exports = router;
