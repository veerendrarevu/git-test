const express = require('express');
const { verifyToken } = require('../../authentication');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from token
    const wishlist = await Wishlist.find({ userId });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
});

module.exports = router;
