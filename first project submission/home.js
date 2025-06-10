const express = require("express");
const Book = require("../../models/home");
const router = express.Router();

// Get all books (For Users)
router.get("/books", async(req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching books", error });
    }
});

module.exports = router;