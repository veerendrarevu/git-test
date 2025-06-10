const express = require('express');
const router = express.Router();
const Book = require('../../models/admin/UploadBooks');
const Order = require("../../models/BookOrder");


// GET route to fetch books data
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: error.message });
  }
});

// PUT route to edit a book
router.put('/:id', async (req, res) => {
  try {
    const { image, pdf, title, author, description, price } = req.body;

    // Create an update object dynamically
    const updatedFields = { title, author, description, price };

    // Update `image` and `pdf` if provided
    if (image) updatedFields.image = image;
    if (pdf) updatedFields.pdf = pdf;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get all orders
router.get("/orders", async (req, res) => {
  console.log("Hello")
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update order status
router.put("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;