const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { generateToken } = require('../../authentication');

const router = express.Router();

// Admin Credentials
const ADMIN_EMAIL = "bhavatejas@gmail.com";
let ADMIN_PASSWORD;

// Hash admin password asynchronously during server startup
bcrypt.hash("Admin@123", 10).then(hash => {
    ADMIN_PASSWORD = hash;
}).catch(err => {
    console.error("Error hashing admin password:", err);
});

// Login route
router.post('/login', async (req, res) => {
    console.log("Login request received:", req.body); // Log the request body
    const { email, password } = req.body;
    try {
        if (email === ADMIN_EMAIL) {
            if (!ADMIN_PASSWORD) {
                console.error("Admin password not initialized");
                return res.status(500).send('Admin password not initialized');
            }
            const isAdminValid = await bcrypt.compare(password, ADMIN_PASSWORD);
            if (isAdminValid) {
                const token = generateToken({ _id: "admin", role: "admin" });
                console.log("Admin login successful");
                return res.json({ role: "admin", token, userId: "admin" });
            }
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.error("User not found with email:", email);
            return res.status(400).send('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.error("Invalid password for user:", email);
            return res.status(400).send('Invalid email or password');
        }

        const token = generateToken({ _id: user._id, role: "user" });
        console.log("User login successful:", user._id);
        res.json({ role: "user", token, userId: user._id });
    } catch (err) {
        console.error("Error during login:", err); // Log the error
        res.status(500).send('Internal server error');
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    
    if (email === ADMIN_EMAIL) {
        return res.status(403).send('User Already Exists');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.send('User registered successfully');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
