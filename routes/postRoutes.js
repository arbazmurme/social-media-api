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

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username') // Ensure only 'username' is populated
      .exec(); // Use .exec() for better error handling
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
