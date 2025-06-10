const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("../../models/User");
const Order = require("../../models/BookOrder");
const Book = require("../../models/admin/UploadBooks");
const router = express.Router();


// Get all users and their purchase history
router.get("/users", async (req, res) => {
    console.log("hello");
    
  try {
    const users = await User.find().populate("orders");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book purchase tracking data
router.get("/books/sales", async (req, res) => {
  try {
    const books = await Book.find();
    const orders = await Order.find();

    let bookSales = books.map((book) => {
      let purchaseCount = orders.filter((order) => order.bookId === String(book._id)).length;
      return {
        title: book.title,
        purchases: purchaseCount,
      };
    });

    bookSales.sort((a, b) => b.purchases - a.purchases);

    res.json(bookSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top 5 most purchased books
router.get("/books/top", async (req, res) => {
  try {
    const orders = await Order.find();
    let bookCount = {};

    orders.forEach((order) => {
      if (!bookCount[order.bookId]) {
        bookCount[order.bookId] = { count: 0, title: order.bookTitle };
      }
      bookCount[order.bookId].count += 1;
    });

    let sortedBooks = Object.values(bookCount).sort((a, b) => b.count - a.count).slice(0, 5);

    res.json(sortedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
