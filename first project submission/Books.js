const express = require('express');
const router = express.Router();
const Book = require('../../models/admin/UploadBooks');

// GET route to fetch books data
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch detective books data
router.get('/books/detective', async (req, res) => {
  try {
    const detectiveBooks = await Book.find({ genre: 'Detective' });
    res.json(detectiveBooks);
  } catch (error) {
    console.error('Error fetching detective books:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/books/Fantasy', async (req, res) => {
  try {
    const FantasyBooks = await Book.find({ genre: 'Fantasy' });
    res.json(FantasyBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/books/History', async (req, res) => {
  try {
    const HistoryBooks = await Book.find({ genre: 'History' });
    res.json(HistoryBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/books/Love', async (req, res) => {
  try {
    const LoveBooks = await Book.find({ genre: 'Love' });
    res.json(LoveBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/books/Novel', async (req, res) => {
  try {
    const NovelBooks = await Book.find({ genre: 'Novel' });
    res.json(NovelBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/books/ScienceFiction', async (req, res) => {
  try {
    const scifiBooks = await Book.find({ genre: 'ScienceFiction' });
    res.json(scifiBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to search books by genre or title
router.get('/books/search', async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const books = await Book.find({
      $or: [
        { genre: { $regex: query, $options: "i" } }, // Case-insensitive search in genre
        { title: { $regex: query, $options: "i" } }  // Case-insensitive search in title
      ]
    }).select('title'); // Return only the title field

    res.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch book details by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
