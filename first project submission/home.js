const express = require("express");
const Book = require("../../models/home.js");
const router = express.Router();

// Add a new book (Admin Only)
router.post("/add-book", async(req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.json({ message: "✅ Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error adding book", error });
    }
});

module.exports = router;