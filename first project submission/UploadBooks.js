const express = require('express');
const router = express.Router();
const Book = require('../../models/admin/UploadBooks');

router.post('/uploadbooks', async (req, res) => {
  let { title, description, genre, price, image, author, pdfLink } = req.body; // Added pdfLink

  const newBook = new Book({ title, description, genre, price, image, author, pdfLink }); // Added pdfLink

  try {
    await newBook.save();
    res.status(201).send('Book uploaded successfully');
  } catch (error) {
    res.status(400).send('Error uploading book');
  }
});

module.exports = router;

