const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");
const Book = require("../../models/admin/UploadBooks");

// GET all reviews or filter by rating
router.get("/", async(req, res) => {
    try {
        const { rating } = req.query;
        const query = rating ? { rating: Number(rating) } : {};
        const reviews = await Review.find(query).sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

// POST a new review
router.post("/", async(req, res) => {
    try {
        console.log("hello")
        console.log(req.body);
        const { user, rating, content, userId } = req.body;
        bookId = userId;
        const newReview = new Review({ user, rating, content });

        await newReview.save();

        // Update the book with the new review ID
        await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: "Failed to add review" });
    }
});

// GET reviews for a specific book
router.get("/book/:bookId", async(req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate("reviews");
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book.reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews for the book" });
    }
});

// DELETE a review by ID
router.delete("/:id", async(req, res) => {
    try {
        const reviewId = req.params.id;
        console.log("Received delete request for review ID:", reviewId); // Debugging log

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Failed to delete review" });
    }
});



// Update likes or dislikes
router.put("/:id", async(req, res) => {
    try {
        const { likes, dislikes } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id, { likes, dislikes }, { new: true }
        );
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: "Failed to update review" });
    }
});

module.exports = router;