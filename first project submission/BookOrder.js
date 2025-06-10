const express = require("express");
const router = express.Router();
const Order = require("../../models/BookOrder");
const User = require("../../models/User"); // Add this line
const nodemailer = require("nodemailer");

router.post("/", async(req, res) => {
    console.log("hello");
    const { bookId, bookTitle, bookPrice, name, email, mobileNumber, quantity, userId } = req.body;
    const total_price = bookPrice * quantity;

    try {
        // Save to MongoDB
        const newOrder = new Order({
            bookId,
            bookTitle,
            bookPrice,
            name,
            email,
            mobileNumber,
            quantity,
            userId,
            total_price,
        });
        await newOrder.save();
        console.log(userId);

        // Update user's orders
        await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } }); // Add this line

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        });

        // Send order confirmation email to customer
        const customerMailOptions = {
            from: "bhavatejas@gmail.com",
            to: email,
            subject: `Order Confirmation for ${bookTitle}`,
            text: `Thank you for your order!\n\nBook: ${bookTitle}\nPrice: ₹${bookPrice}\nQuantity: ${quantity}\nTotal: ₹${bookPrice * quantity}\n\nWe will contact you soon.`,
        };

        await transporter.sendMail(customerMailOptions);

        // Send order notification email to yourself
        const selfMailOptions = {
            from: "bhavatejas@gmail.com",
            to: "bhavatejas@gmail.com", // Self email
            subject: `New Order Received: ${bookTitle}`,
            text: `New order received:\n\nCustomer Name: ${name}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nBook: ${bookTitle}\nPrice: ₹${bookPrice}\nQuantity: ${quantity}\nTotal: ₹${bookPrice * quantity}`,
        };

        await transporter.sendMail(selfMailOptions);

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
});

router.get("/orders/:userId", async(req, res) => { // Fixed route path
    const { userId } = req.params;
    console.log(userId);

    try {
        // Find the user by ID and get their order IDs
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch orders using the order IDs
        const orders = await Order.find({ _id: { $in: user.orders } });

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

// In your review routes file
router.delete("/:id", async(req, res) => {
    try {
        const reviewId = req.params.id;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete review" });
    }
});

module.exports = router;